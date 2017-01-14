//2016-04-07 from Youtx.IndexPage2014.js
/// <reference path="Youtx.Utility.js" />
/*
author: "闵益飞",
url: "http://www.youtx.com",
date: "2011-10-19",
updateDate: "2011-10-19",
company: "搜房网 游天下",
requried:"jquery1.6.2-min.js jquery.ui.datepicker-zh.min.js jquery-ui-1.8.14.custom.min.js dateFormat.js  Youtx.Utility.js"
*/

//城市Hash表
var cityHashMap = new Youtx.HashMap();

(function () {
    var IndexPage = {
        current: null,
        intervalID: null,
        //城市提示对象
        autoComplete: null,
        //关键字提示对象
        autoCompleteKeyword: null,
        //最后输入内容
        latestValue: null,
        //提示延迟
        tipsTimeout: null,
        //关键字文本框默认值
        locationsDefaultValue: "可输入地址/商圈/地标等",
        //日历框默认值
        dateDefaultValue: "yy-mm-dd",
        num: 0,

        //初始化各种控件事件
        init: function () {
            var that = this;

            //2016-11-30
            $("#txtCity").val("三亚");
            $("#path").val("sanya");

            Youtx.SearchFor.init();
            //ShowHideLocationIcon();
            //提交按钮事件  移出到页面

            //出租排期功能
            $(document).mouseup(function (event) {
                that.mouseDownOther(event);
            }).blur(function (event) {
                that.mouseDownOther(event);
            }).keydown(function (event) {
                if (event.keyCode == 9) {
                    that.num = that.num % 5;
                    switch (that.num) {
                        case 0: $("#HotCities").show(); break;
                        case 1: $("#HotCities").hide(); $("#divpickerin").show(); break;
                        case 2: $("#divpickerin").hide(); $("#divpickerout").show(); break;
                        case 3: $("#divpickerout").hide(); $(".IndText").show(); break;
                        case 4: $(".IndText").hide(); $("#submit_location").focus(); break;
                        default: $("#HotCities").show(); break;
                    }
                    that.num++;
                };
            });
            $('#datepickerin').datepicker({
                altField: '#checkin',
                minDate: new Date(),
                prevText: '',
                nextText: '',
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText, inst) {
                    var newdate = AddDate(dateText, 1);
                    $('#checkout').val(newdate);
                    $('#datepickerout').datepicker('option', 'minDate', $('#checkout').val());
                    $("#divpickerin").hide();
                    $("#divpickerout").show();
                },
                option: $.datepicker.regional['zh-CN']
            });
            $('#datepickerout').datepicker({
                altField: '#checkout',
                minDate: '+1d',
                prevText: '',
                nextText: '',
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText, inst) {
                    var begin = $("#checkin").val();
                    var checkin = AddDate(begin, 0);
                    var checkout = AddDate(dateText, 0);
                    if (begin == that.dateDefaultValue || checkin > checkout) {
                        var newdate = AddDate(dateText, -1);
                        $('#datepickerin').datepicker('option', 'defaultDate', newdate);
                        $('#datepickerin').datepicker('setDate', newdate);
                        $('#checkin').val(newdate);
                    }
                    $("#divpickerin").hide();
                    $("#divpickerout").hide();

                    var end = $("#checkout").val();
                    var checkin1 = AddDate(begin, 0);
                    var checkout1 = AddDate(dateText, 0);
                    var checkDays = Number(DiffLong(checkin1, checkout1));
                    if (checkDays > 30) {
                        $("#checkouttip").show();
                    }
                    else {
                        $("#checkouttip").hide();
                    }
                }
            });

            $('#checkin').focus(function () {
                $("#checkintip").hide();
                $("#checkouttip").hide();
                $("#divpickerout").hide();
                $("#divpickerin").show();
            });
            $("#checkin").mouseup(function () { return false; });
            $('#checkout').focus(function () {
                $("#checkintip").hide();
                $("#checkouttip").hide();
                $("#divpickerin").hide();
                $("#divpickerout").show();
            });
            $("#checkout").mouseup(function () { return false; });
            $("#datepickerin").mouseup(function () { return false; });
            $("#datepickerout").mouseup(function () { return false; });
            $('#checkin').val(that.dateDefaultValue);
            $('#checkout').val(that.dateDefaultValue);

            //右侧展示功能
        },
        picAutoChange: function (toright) {
            this.current.hide();
            switch (toright) {
                case false:
                    this.current = this.current.prev();
                    break;
                case true:
                default:
                    this.current = this.current.next();
                    break;
            }
            if (this.current.length == 0) {
                switch (toright) {
                    case false:
                        this.current = $('div .slideshow_item').last();
                        break;
                    case true:
                    default:
                        this.current = $('div .slideshow_item').first();
                        break;
                }
            }
            var thisimg = $("img[src1]", this.current);
            var srcPS = thisimg.attr("src1");
            if (srcPS) {
                thisimg.attr("src", srcPS).removeAttr("src1");
            }
            this.current.show();
        },
        mouseDownOther: function (evt) {
            evt = evt || window.event;
            var ele = evt.target || evt.srcElement;
            if (ele.parentNode != $("#divin") || ele.parentNode != $("#datepickerin")) {
                $("#divpickerin").hide();
            }
            if (ele.parentNode != $("#divout") || ele.parentNode != $("#datepickerout")) {
                $("#divpickerout").hide();
            }
        }
    }

    Youtx.IndexPage = IndexPage;
})();

