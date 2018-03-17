/*
 * @Author: Chenzy 
 * @Date: 2017-12-07 09:23:26 
 * @Last Modified by: Chenzy
 * @Last Modified time: 2017-12-19 15:15:17
 */

$(function () {

    // 首页Banner
    jQuery("#j-banner").slide({
        titCell: '.dots',
        mainCell: ".slide-wrap ul",
        effect: "leftLoop",
        vis: "auto",
        scroll: 1,
        autoPlay: true,
        autoPage: true,
        trigger: "click",
        interTime: 3000
    });

    // 导航宽度
    $('.nav').each(function () {
        var items = $('.nav>li');
        var num = items.size()
        if (num > 5 && num < 10) {
            $(this).addClass('nav-num-' + num);
        }

        items.each(function () {
            var sub = $(this);
            sub.has('div').children('.item').append('<i class="fa fa-angle-down"></i>')
        })
    })

    // NavFixed
    navFixed();

    // 首页关键词选项卡
    $('#j-progress').css('width', $('#keyTab a:first').css('width'));
    $('#keyTab').each(function () {
        var oMenu = $(this).find('.menu a');
        var oMain = $(this).find('.tab-main .tab-slide-box');
        oMenu.eq(0).addClass('active');
        oMain.eq(0).addClass('current');

        oMenu.hover(function () {
            $(this).addClass('active').siblings().removeClass('active');
            oMain.removeClass('current');
            oMain.eq($(this).index()).addClass('current');
            lazy();
        })
    });

    //图片懒加载
    lazy();

    //下单信息
    $(".ask-price").slide({
        mainCell: ".ap-main ul",
        autoPage: true,
        effect: "topLoop",
        autoPlay: true,
        mouseOverStop: false,
        vis: 6
    });

    // 企业图集放大
    $('#zoomBtn').click(function () {
        var oUrl = $(this).data('img');
        $('.m-modal').addClass('m-modal-on');
        $('#mcPic').attr('src', oUrl);
    });

    $('#closeBtn, #maskBg').click(function () {
        $('.m-modal').removeClass('m-modal-on');
    });

    // 客服组件
    $('.m-consultant').each(function () {
        var self = $(this);
        var btnOpen = self.find('#kfUnfold');
        var btnClose = self.find('#kfShrink');
        var oGroup = self.find('.group');
        var oWrap = self.find('.wrap');
        var oWidth = oWrap.outerWidth();

        btnOpen.click(function () {
            oGroup.hide();
            self.animate({
                'right': 0
            }, 0)
        });

        btnClose.click(function () {
            oGroup.fadeIn();
            self.animate({
                'right': -oWidth + 'px'
            }, 0)
        });

    });

    $.backTop($('#backTop'));

})

//懒加载
function lazy() {
    if ($('.lazy').lenght === 0) {
        return;
    }
    $(".lazy").scrollLoading();
}

// 导航 Fixed
function navFixed() {
    var navTop = $('.m-nav').offset().top;
    var docTop = $(document).scrollTop();

    nHandler();

    $(window).scroll(function () {
        docTop = $(document).scrollTop();
        nHandler();
    })

    function nHandler() {

        if (docTop > navTop) {
            $('.m-nav').addClass('st-fixed');
        } else {
            $('.m-nav').removeClass('st-fixed');
        }
    }
}

/* 
 * 返回顶部方法-Czy
 * param [element] "string = $('')" 元素
 * param [speed] "int = 500" 返回顶部时间 ms
 * param [invisible] "boolen = true" 元素默认隐藏
 * param [opacity] "int = 500" 显示隐藏时间 ms
 */
$.backTop = function (element, speed, invisible, opacity) {
    var $oEle = element;
    (speed === undefined) ? speed = 500: speed = speed;
    (invisible === undefined) ? invisible = true: invisible = invisible;
    (opacity === undefined) ? opacity = 0: opacity = opacity;
    if (invisible) {
        var oWin = $(window);
        var oDoc = $(document);

        $oEle.hide();
        oWin.scroll(function () {
            if (oDoc.scrollTop() > 1) {
                $oEle.fadeIn(opacity);
            } else {
                $oEle.fadeOut(opacity);
            }
        })
    }
    $oEle.click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, speed);
        return false;
    })
}