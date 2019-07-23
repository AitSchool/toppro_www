var index = {
    init: function () {
        this.muSwiperInit();
        this.bind();
    },
    bind: function () {
        $('#evaluateTab > div').mouseenter(index.evaluateHoverEvent);
    },
    evaluateHoverEvent: function () {
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('#evaluateDesc > p').eq(index).addClass('active').siblings().removeClass('active');
    },
    muSwiperInit: function () {
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable:true
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
        })
    }
}

$(function(){
    index.init();
})