$(document).ready(function () {
    Youtx.IndexPage.init();
    TransformCurrency(); //货币转换
});
//货币转换
function TransformCurrency() {
    $(".PR10,.ColorGray999").each(function (i, a) {
        if (a.children[1].getAttribute("currency") != undefined && $.cookie("huobi") != undefined &&
            a.children[1].getAttribute("currency").toLocaleUpperCase() != $.cookie("huobi").toLocaleUpperCase()) {
            if ($.cookie("huobi").toLocaleUpperCase() == "USD") {
                a.children[0].innerHTML = "$";
            } else {
                a.children[0].innerHTML = "￥";
            }
            a.children[1].innerHTML = Youtx.Utility.getExchange(a.children[1].innerHTML, a.children[1].getAttribute("currency"), $.cookie("huobi"));
            a.children[1].setAttribute("currency", $.cookie("huobi"));
        }
    });
    $(".ss_price").each(function (i, a) {
        if (a.children[1].getAttribute("currency") != undefined && $.cookie("huobi") != undefined &&
            a.children[1].getAttribute("currency").toLocaleUpperCase() != $.cookie("huobi").toLocaleUpperCase()) {
            if ($.cookie("huobi").toLocaleUpperCase() == "USD") {
                a.children[0].innerHTML = "$";
            } else {
                a.children[0].innerHTML = "￥";
            }
            a.children[1].innerHTML = Youtx.Utility.getExchange(a.children[1].innerHTML, a.children[1].getAttribute("currency"), $.cookie("huobi"));
            a.children[1].setAttribute("currency", $.cookie("huobi"));
        }
    });
}
function cleardate() {
    $('#datepickerin').datepicker('option', 'minDate', new Date());
    $('#datepickerin').datepicker('setDate', new Date());
    $('#datepickerout').datepicker('option', 'minDate', '+1d');
    $('#datepickerout').datepicker('setDate', '+1d');
    $("#checkin").val(Youtx.IndexPage.dateDefaultValue);
    $("#checkout").val(Youtx.IndexPage.dateDefaultValue);
    $("#divpickerin").hide();
    $("#divpickerout").hide();
}
function goUrl() {
    if ($("#txtCity").val() == Youtx.SearchFor.cityDefaultValue) {
        $("#enter_location_error_message").show();
        return false;
    }
    else {

        $("#enter_location_error_message").hide();
        var viewMode;
        switch ($.cookie('duanzuViewList')) {
            case '2':
                viewMode = 'photo';
                break;
            case '3':
                viewMode = 'map';
                break;
            default:
                viewMode = 'list';
                break;
        }

        var urlParams = new Array();
        var inDate = '';
        var outDate = '';
        var guest = '';
        var kt = '';
        var kw = '';

        if ($("#checkin").val() != "yy-mm-dd") { inDate = "in" + $("#checkin").val().replace(/-/ig, ""); }
        if ($("#checkout").val() != "yy-mm-dd") { outDate = "out" + $("#checkout").val().replace(/-/ig, ""); }
        //if ($.trim($("#number_of_guests").text()) != "") { guest = "guest" + $.trim($("#number_of_guests").text()) }
        if ($.trim($("#number_of_guests").text()) == "10及以上") {
            guest = "guest10";
        }
        else if ($.trim($("#number_of_guests").text()) != "") {
            guest = "guest" + $.trim($("#number_of_guests").text());
        }

        //urlParams.push('se1');
        // urlParams.push("ct" + $("#ct").val());
        //var keyword = $.trim($("#txtLocation").val());
        //if (keyword.length > 0 && keyword != Youtx.IndexPage.locationsDefaultValue) {
        //     urlParams.push("kw" + Youtx.Utility.encodeURI(keyword));
        // }

        var path = cityHashMap.get($("#txtCity").val());
        if (path == null || path == '') {
            path = '';
            if (cityHashMap._size > 0 && cityHashMap.values()[0] != "") {
                path = cityHashMap.values()[0];
                $("#path").val(path);
                $("#kt").val("5");
            } else {
                kw = 'kw' + Youtx.Utility.encodeURI($.trim($("#txtCity").val()));
                $("#kt").val("3");
            }
        } else {
            $("#path").val(path);
        }

        kt = "kt" + $("#kt").val();

        if (inDate != "") {
            urlParams.push(inDate);
        }
        if (outDate != "") {
            urlParams.push(outDate);
        }

        if (guest != "") {
            urlParams.push(guest);
        }
        //urlParams.push('se1');
        //        if (kt != "") {
        //            urlParams.push(kt); //去掉-.\三个符号
        //        }
        if (kw != "") {
            urlParams.push(kw.replace(/-|\.|\\|\%5C/ig, "")); //去掉-.\三个符号
        }

        var domain = "";
        if (window.location.hostname == "huochepiao.youtx.com") { domain = "http://www.youtx.com/"; }
        else { domain = "http://" + window.location.hostname + "/"; }
        if (viewMode != 'map') {
            if (path == '') {
                path = viewMode;
            }
            if (urlParams.length > 0) {
                if (document.domain.indexOf("en.") == -1) {
                    window.location.href = domain + path + '/' + urlParams.join('-') + '/';
                } else {
                    window.location.href = domain + "s/" + urlParams.join('-') + '/';
                }

            } else {
                window.location.href = domain + path + '/';
            }
        }
        else {
            if (document.domain.indexOf("en.") == -1) {
                if (path != '') {
                    path = '@' + path;
                }
                window.location.href = domain + 'map/#' + urlParams.join('-') + path;
            } else {
                window.location.href = domain + 'map/#' + urlParams.join('-') + "@s";
            }
        }
        $.cookie("list_constrast", null, { path: '/', domain: 'youtx.com' });
        return false;
    }
}

