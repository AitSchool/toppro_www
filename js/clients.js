var clients = {
	init: function () {
		this.bind();
	},
	bind: function () {
		$('#cooperation .tab').on('click', clients.checkoutCooperationCard);
	},
	checkoutCooperationCard: function () {
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('#cooperation .cooperation-item').eq(index).addClass('active').siblings().removeClass('active');
	}
};

$(function () {
	clients.init();
})