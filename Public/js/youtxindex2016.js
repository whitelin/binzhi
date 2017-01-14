/**
* Created by sf on 2016/2/29.
*/

var YtxDefault = {};  //定义变量
YtxDefault.app = {};  //定义变量
YtxDefault.tools = {};
YtxDefault.ui = {};
YtxDefault.tools.getByClass = function (oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];
    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            arr.push(aEle[i]);
        }
    }
    return arr;
};
YtxDefault.tools.startMove = function (obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            var iCur = 0;

            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(YtxDefault.tools.getStyle(obj, attr)) * 100);
            }
            else {
                iCur = parseInt(YtxDefault.tools.getStyle(obj, attr));
            }

            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != json[attr]) {
                bStop = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            }
            else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }

        if (bStop) {
            clearInterval(obj.timer);

            if (fn) {
                fn();
            }
        }
    }, 30)
}
/*---header滑动导航--*/
YtxDefault.headerNavMove = function (obj, iTarget) {
    var iSpeed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        iSpeed += (iTarget - obj.offsetLeft) / 5;
        iSpeed *= 0.7; //摩擦力
        if (Math.abs(obj.offsetLeft - iTarget) < 0.5 && Math.abs(iSpeed) < 0.05) {
            clearInterval(obj.timer);
            obj.style.left = iTarget + "px";
        }
        else {
            obj.style.left = obj.offsetLeft + iSpeed + "px";
        }
    }, 30);
};
YtxDefault.headerNav = function (id) {
    var oUl = document.getElementById(id);
    var aLi = oUl.getElementsByTagName("li");
    var oBg = aLi[aLi.length - 1]; //最后一个li
    var i = 0;
    for (; i < aLi.length - 1; i++) {   //前n-1个增加事件
        aLi[i].onmouseover = function () {
            if (!$(this).hasClass("NavDownLi")) {
                oBg.style.display = "block";
                YtxDefault.headerNavMove(oBg, this.offsetLeft);
                for (var j = 0; j < aLi.length - 1; j++) {
                    removeClass(aLi[j], "active");
                }
                addClass(this, "active");
            } else {
                oBg.style.display = "none";
                for (var j = 0; j < aLi.length - 1; j++) {
                    removeClass(aLi[j], "active");
                }
            }
        };
    }
};
/*--header下拉---*/
$(".dropDownLi").hover(function () {
    $(this).find(".TopullDown").show();
    $(this).find(".dropDownTrigger").css({ backgroundPosition: "right -9px" });
    $(this).css({ border: "1px solid #cce6f7", borderBottom: "0 none" });
}, function () {
    $(this).css({ border: "1px solid #fff" });
    $(this).find(".TopullDown").hide();
    $(this).find(".dropDownTrigger").css({ backgroundPosition: "right 12px" });

});
$(".NavDownLi").hover(function () {
    $(this).css({ border: "1px solid #cce6f7", borderBottom: "0 none", borderTop: "2px solid #2b98dd" });
    $(this).find(".NavMenu").show();
    $(this).find(".NavDownTrigger").css({ backgroundPosition: "right -61px" });
}, function () {
    $(this).css({ border: "1px solid #fff", borderBottom: "0 none", borderTop: "2px solid #fff" });
    $(this).find(".NavMenu").hide();
    $(this).find(".NavDownTrigger").css({ backgroundPosition: "right -31px" });
});



$(".dropDownPhone").hover(function () {
    $(this).find(".dropDownTrigger").css({ backgroundPosition: "7px -135px", border: "1px solid #d2e9f8", borderBottom: "1px solid #fff" });

    $(this).find(".TopMobCon").show();
}, function () {
    $(this).find(".dropDownTrigger").css({ backgroundPosition: "7px -105px", border: "1px solid #fff" });
    $(this).find(".TopMobCon").hide();
});

//模拟下拉框
$(".selPerson").click(function (event) {
    var oBoxChose = $(this).find(".selPerChose");
    if (oBoxChose.css("display") == 'none') {
        $(".selPerChose").hide();
        oBoxChose.show();
    } else {
        oBoxChose.hide();
    }
    event.stopPropagation();
});
$(".selPerChose  li").click(function (event) {
    var oText = $(this).text();
    $(this).parent().parent().find(".selResult").html(oText);
    $(this).parent().hide();
    event.stopPropagation();
});
$(".selPerChose li").mouseover(function () {
    $(this).addClass("selCur").siblings().removeClass("selCur");
});
$(document).click(function (event) {
    $(".selPerChose").hide();
});
//banner下面的链接
$(".bannerLkUl li").mouseover(function () {
    $(this).addClass("curLi").siblings().removeClass("curLi");
});