$(function () {
    //模拟下拉菜单
    $(".IndIco01").click(function (event) {
        event.stopPropagation();
        var text = $(this).parent().siblings(".IndText");
        if (text.css('display') == 'none') {
            $('.IndText').hide();
            text.show();
        } else {
            text.hide();
        }
    });
    $(".IndText li").click(function () {
        $(this).parent().siblings().children().val($(this).text());
        $(this).parent().hide();
    });
    $(".IndText li").mouseover(function () {
        $(this).addClass("IndCur").siblings().removeClass("IndCur");
    })
    $(document).click(function (event) {
        $('.IndText').hide()
    });
    $(".SearchBtn").hover(function () {
        $(this).toggleClass("SearchBtnHover");
    })
});


//时间处理
function DiffLong(datestr1, datestr2) {
    var date1 = new Date(Date.parse(datestr1.replace(/-/g, "/")));
    var date2 = new Date(Date.parse(datestr2.replace(/-/g, "/")));
    var datetimeTemp;
    if (date1.getTime() > date2.getTime()) {

        datetimeTemp = date1;
        date1 = date2;
        date2 = datetimeTemp;
    }
    difference = date2.getTime() - date1.getTime();
    thisdays = Math.floor(difference / (1000 * 60 * 60 * 24));
    //小时的计算可以不要看，理解下就可以了
    difference = difference - thisdays * (1000 * 60 * 60 * 24);
    thishours = Math.floor(difference / (1000 * 60 * 60));
    //var strRet = thisdays + '天' + thishours + '小时';
    return thisdays;
}
