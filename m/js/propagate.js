var on = (function () {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();

var off = (function () {
    if (document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.removeEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.detachEvent('on' + event, handler);
            }
        };
    }
})();

var propagate = {
	init: function () {
        this.LazyLoadEvent();
		on(window, 'scroll', propagate.LazyLoadEvent);
	},
	LazyLoadEvent: function () {
		var conEl  = document.getElementById('lazyContainer');
		var imgsEl = document.querySelectorAll('#lazyContainer > div[data-lazy]');

		if (imgsEl.length === 0) {
			off(window, 'scroll', propagate.LazyLoadEvent);
			return;
		}

		var scrollTop = window.scrollY;
		var windowH   = window.innerHeight;

		for (var i = 0; i < imgsEl.length; i++) {
			var el    = imgsEl[i];
			var elTop = el.offsetTop;

			if (elTop <= scrollTop + windowH * 2) {
				var img = document.createElement('img');
				var url = el.dataset['lazy'];

				img.src   = document.documentElement.offsetWidth >= 750 ? url.replace(/\.jpg/, '@2x.jpg') : url;
				img.alt   = 'toppro';

				el.removeAttribute('data-lazy');
				el.appendChild(img);
			}
		}
	}
};

propagate.init();