YtxDefault.app.unfold = function () {
    var oFooter = document.getElementById('FooterCityUl');
    var aFooterLi = oFooter.getElementsByTagName('li');
    var aFooterBtn = YtxDefault.tools.getByClass(oFooter, 'CityTxtBtn');
    for (i = 0; i < aFooterBtn.length; i++) {
        (function (index) {
            var onOff = true;
            aFooterBtn[index].onclick = function () {
                if (onOff) {
                    onOff = false;
                    this.parentNode.style.height = 'auto';
                    this.innerHTML = '-收起';
                }
                else {
                    onOff = true;
                    this.parentNode.style.height = '18' + 'px';
                    this.innerHTML = '+展开';
                }
            }
        })(i);
    }
};

YtxDefault.app.FocusPicture = function () {
    var oPic = document.getElementById('focusPicture');
    YtxDefault.ui.FocusPicture(oPic, false);
}

YtxDefault.ui.FocusPicture = function (obj, onOff) {
    var oList = YtxDefault.tools.getByClass(obj, 'PictureLis')[0];
    var oPicUl = obj.getElementsByTagName('ul')[0];
    var oPicLi = oPicUl.getElementsByTagName('li');
    var aList = oList.getElementsByTagName('span');

    var num = 0;
    var timer = null;
    var aLilen = aList.length;
    for (var i = 0; i < aLilen; i++) {
        aList[i].index = i;
        aList[i].onclick = function () {
            num = this.index;
            if (onOff) {
                for (i = 0; i < aLilen; i++) {
                    YtxDefault.tools.startMove(oPicLi[i], { opacity: 0 });
                    aList[i].className = '';
                }
                YtxDefault.tools.startMove(oPicLi[this.index], { opacity: 100 });
                aList[this.index].className = 'Cur';
            }
            else {
                for (i = 0; i < aLilen; i++) {
                    oPicLi[i].style.display = "none";
                    aList[i].className = '';
                }
                oPicLi[this.index].style.display = "block";
                aList[this.index].className = 'Cur';
            }
        }
    }

    timer = setInterval(
	    function () {
	        //clearInterval(timer);
	        num++;
	        if (num == aLilen) {
	            num = 0;
	        }
	        for (i = 0; i < oPicLi.length; i++) {
	            if (onOff) {

	                YtxDefault.tools.startMove(oPicLi[i], { opacity: 0 });
	            }
	            else {

	                oPicLi[i].style.display = "none";
	            }

	            aList[i].className = '';
	        }
	        if (onOff) {
	            YtxDefault.tools.startMove(oPicLi[num], { opacity: 100 });
	        }
	        else {

	            oPicLi[num].style.display = "block";

	        }
	        aList[num].className = 'Cur';
	    }

	, 4000);

    obj.onmouseover = function () {
        clearInterval(timer);
    }
    obj.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(
		     function () {
		         num++;
		         if (num == aLilen) {
		             num = 0;
		         }
		         for (i = 0; i < oPicLi.length; i++) {

		             if (onOff) {
		                 YtxDefault.tools.startMove(oPicLi[i], { opacity: 0 });
		             }
		             else {
		                 oPicLi[i].style.display = "none";
		             }

		             aList[i].className = '';
		         }
		         if (onOff) {
		             YtxDefault.tools.startMove(oPicLi[num], { opacity: 100 });
		         }
		         else {

		             oPicLi[num].style.display = "block";

		         }
		         aList[num].className = 'Cur';
		     }
		, 4000);
    }

}


