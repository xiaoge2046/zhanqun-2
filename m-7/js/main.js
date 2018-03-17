$(function () {
    // 手机banner
    $("#BannerM").owlCarousel({
        autoPlay: true,
        navigation: false,
        singleItem: true,
        responsiveRefreshRate: 200,
        autoHeight: true
    });

    /*导航*/
    $('#j-menu').click(function(){
        $('.fixed-nav').stop().slideToggle(500);
    })

    //移除分享
    $('html').on('touchstart click', '.mod-share', function () {
        $('.mod-share').remove();
        return false;
    })

    // 首页文字滚动
    scrollWold();

    //选项卡
    $('.m-key-tab').each(function () {
        var oItem = $(this).find('.lt-menu a');
        var oList = $(this).find('.m-public-list');
        oItem.eq(0).addClass('active');
        oList.eq(0).show();

        oItem.bind('touchstart click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            oList.hide();
            oList.eq($(this).index()).show();
        })
    })
})

function scrollWold() {
    var oScroll = document.getElementById("j-scroll");
    var oCon_1 = document.getElementById("con1");
    var oCon_2 = document.getElementById("con2");

    if (!document.getElementById("con1")) {
        return;
    }

    oCon_2.innerHTML = document.getElementById("con1").innerHTML;

    function Marquee() {
        if (oScroll.scrollLeft - oCon_2.offsetWidth >= 0) {
            oScroll.scrollLeft -= oCon_1.offsetWidth;
        } else {
            oScroll.scrollLeft++;
        }
    }
    var myvar = setInterval(Marquee, 30);

}

function createShare() {
    $('body').append('<section class="mod-share"></section>')
}