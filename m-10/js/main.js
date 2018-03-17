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
    $('#j-menu').click(function () {
        $(this).addClass('menu-open');
        $('body').addClass('open');
        $('#mouseMask').show();
        $('.fixed-nav').show();
    })
    $('#mouseMask').click(function () {
        $('#j-menu').removeClass('menu-open')
        $('body').removeClass('open');
        $(this).hide();
        setTimeout(() => {
            $('.fixed-nav').hide();
        }, 600);
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

$.smartScroll = function (container, selectorScrollable) {
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
    if (!selectorScrollable || container.data('isBindScroll')) {
        return;
    }

    // 是否是搓浏览器
    // 自己在这里添加判断和筛选
    var isSBBrowser;

    var data = {
        posY: 0,
        maxscroll: 0
    };

    // 事件处理
    container.on({
        touchstart: function (event) {
            var events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);

            if (!elTarget.length) {
                return;
            }

            var elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
                elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                elScroll = null;
            }

            if (!elScroll) {
                return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
        },
        touchmove: function () {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
                // 禁止滚动
                event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            if (isSBBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger('scroll');
                return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
        },
        touchend: function () {
            data.maxscroll = 0;
        }
    });

    // 防止多次重复绑定
    container.data('isBindScroll', true);
};