//--------------------自定义一些js方法开始------------------------
function addClass(obj, className) {
    if (obj.className == "") {  //如果原来没有class
        obj.className = className;
    } else {
        var arrClass = obj.className.split(" "); //存储className的数组
        var _index = arrIndexOf(arrClass, className);
        //如果要添加的class不存在
        if (_index == -1) {
            obj.className += " " + className;  //注意 空格
        }
        //如果要添加的class在class中存在 什么都不用做
    }
}
function removeClass(obj, className) {
    //如果没有class什么都不用做 有class则对class进行拆分，判断是不是存在要移除的class
    if (obj.className != "") {
        var arrClass = obj.className.split(" ");
        var _index = arrIndexOf(arrClass, className);
        if (_index != -1) {  //有存在的class
            arrClass.splice(_index, 1); //删除数组中一个元素
            obj.className = arrClass.join(" ");  //连接成字符串
        }
    }
}
//判断数组中有没有跟v值一样的
function arrIndexOf(arr, v) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == v) {
            return i;
        }
    }
    return -1;
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return document.defaultView.getComputedStyle(obj, false)[attr];
    }

}

//--------------------自定义一些js方法  结束-----------------


//轮播图bannerBegin
setInt = setTimeout("next_pic()", 0);   //banner图片轮播
$(".pics_pre").show();
$(".pics_next").show();
var curIndex = 0;  //当前li 索引
var oUl = document.getElementById("bannerImgUl");
var aLi = [];
if (oUl) {
    aLi= oUl.getElementsByTagName("li");
}
var setInt;
function next_pic() {
    var curImg = $('.bannerImgLi');
    curIndex = $('.bannerImgUl li').index(curImg);
    curIndex++;
    if (curIndex > aLi.length - 1) {
        curIndex = 0;
    }
    clearInterval(setInt);
    curImg.removeClass('bannerImgLi').fadeOut(2000);
    $('.bannerImgUl li').eq(curIndex).addClass('bannerImgLi').fadeIn(1000);
    setInt = setTimeout("next_pic()", 5000);

}
function pre_pic() {
    var curImg = $('.bannerImgLi');
    curIndex = $('.bannerImgUl li').index(curImg);
    curIndex--;
    if (curIndex < 0) {
        curIndex = aLi.length - 1;
    }
    clearInterval(setInt);
    curImg.removeClass('bannerImgLi').fadeOut(2000);

    $('.bannerImgUl li').eq(curIndex).addClass('bannerImgLi').fadeIn(1000);
    setInt = setTimeout("(next_pic())", 5000);
}

$("#pics_next").click(function () {
    next_pic();
});
$("#pics_pre").click(function () {
    pre_pic();
});
//轮播图bannerEnd
$(".bannerImgUl").css({ height: parseInt($(window).width() * 0.31875) + "px" });
window.onresize = function () {
    $(".bannerImgUl").css({ height: parseInt($(window).width() * 0.31875) + "px" });
    if ($(window).width() > 1180) {
        $(".desStragImg").css({ height: parseInt($(window).width() * 0.26875) + "px" });
    }
};

//目的地攻略 轮播图
//if ($(window).width() > 1180) {
//    $(".desStragUl").css({ height: parseInt($(window).width() * 0.26875) + "px" });
//}

//var _lastIndex = 0;
//$(".desSmallImgUl li").click(function () {
//    var _curIndex = $(this).index();
//    if (_lastIndex != _curIndex) {
//        $(this).find(".mask").hide();
//        $(this).find(".border").show();
//        $(".desSmallImgUl li").eq(_lastIndex).find(".mask").show();
//        $(".desSmallImgUl li").eq(_lastIndex).find(".border").hide();
//        $(".desStragUl li").eq(_lastIndex).fadeOut(600);
//        $(".desStragUl li").eq(_curIndex).fadeIn(600);
//        $(".desStragUl li").eq(_lastIndex).hide();
//        _lastIndex = _curIndex;
//    }
//});
//目的地攻略 ============删除原来js 替换为下面
if ($(window).width() > 1180) {
    $(".desStragUl").css({ height: parseInt($(window).width() * 0.26875) + "px" });
}
; (function () {
    var jugg = null;
    var adesLi = $('.desSmallImgUl li');
    var adesLis = $('.desStragUl li');
    var adesMask = $('.desSmallImgUl .mask');
    var adesBorder = $('.desSmallImgUl .border');
    var n = 0;
    var m = 0;
    adesLis.css('opacity', 0.3);
    adesLis.eq(0).css('opacity', 1);
    adesLi.each(function (index, value) {
        (function (i) {
            adesLi.eq(i).click(function () {
                n = i;

                adesLis.hide();
                adesLis.eq(i).show();
                adesLis.eq(m).stop().animate({ 'opacity': 0.3 }, 800);
                adesLis.eq(i).stop().animate({ 'opacity': 1 }, 800);
                adesMask.show();
                adesMask.eq(i).hide();
                adesBorder.hide();
                adesBorder.eq(i).show();
                m = n;
            });
        })(index);

    });
    function tick() {
        n++;
        if (n == adesLi.length) n = 0;
        adesLis.hide();
        adesLis.eq(n).show();
        adesLis.eq(n - 1).stop().animate({ 'opacity': 0.3 }, 800);
        adesLis.eq(n).stop().animate({ 'opacity': 1 }, 800);
        adesMask.show();
        adesMask.eq(n).hide();
        adesBorder.hide();
        adesBorder.eq(n).show();
    }
    jugg = setInterval(tick, 4000);

    var oJugg = $('.desStragImg');
    oJugg.hover(function () {
        clearInterval(jugg);
    }, function () {
        jugg = setInterval(tick, 4000);
    });
})();

