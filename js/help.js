var help = {
	init: function () {
		this.bind();
		this.hashChangeEvent();
	},
	bind: function () {
		$(window).on('hashchange', this.hashChangeEvent);
		$('#nav a').on('click', this.setActiveClass);
		$('#nav dt').on('click', this.toggleNavList);
	},
	hashChangeEvent: function () {
		var hash = decodeURI(location.hash);
		if (!hash) return;

		var contentTarget = $('#content *[scroll="' + hash + '"]')[0];
		var contentTop = contentTarget.offsetTop;

		$('#content').animate({'scrollTop': contentTop}, 200);
	},
	setActiveClass: function () {
		$(this).parent().addClass('active').siblings().removeClass('active');
	},
	toggleNavList: function () {
		$(this).parent().toggleClass('expend');
	}
};

$(function () {
	help.init();
});