//热门好去处修改 =============在热门好去处js中加入
; (function () {
    var aHotAreaUlJs = $('.hotAreaUl a');
    var aHotShadow = $('.hotAreaUl .shadow');

    aHotAreaUlJs.each(function (index, value) {
        (function (i) {
            aHotAreaUlJs.eq(i).hover(function () {
                aHotShadow.eq(i).show();
            }, function () {
                aHotShadow.eq(i).hide();
            });
        })(index);
    });
})();


//房东故事轮播图Begin
(function ScrollPic() {
    var liWidth = $(".landLRoUl li").outerWidth(true); //li的宽度，包括padding在内
    var len = $(".landLRoUl li").length;
    var count = Math.floor(len / 2) - 1;
    //count点击次数
    var num = 0;
    var timer = null;
    $(".landLRoUl").css("width", liWidth * len + "px");
    autoMove();
    function autoMove() {
        timer = setInterval(function () {
            num++;
            if (num > count) {
                num = 0;
            }
            showPic();
        }, 3000);
    }

    $(".arowRight").click(function () {
        num++;
        if (num > count) {
            num = 0;
        }
        showPic();

    }).hover(function () { clearInterval(timer); }, function () { autoMove(); });
    $(".arowLeft").click(function () {
        num--;
        if (num <= -1) {
            num = count;
        }
        showPic();

    }).hover(function () { clearInterval(timer); }, function () { autoMove(); });
    function showPic() {
        var nowLeft = -num * liWidth * 2;
        $(".landLRoUl").stop(true, false).animate({ "left": nowLeft + "px" }, 500);
    }
    $(".landLRoImgCon").hover(function () { clearInterval(timer); }, function () { autoMove(); });


})();
//房东故事轮播图End

//关注我们 鼠标放在微信上出现二维码框（匿名函数的自执行）
(function () {
    var _timer = null;
    $("#wramLkShare .bds_weixin").mouseover(function () {
        $("#weixinHoverBox").show();
        clearInterval(_timer);
    });
    $("#wramLkShare .bds_weixin").mouseout(function () {
        _timer = setTimeout(function () {
            $("#weixinHoverBox").hide();
        }, 500);
    });
    $("#weixinHoverBox").mouseover(function () {
        clearInterval(_timer);
    });
    $("#weixinHoverBox").mouseout(function () {
        _timer = setTimeout(function () {
            $("#weixinHoverBox").hide();
        }, 500);
    });
})();
//关注我们End

//右边悬浮框Begin
//返回到顶部
$(window).scroll(function () {
    var sT = document.body.scrollTop ||
        document.documentElement.scrollTop;
    if (sT <= 30) {
        $(".suspenBox").hide();
    }
    else {
        $(".suspenBox").show();
    }
});
$(".suspensionR").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 1000);
});
$(".suspenLi").on("click", function () {
    if ($(this).hasClass("cur")) {
        $(this).removeClass('cur');
        $(this).find(".suspenPop1").hide();
    } else {
        $('.suspenLi').removeClass('cur'); //全部移除cur
        $(".suspenLi").find(".suspenPop1").hide(); //全部消失
        $(this).addClass('cur');
        $(this).find(".suspenPop1").show();  //当前的显示
    }
});
//右边悬浮框End

