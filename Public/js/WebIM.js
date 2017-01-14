

(function (window, undefined) { var WebIM = (function () { }); window.WebIM = WebIM; })(window);
var chat = "", chattag = "", Yichu_youtx_im = "", fsName = "", touName = "", h = "", getUid = "", loguserid = "", webim_obj = "beta_", WebImHostUrl = "http://www.youtx.com";
var attimer = null;
var aspan = 800;
var index = 0;
var _title = null;
var tit = document.title;
var oldtitie = document.title;
var show = false;
var leftsecond_webim = 2;
var timeID;
var userid_webim, time_webim;
var webim_y = 0, webim_x = 0, ttid = 0;
var webimfocus = false;
//wjl 添加2015-02-28 begin
var messageType = "";
//wjl添加2015-02-28 end
if (getcookie("loginname") != null && getcookie("loginname") != "" && getcookie("new_loginid") != "") {
    var names = getgbchr(getcookie("loginname"));
    loguserid = getcookie("new_loginid");
    if (name(names)) {
        names = names.replace('|', '');
        fsName = names;
    } else {
        var username = names.split("|");
        fsName = username[0] + " " + username[1];
    }
}
//wjl 添加2015-02-02 begin
function WebIm(id) {
    function addEvent(obj, sEv, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(sEv, fn, false);
        } else {
            obj.attachEvent('on' + sEv, fn);
        }
    }
    function addMouseWheel(obj, fn) {
        function fnWheel(ev) {
            var oEvent = ev || event;
            var bDown = false;
            bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;
            fn(bDown, oEvent);
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        }
        if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
            obj.addEventListener('DOMMouseScroll', fnWheel, false);
        } else {
            addEvent(obj, 'mousewheel', fnWheel);
        }
    }
    function setTop(t, BarBgObj, BarObj, ConBox, ConObj) {
        t < -0.00000001 && (t = -0.00000001);
        t > BarBgObj.offsetHeight - BarObj.offsetHeight && (t = BarBgObj.offsetHeight - BarObj.offsetHeight);
        BarObj.style.top = t + 'px';

        var scale = t / (BarBgObj.offsetHeight - BarObj.offsetHeight);
        ConObj.style.top = -scale * (ConObj.offsetHeight - ConBox.offsetHeight) + 'px';
    }
    function DoMouseWheel(oBox, BarBgObj, BarObj, ConBox, ConObj) {
        addMouseWheel(oBox, function (down) {
            var t = BarObj.offsetTop - 0.00000001;
            if (down) {
                t += 10;
            } else {
                t -= 10;
            }
            setTop(t, BarBgObj, BarObj, ConBox, ConObj);
        });
    }
    function DoUpDown(oTopS, oBottomS, BarBgObj, BarObj, ConBox, ConObj) {

        var t = BarObj.offsetTop - 0.00000001;

        oTopS.onclick = function () {
            t -= 10;
            t < 0 && (t = 0);
            setTop(t, BarBgObj, BarObj, ConBox, ConObj);

        };
        oBottomS.onclick = function () {
            t += 10;
            t > BarBgObj.offsetHeight - BarObj.offsetHeight && (t = BarBgObj.offsetHeight - BarObj.offsetHeight);
            setTop(t, BarBgObj, BarObj, ConBox, ConObj);

        };
    }
    function DoScroll(BarBgObj, BarObj, ConBox, ConObj) {

        BarObj.onmousedown = function (ev) {
            var oEvent = ev || event;
            var disy = oEvent.clientY - BarObj.offsetTop;
            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                var t = oEvent.clientY - disy - 0.00000001;
                setTop(t, BarBgObj, BarObj, ConBox, ConObj);

                oTopS.onclick = function () {
                    t -= 10;
                    t < 0 && (t = 0);
                    setTop(t, BarBgObj, BarObj, ConBox, ConObj);
                    console.log(t);
                };
                oBottomS.onclick = function () {
                    t += 10;
                    t > BarBgObj.offsetHeight - BarObj.offsetHeight && (t = BarBgObj.offsetHeight - BarObj.offsetHeight);
                    setTop(t, BarBgObj, BarObj, ConBox, ConObj);
                };
            };
            document.onmouseup = function (ev) {
                document.onmousemove = null;
                document.onmouseup = null;
                BarObj.releaseCapture && BarObj.releaseCapture();
            };
            BarObj.setCapture && BarObj.setCapture();
            return false;
        };
    }

    var oBox1 = document.getElementById('UserBox');
    var oUserM = document.getElementById('UserM');
    var oUserN = document.getElementById('UserNr');
    var oUserBar = document.getElementById('UserBar');
    var oUserScroll = document.getElementById('UserScroll');
    var aUserLi = oUserN.children;

    var oBox2;
    var oCon02;
    var oCon03;
    var oSB02;
    var oSB03;

    var oTopS;
    var oBottomS;
    if (id != undefined) {
        oCon02 = $("#" + id).find("#Con03")[0];
        oCon03 = $("#" + id).find("#Con02")[0];
        oSB02 = $("#" + id).find("#SB02")[0];
        oSB03 = $("#" + id).find("#SB03")[0];

        oTopS = $("#" + id).find("#TopStr")[0];
        oBottomS = $("#" + id).find("#BottomStr")[0];
    } else {
        oCon02 = $("#Con03")[0];
        oCon03 = $('#Con02')[0];
        oSB02 = $('#SB02')[0];
        oSB03 = $('#SB03')[0];

        oTopS = $('#TopStr')[0];
        oBottomS = $('#BottomStr')[0];
    }

    var oUHeight = oUserN.offsetHeight;
    var oBoxHeight = oBox1.offsetHeight;
    //wjl添加2015-03-31 begin

    if (oUHeight < oBoxHeight) {
        $(".UserMain").width(112);
        $(".TabHeader li").width(108);
    } else {
        $(".UserMain").width(102);
        $(".TabHeader li").width(98);
    }
    //wjl添加2015-03-31 end
    oBox1.onmouseover = function () {
        if (oUHeight > oBoxHeight) {
            oUserBar.style.display = 'block';
            oUserScroll.style.display = 'block';
            DoScroll(oUserScroll, oUserBar, oUserM, oUserN);
            DoMouseWheel(oBox1, oUserScroll, oUserBar, oUserM, oUserN); /*wjl 修改 2015-03-06*/
            oUserScroll.onmouseover = function () {
                oUserScroll.className = 'UserScroll UserSBg';
            };
            oUserScroll.onmouseout = function () {
                oUserScroll.className = 'UserScroll';
            };
        }
    };
    oBox1.onmouseout = function () {
        oUserScroll.style.display = 'none';
    };
    //wjl 2015-02-13begin
    $(".TabHeader li").mouseover(function () {
        $(this).find('.TalkClose').css("display", "block").css("position", "absolute");
    });
    $(".TabHeader li").mouseout(function () {
        $(this).find('.TalkClose').css("display", "none");
    });
    //wjl 2015-02-13end
    var oInnerHeight = oCon03.offsetHeight;
    var oOuterHeight = oCon02.offsetHeight;
    var oDialogBox = $("#" + id).find('#DialogBarBox')[0];
    //    $('.Takle_listxt').each(function () {
    //        if ($(this).css('display') == 'block') {
    oBox2 = $("#" + id).find(".DialogPanel")[0];
    oBox2.onmouseover = function () {
        if (oInnerHeight > oOuterHeight) {
            oSB03.style.display = 'block';
            oSB02.style.display = 'block';

            DoScroll(oSB02, oSB03, oCon02, oCon03);
            DoMouseWheel(oBox2, oSB02, oSB03, oCon02, oCon03);
            oDialogBox.onmouseover = function () {
                oSB02.className = 'ScrollBox ScrollBg';
                oTopS.style.display = 'block';
                oBottomS.style.display = 'block';
            };
            oDialogBox.onmouseout = function () {
                oSB02.className = 'ScrollBox';
            };
        }
    };
    oBox2.onmouseout = function () {
        oSB02.style.display = 'none';
        oTopS.style.display = 'none';
        oBottomS.style.display = 'none';
    };
    //        }
    //    })
    //		 		DoScroll(oUserScroll,oUserBar,oUserM,oUserN);
    //DoScroll(oSB02, oSB03, oCon02, oCon03);

    //wjl 添加 2015-03-06begin
    //DoMouseWheel(oBox1, oUserScroll, oUserBar, oUserM, oUserN);

    DoUpDown(oTopS, oBottomS, oSB02, oSB03, oCon02, oCon03);
    //wjl 添加 2015-03-06end

    //wjl 2015-03-17 begin 打开或者复制对话内容中的url

    $("#" + id).find(".outLink").each(function () {
        var timer = null;
        $(this).mouseover(function (e) {
            clearTimeout(timer);

            var TipBox = "<div class='messagebox01' id='mesg01'><span>站外链接，谨慎访问！</span><a class='LocA' id='OpenUrl'>打开</a><div class='mess-char'></div>" + "</div>";
            var isMeg = document.getElementById('mesg01');

            if (!isMeg) {
                $("body").append(TipBox);
            }

            $(".messagebox01").css({ "top": (e.pageY + 5) + "px", "left": (e.pageX - 5) + "px" });
            var ThUrl = $(this).text();

            $(".messagebox01").mouseover(function (e) {
                clearTimeout(timer);
                var tem11;
                var oOpen = document.getElementById('OpenUrl');
                //var oCopy = document.getElementById('CopyUrl');
                if (oOpen) {
                    clearTimeout(timer);
                    oOpen.onclick = function () {
                        if (ThUrl) {
                            tem11 = ThUrl.substring(0, 4);
                            if (tem11 == 'http') {
                                window.open(ThUrl);
                                return false;
                            } else {
                                window.open('http://' + ThUrl);
                                return false;
                            }
                        }
                    };
                }
            });
            $(".messagebox01").mouseleave(function () {
                $(".messagebox01").remove();
            });
        });
        $(this).mouseout(function () {
            timer = setTimeout(function () {
                $(".messagebox01").remove();
            }, 3000);
        });
    });
}
//wjl 添加2015-02-02 end
WebIM.JieMian = {
    //如果主动发送消息touid为接收者的id 如果是被动接收消息就是发送者得id type 1为点击联系我创建窗口 2为有新消息
    AddChatWin: function (touid, houseid, touname, type, opentype, key, showtype) {

        if (parseInt(getcookie('new_loginid')) > 0) {
            loguserid = getcookie("new_loginid");
            /*第二个if开始*/
            if (loguserid != touid) {
                WebIM.JieMian.SetCookie("youtx_webim_cut", "null");
                var tbx = $(".TalkBox");
                var youtxli = $("#youtx_none_li");
                var youtxdiv = $("#youtx_none_div");
                var hc = $("#youtx_ch_webim"); //neirong
                var tab = $(".TabHeader"); //tab
                var tab1 = $(".UserUl"); //tab
                var house_webim = $("#house_webim");
                var id = "win_y_" + touid + "_" + houseid;
                var tabid = "tab_y_" + touid + "_" + houseid;
                var pos_im = "pos_" + touid + "_" + houseid;
                var textareaID = "" + touid + "_" + houseid;
                var form = $("#" + id);
                var name = "";
                var msgRecord = "MR_" + touid + "_" + houseid;
                var housRecomd = "HR_" + touid + "_" + houseid;
                var fdid;
                /*第三个if开始*/
                if (form.length == 0) {

                    chat = '<div id="' + id + '" style="display: block;" class="Takle_listxt">'
                    + '<div class="Listxt_left">'
                    + '<div id="Dbox02" class="DialogPanel">'
                    + '' + fangdong_phone + ''
                    + '<div class="DialogRecord" id="Con03">'
                    + '<div class="chat_history  min_chat_history" id="Con02">'
                    + '</div>'
                    + '</div>'
                    + '<div class="DialogBar" id="DialogBarBox">'
                    + '<a class="TopBar" id="TopStr" style="display:none;"></a>'
                    + '<a class="BottomBar" id="BottomStr" style="display:none;"></a>'
                    + '<div class="ScrollBox" id="SB02" style="display:none;">'
                    + '<a class="ScrollBar" id="SB03" style="display:block;top:0px"></a>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '<div class="Chat_text" >'
                    + '<p class="msg_logging"><span class="HousRecomd" id="' + housRecomd + '">房源推荐</span><a href="javascript:void(0);"  id="' + msgRecord + '">消息记录</a></p>'
                    + '<textarea id="' + textareaID + '"></textarea>'
                    + '</div>'
                    + '<div class="Chatbtn" id="chatB">'
                    + '<div class="ChatWarning"></div>'
                    + '<input name="" class="youtx_im_but" type="button" value="发送" />'
                    + '</div>'
                    + '</div>'
                    + '<div class="Listxt_right">'
                    + '<div class="Chatroom">'
                    + '</div>'
                    + '' + guangao_img + ''
                    + '</div><input id="' + pos_im + '" type="hidden" />'
                    + '</div>';

                    chattag = '<li class="Listcur" id="' + tabid + '" title=""><span class="UserImg"><span class="TalkOnline03"></span></span><span class="TalkName"></span><span class="TalkClose"  onclick="WebIM.JieMian.removeClick(this)"></span></li>';

                    var tabi = $(".TabHeader li").length;

                    /*第四个if开始  添加左侧聊天列表*/
                    if (tabi > 0) {
                        if (type == 1) {
                            tab.prepend(chattag);

                            Yichu_youtx_im = '<li id="' + $(".TabHeader li").eq(1001).attr("id") + '" title="' + $(".TabHeader li").eq(1001).attr("title") + '" class="' + $(".TabHeader li").eq(1001).attr("class") + '">' + $(".TabHeader li").eq(1001).html() + '</li>'
                            $(".Yichu").prepend(Yichu_youtx_im);

                            $("#" + $(".TabHeader li").eq(1001).attr("id") + "").click(function () {

                                //WebIM.JieMian.yichuClick(tab, this.id);
                                WebIM.JieMian.tabclick(this.id);
                            });
                            $(".TabHeader li").eq(1001).remove();

                        } else {
                            youtxli.prepend(chattag);
                        }

                        //wjl 添加2015-03-03 begin 获取用户头像
                        var userImg;
                        $.ajax({
                            url: WebImHostUrl + "/profile/Ajax/GetUserIcon.ashx?touid=" + touid + "&key=" + key + "&callback=?",
                            dataType: "jsonp",
                            type: "GET",
                            crossDomain: true,
                            success: function (data) {
                                if (data["result"] == "0") {
                                    userImg = data["UserImg"];
                                    //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + userImg + ")");
                                    $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + userImg + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                } else if (data["result"] == "1") {
                                    // $(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                    $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                }
                                else {
                                    //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                    $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                    alert(data["report"]);
                                }
                            }
                        });
                        //wjl 添加 2015-03-03 end 获取用户头像
                        $("#" + tabid + "").click(function () {
                            WebIM.JieMian.tabclick(this.id);
                        });
                        /*第四个if结束else开始*/
                    } else {
                        if (type == 1) {
                            tab.prepend(chattag);
                            //$("#UserBox").css("display", "block");
                            $("#WebIM_Tishi_FR").click(function () {
                                $(".webImTishi").hide();
                                $(".chat_history").removeClass("min_chat_history");
                            });

                        } else {
                            youtxli.prepend(chattag);
                        }

                        //wjl 添加2015-03-03 begin 获取用户头像
                        var userImg;
                        $.ajax({
                            url: WebImHostUrl + "/profile/Ajax/GetUserIcon.ashx?touid=" + touid + "&key=" + key + "&callback=?",
                            dataType: "jsonp",
                            type: "GET",
                            crossDomain: true,
                            success: function (data) {
                                if (data["result"] == "0") {
                                    userImg = data["UserImg"];
                                    //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + userImg + ")");
                                    $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + userImg + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                } else if (data["result"] == "1") {
                                    // $(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                    $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                }
                                else {
                                    //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                    $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0,5").css("filter", "alpha(opacity=50)");
                                    alert(data["report"]);
                                }
                            }
                        });
                        //wjl 添加 2015-03-03 end 获取用户头像
                        $("#" + tabid + "").click(function () {
                            WebIM.JieMian.tabclick(this.id);
                        });
                    } /*第四个else结束*/
                    /*1并列第四个if开始  添加右侧聊天内容*/
                    if (type == 1) {
                        $("#youtx_ch_webim .Takle_listxt").css('display', "none");
                        $("#" + tabid + "").addClass("Listcur").siblings().removeClass("Listcur");
                        fdid = WebIM.JieMian.GetFangdongID(touid, houseid);
                        fdid = fdid.split("_");
                        if (fdid.length > 0) {
                            if (fdid[0] == "0") {
                                if (fdid[1] == touid) {
                                    hc.append(chat);
                                    $("#" + housRecomd).css("visibility", "hidden");
                                } else {
                                    hc.append(chat);
                                }
                            } else {
                                hc.append(chat);
                            }
                        } else {
                            hc.append(chat);
                        }

                        if (showtype != 1) {
                            TalkBoxShow();
                        }

                        $("#" + tabid + "").click(function () {
                            WebIM.JieMian.tabclick(this.id);
                        });
                    } else {
                        youtxdiv.append(chat);

                        //$("#win_y_" + touid + "_" + houseid + " .chat_history")[0].innerHTML = WebIM.JieMian.GetCookie("WebIM_content_win_y_" + touid + "_" + houseid);

                    } /*1并列第四个if结束*/

                    WebIM.JieMian.addEvent(id);
                    /*2并列第四个if开始  添加房源信息*/
                    if (touname == "" && type == 1 && $("#" + id + " .Chatroom").html() == "") {
                        WebIM.JieMian.GetHouse(touid, houseid, key, function (data) {

                            if (data["result"] == 0) {
                                var h = '<h2><a href="/room/' + data["HouseID"] + '" target="_blank">' + data["HouseTitle"] + '</a></h2>'
                                    + '<p class="Chat_pay">' + data["DayPrice"] + '</p>'
                                    + '<p>' + data["Country"] + '，' + data["Provinces"] + '，' + data["City"] + '，' + data["District"] + '，' + data["Area"] + '</p>'
                                    + '<p class="ColorGray999"  style="padding-top:6px;">' + data["HouseType"] + '-' + data["RoomType"] + '&nbsp;' + data["JuShiNum"] + '居' + '</p>';
                                $("#" + id + " .Chatroom").html(h);
                                $("#" + tabid + "").attr("title", data["userName"]);
                                $("#" + tabid + " .TalkName").html(data["userName"]);

                                //wjl 2015-02-10begin  判断是否有400电话
                                $(".RentName").html(data["userName"]);
                                if (data["fangDongPhone"] != "" && data["fangDong"] != "") {
                                    $("#" + id + " .PhoneNum").css("display", "block");
                                    //$(".FwB").html(data["fangDong"]);
                                    //$("#FontArial").html(data["fangDongPhone"]);
                                    $("#" + id).find(".FwB").html(data["fangDong"]);
                                    $("#" + id).find("#FontArial").html(data["fangDongPhone"]);
                                    $("#" + id + " .DialogRecord").css("top", "25px");
                                    $("#" + id + " .DialogRecord").css("height", "202px");
                                } else {
                                    $("#" + id + " .PhoneNum").css("display", "none");
                                    $("#" + id + " .DialogRecord").css("top", "0px");
                                    $("#" + id + " .DialogRecord").css("height", "227px");
                                }
                                //wjl 2015-02-10end  判断是否有400电话

                                name = data["userName"];
                                if (warnList.length <= 0) {
                                    ReName("" + name + "");
                                }
                                if (opentype == 1) {
                                    WebIM.Query.OpenWindow(loguserid, fsName, touid, "" + name + "", houseid);
                                }
                            }
                        });

                        /*2并列第四个if结束else开始*/
                    } else {
                        if (webim_x == webim_y && type == 1 && $("#" + id + " .Chatroom").html() == "") {

                            WebIM.JieMian.GetHouse(touid, houseid, key, function (data) {
                                if (data["result"] == 0) {
                                    webim_x = 1, webim_y = 0;
                                    var h = '<h2><a href="/room/' + data["HouseID"] + '" target="_blank">' + data["HouseTitle"] + '</a></h2>'
                                        + '<p class="Chat_pay">' + data["DayPrice"] + '</p>'
                                        + '<p>' + data["Country"] + '，' + data["Provinces"] + '，' + data["City"] + '，' + data["District"] + '，' + data["Area"] + '</p>'
                                        + '<p class="ColorGray999"  style="padding-top:6px;">' + data["HouseType"] + '-' + data["RoomType"] + '&nbsp;' + data["JuShiNum"] + '居' + '</p>';

                                    $("#" + id + " .Chatroom").html(h);
                                    $("#" + tabid + "").attr("title", data["userName"]);
                                    $("#" + tabid + " .TalkName").html(data["userName"]);

                                    //wjl 2015-02-10begin  判断是否有400电话
                                    $(".RentName").html(data["userName"]);
                                    if (data["fangDongPhone"] != "" && data["fangDong"] != "") {
                                        $("#" + id + " .PhoneNum").css("display", "block");
                                        //$(".FwB").html(data["fangDong"]);
                                        //$("#FontArial").html(data["fangDongPhone"]);
                                        $("#" + id).find(".FwB").html(data["fangDong"]);
                                        $("#" + id).find("#FontArial").html(data["fangDongPhone"]);
                                        $("#" + id + " .DialogRecord").css("top", "25px");
                                        $("#" + id + " .DialogRecord").css("height", "202px");
                                    } else {
                                        $("#" + id + " .PhoneNum").css("display", "none");
                                        $("#" + id + " .DialogRecord").css("top", "0px");
                                        $("#" + id + " .DialogRecord").css("height", "227px");
                                    }
                                    //wjl 2015-02-10end  判断是否有400电话

                                    name = data["userName"];
                                    if (warnList.length <= 0) {
                                        ReName("" + name + "");
                                    }
                                    if (opentype == 1) {
                                        WebIM.Query.OpenWindow(loguserid, fsName, touid, "" + name + "", houseid);
                                    }
                                }
                            });

                        } else {
                            $("#" + tabid + "").attr("title", touname);
                            $("#" + tabid + " .TalkName").html(touname);

                            if (warnList.length <= 0) {
                                ReName("" + touname + "");
                            }
                            //                            if (opentype == 1) {
                            //                                WebIM.Query.OpenWindow(loguserid, fsName, touid, "" + touname + "", houseid);
                            //                            }
                        }

                    } /*2并列第四个else结束*/


                    /*第三个if结束，对于else开始*/
                } else {
                    //(原来的)if ($(".TabHeader li").is("#" + tabid + "") == false && $("#youtx_none_li li").is("#" + tabid + "") == true) {
                    if ($(".TabHeader li").is("#" + tabid + "") == false) {
                        chattag = '<li class="Listcur" id="' + tabid + '" title=' + $("#" + tabid).attr("title") + '>' + $("#" + tabid).html() + '</li>';
                        chat = '<div  id="' + id + '" style="display: block;" class="Takle_listxt">' + $("#" + id).html() + '</div>'
                        var tabi = $(".TabHeader li").length;
                        /*添加左侧对话人员列表*/
                        if (tabi > 0) {
                            tab.prepend(chattag);

                            //wjl 添加2015-03-03 begin 获取用户头像
                            var userImg;
                            $.ajax({
                                url: WebImHostUrl + "/profile/Ajax/GetUserIcon.ashx?touid=" + touid + "&key=" + key + "&callback=?",
                                dataType: "jsonp",
                                type: "GET",
                                crossDomain: true,
                                success: function (data) {
                                    if (data["result"] == "0") {
                                        userImg = data["UserImg"];
                                        //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + userImg + ")");
                                        $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + userImg + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                    } else if (data["result"] == "1") {
                                        // $(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                        $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                    }
                                    else {
                                        //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                        $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                        alert(data["report"]);
                                    }
                                }
                            });
                            //wjl 添加 2015-03-03 end 获取用户头像

                            // $(".TabHeader li").eq(5).remove();
                        } else {
                            tab.prepend(chattag);
                            //wjl 添加2015-03-03 begin 获取用户头像
                            var userImg;
                            $.ajax({
                                url: WebImHostUrl + "/profile/Ajax/GetUserIcon.ashx?touid=" + touid + "&key=" + key + "&callback=?",
                                dataType: "jsonp",
                                type: "GET",
                                crossDomain: true,
                                success: function (data) {
                                    if (data["result"] == "0") {
                                        userImg = data["UserImg"];
                                        //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + userImg + ")");
                                        $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + userImg + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                    } else if (data["result"] == "1") {
                                        // $(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                        $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                    }
                                    else {
                                        //$(".TabHeader .Listcur .TalkOnline03").css("background-image", "url(" + data["ms"] + ")");
                                        $("#tab_y_" + touid + "_" + houseid + " .UserImg .TalkOnline03").css("background-image", "url(" + data["ms"] + ")").css("opacity", "0.5").css("filter", "alpha(opacity=50)");
                                        alert(data["report"]);
                                    }
                                }
                            });
                            //wjl 添加 2015-03-03 end 获取用户头像
                        }
                        $("#youtx_ch_webim .Takle_listxt").css('display', "none");
                        $("#" + tabid + "").addClass("Listcur").siblings().removeClass("Listcur");
                        $("#" + tabid + "").click(function () {
                            WebIM.JieMian.tabclick(this.id);
                        });
                        fdid = WebIM.JieMian.GetFangdongID(touid, houseid);
                        fdid = fdid.split("_");
                        if (fdid.length > 0) {
                            if (fdid[0] == "0") {
                                if (fdid[1] == touid) {
                                    hc.append(chat);
                                    $("#" + housRecomd).css("visibility", "hidden");
                                } else {
                                    hc.append(chat);
                                }
                            } else {
                                hc.append(chat);
                            }
                        } else {
                            hc.append(chat);
                        }

                        //$("#youtx_none_li").find("li[id=" + tabid + "]").remove();
                        //$("#youtx_none_div").find("div[id=" + id + "]").remove();
                        WebIM.JieMian.addEvent(id);
                        //WebIM.JieMian.getTalkBoxShow();
                        if (showtype != 1) {
                            //WebIM.JieMian.getTalkBoxShow();
                            TalkBoxShow();

                            if ($("#" + id + " .Chatroom").html() == "") {

                                WebIM.JieMian.GetHouse(touid, houseid, key, function (data) {
                                    if (data["result"] == 0) {
                                        var h = '<h2><a href="/room/' + data["HouseID"] + '" target="_blank">' + data["HouseTitle"] + '</a></h2>'
                                            + '<p class="Chat_pay">' + data["DayPrice"] + '</p>'
                                            + '<p>' + data["Country"] + '，' + data["Provinces"] + '，' + data["City"] + '，' + data["District"] + '，' + data["Area"] + '</p>'
                                            + '<p class="ColorGray999"  style="padding-top:6px;">' + data["HouseType"] + '-' + data["RoomType"] + '&nbsp;' + data["JuShiNum"] + '居' + '</p>';

                                        $("#" + id + " .Chatroom").html(h);
                                        $("#" + tabid + "").attr("title", data["userName"]);
                                        $("#" + tabid + " .TalkName").html(data["userName"]);

                                        //wjl 2015-02-10begin  判断是否有400电话
                                        $(".RentName").html(data["userName"]);
                                        if (data["fangDongPhone"] != "" && data["fangDong"] != "") {
                                            $("#" + id + " .PhoneNum").css("display", "block");
                                            //$(".FwB").html(data["fangDong"]);
                                            //$("#FontArial").html(data["fangDongPhone"]);
                                            $("#" + id).find(".FwB").html(data["fangDong"]);
                                            $("#" + id).find("#FontArial").html(data["fangDongPhone"]);
                                            $("#" + id + " .DialogRecord").css("top", "25px");
                                            $("#" + id + " .DialogRecord").css("height", "202px");
                                        } else {
                                            $("#" + id + " .PhoneNum").css("display", "none");
                                            $("#" + id + " .DialogRecord").css("top", "0px");
                                            $("#" + id + " .DialogRecord").css("height", "227px");
                                        }
                                        //wjl 2015-02-10end  判断是否有400电话

                                        name = data["userName"];
                                        if (warnList.length <= 0) {
                                            ReName("" + name + "");
                                        }
                                        if (opentype == 1) {
                                            WebIM.Query.OpenWindow(loguserid, fsName, touid, "" + name + "", houseid);
                                        }
                                    }
                                });

                            }
                        }
                        // tbx.show();
                    } else {
                        var tabi = $(".TabHeader li").length;
                        if (tabi > 0) {
                            if ($(".TabHeader li").is("#" + tabid + "")) {
                                $("#youtx_ch_webim .Takle_listxt").css('display', "none")
                                $("#" + id + "").css('display', "block");
                                $("#" + tabid + "").addClass("Listcur").siblings().removeClass("Listcur");
                                WebIM.JieMian.tabclick(tabid);
                            }
                            else {
                                //WebIM.JieMian.yichuClick(tab, tabid);
                                WebIM.JieMian.tabclick(tabid);
                            }

                        } else {
                            WebIM.JieMian.tabclick(tabid);
                        }
                    }
                    if (type == 1 && warnList.length > 0 && (touid == warnList[warnList.length - 1].toID)) {
                        RemoveWarnByIDAndHouseID(touid, houseid);
                    }
                    $("#" + tabid + "").click(function () {
                        WebIM.JieMian.tabclick(this.id);
                    });
                } /*第三个else结束*/
                CountTotal("_" + touid + "_" + houseid + "");
                /*并列第三个if开始*/
                if ($(".TabHeader li").is("#" + tabid + "")) {
                    //WebIM.JieMian.getTalkBoxShow();
                    if (showtype != 1) {
                        //WebIM.JieMian.getTalkBoxShow();
                        TalkBoxShow();
                        if ($("#" + id + " .Chatroom").html() == "") {
                            WebIM.JieMian.GetHouse(touid, houseid, key, function (data) {
                                if (data["result"] == 0) {
                                    var h = '<h2><a href="/room/' + data["HouseID"] + '" target="_blank">' + data["HouseTitle"] + '</a></h2>'
                                        + '<p class="Chat_pay">' + data["DayPrice"] + '</p>'
                                        + '<p>' + data["Country"] + '，' + data["Provinces"] + '，' + data["City"] + '，' + data["District"] + '，' + data["Area"] + '</p>'
                                        + '<p class="ColorGray999" style="padding-top:6px;">' + data["HouseType"] + '-' + data["RoomType"] + '&nbsp;' + data["JuShiNum"] + '居' + '</p>';

                                    $("#" + id + " .Chatroom").html(h);
                                    $("#" + tabid + "").attr("title", data["userName"]);
                                    $("#" + tabid + " .TalkName").html(data["userName"]);

                                    name = data["userName"];
                                    if (warnList.length <= 0) {
                                        ReName("" + name + "");
                                    }
                                    if (opentype == 1) {
                                        WebIM.Query.OpenWindow(loguserid, fsName, touid, "" + name + "", houseid);
                                    }
                                }
                            });


                        }
                    }
                    CreateMessageBox();
                    name = $("#" + tabid + " span").eq(1).html();
                    if (warnList.length <= 0) {
                        ReName("" + name + "");
                    }
                } /*并列第三个if结束*/
            } /*第二个if结束*/

            if (type == 1) {
                getUid = touid + ",";
                WebIM.JieMian.GetUserState();
            }
            $(".WebIM_Tishi_FR").click(function () {
                $(".webImTishi").hide();
                $(".chat_history").removeClass("min_chat_history");
            });
            $("#" + id + " textarea").focus(function () {
                WebIM.JieMian.SetCookie("youtx_webimfocus", "true");
                WebIM.JieMian.SetCookie("youtx_webim_cut", "tab_y_" + this.id + "," + 1);
            });
            $("#" + id + " textarea").blur(function () {
                WebIM.JieMian.SetCookie("youtx_webimfocus", "false");
            });
            //wjl 添加 2015-03-03 begin
            var oBox3 = $('.Talk')[0];
            oBox3.onmouseover = function () {
                var imId1 = "win_y_" + touid + "_" + houseid;
                WebIm(imId1);
            };
            //wjl 添加 2015-03-03 end
        } /*第一个if结束*/
        else {
            window.location.href = "https://passport.youtx.com/user/login/" + window.location.href;
        }

    },
    //获取房东id
    GetFangdongID: function (toid, houseid) {
        var id = "-5_-5";
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/JudgeFangDongMessage.ashx?toid=" + toid + "&houseId=" + houseid + "&callback=?",
            dataType: "jsonp",
            async: false,
            type: "GET",
            crossDomain: false,
            success: function (data) {
                if (data.stateCode == "0") {
                    if (data.fangDongId > 0) {
                        if (data.fangDongId == toid) {
                            id = data.stateCode + "_" + data.fangDongId;
                        }
                    } else {
                        id = data.stateCode + "_" + data.fangDongId;
                    }
                } else {
                    id = data.stateCode + "_" + data.fangDongId;
                }
            }
        });
        return id;
    },
    //切换聊天窗口
    tabclick: function (id) {
        if (id != undefined) {

            $("#" + id + "").removeClass("List_Y");
            $("#" + id + "").addClass("Listcur").siblings().removeClass("Listcur");
            $("#youtx_ch_webim .Takle_listxt").css('display', "none");
            var sp = new Array();
            sp = id.split("_");
            $("#win_y_" + sp[2] + "_" + sp[3] + "").css('display', "block");
            var idwin = "win_y_" + sp[2] + "_" + sp[3];
            //$("#tab_y_" + sp[2] + "_" + sp[3]).attr("class") == "List_Y"
            var gh = $("#youtx_ch_webim").find("div:visible").attr("id");
            if (IsTalkBoxHide() == false) {

                var pos = $("#pos_" + sp[2] + "_" + sp[3] + "").val();
                if (loguserid != "" && pos != "") {
                    WebIM.Query.SetIsRead(sp[2], sp[3]);
                    WebIM.Query.SetReadPos(sp[2], pos, sp[3], loguserid);
                }
                $("#embed_webim_id").attr("autostart", "false");

            }


            $(".Yichu").hide();
            $("#win_y_" + sp[2] + "_" + sp[3] + " .chat_history").scrollTop(100000);
            WebIM.JieMian.SetCookie("youtx_webim_cut", id + "," + 1);

            if (warnList.length <= 0) {
                WebIM.JieMian.AlertTitle(oldtitie);
                //EditStyle("ChatUser_Y", "ChatUser_b");
                EditStyle("ChatUser_Y", "ChatUser");
                var name = $("#" + id + " span").eq(1).html();
                ReName("" + name + "");
            } else {
                SynBrowser(sp[2], sp[3]);

                if (warnList.length <= 0) {
                    WebIM.JieMian.AlertTitle(oldtitie);
                    //EditStyle("ChatUser_Y", "ChatUser_b");
                    EditStyle("ChatUser_Y", "ChatUser");
                }
            }
            //wjl 添加2015-02-10 begin
            $('#' + id).find('.TalkClose').css("display", "none");
            WebIM.JieMian.GetHouse(sp[2], sp[3], "webim", function (data) {
                //wjl 2015-02-10begin  判断是否有400电话
                $(".RentName").html(data["userName"]);
                if (data["fangDongPhone"] != "" && data["fangDong"] != "") {
                    $("#" + idwin + " .PhoneNum").css("display", "block");
                    //$(".FwB").html(data["fangDong"]);
                    //$("#FontArial").html(data["fangDongPhone"]);
                    $("#" + idwin).find(".FwB").html(data["fangDong"]);
                    $("#" + idwin).find("#FontArial").html(data["fangDongPhone"]);
                    $("#" + idwin + " .DialogRecord").css("top", "25px");
                    $("#" + idwin + " .DialogRecord").css("height", "202px");
                } else {
                    $("#" + idwin + " .PhoneNum").css("display", "none");
                    $("#" + idwin + " .DialogRecord").css("top", "0px");
                    $("#" + idwin + " .DialogRecord").css("height", "227px");
                }
                //wjl 2015-02-10end  判断是否有400电话
            })
            if ($("#win_y_" + sp[2] + "_" + sp[3] + " .Chatroom").html() == "") {
                WebIM.JieMian.GetHouse(sp[2], sp[3], "webim", function (data) {

                    if (data["result"] == 0) {
                        var h = '<h2><a href="/room/' + data["HouseID"] + '" target="_blank">' + data["HouseTitle"] + '</a></h2>'
                    + '<p class="Chat_pay">' + data["DayPrice"] + '</p>'
                    + '<p>' + data["Country"] + '，' + data["Provinces"] + '，' + data["City"] + '，' + data["District"] + '，' + data["Area"] + '</p>'
                    + '<p class="ColorGray999"  style="padding-top:6px;">' + data["HouseType"] + '-' + data["RoomType"] + '&nbsp;' + data["JuShiNum"] + '居' + '</p>';

                        $("#win_y_" + sp[2] + "_" + sp[3] + " .Chatroom").html(h);
                        var name = data["userName"];
                        $("#" + id + "").attr("title", name);
                        $("#" + id + " .TalkName").html(name);

                        if (warnList.length <= 0) {
                            ReName("" + name + "");
                        }
                        //wjl 2015-02-10begin  判断是否有400电话
                        $(".RentName").html(data["userName"]);
                        if (data["fangDongPhone"] != "" && data["fangDong"] != "") {
                            $("#" + idwin + " .PhoneNum").css("display", "block");
                            //$(".FwB").html(data["fangDong"]);
                            //$("#FontArial").html(data["fangDongPhone"]);
                            $("#" + idwin).find(".FwB").html(data["fangDong"]);
                            $("#" + idwin).find("#FontArial").html(data["fangDongPhone"]);
                            $("#" + idwin + " .DialogRecord").css("top", "25px");
                            $("#" + idwin + " .DialogRecord").css("height", "202px");
                        } else {
                            $("#" + idwin + " .PhoneNum").css("display", "none");
                            $("#" + idwin + " .DialogRecord").css("top", "0px");
                            $("#" + idwin + " .DialogRecord").css("height", "227px");
                        }
                        //wjl 2015-02-10end  判断是否有400电话
                    }
                });

            }
            var oBox3 = $('.Talk')[0];
            oBox3.onmouseover = function () {
                WebIm(idwin);
            }
            //wjl 添加2015-02-10 end
            //WebIM.Query.OpenWindow(loguserid, fsName, sp[2], "noname" + name + "", sp[3]);
        }

    },
    //切换tab
    yichuClick: function (tab, tabid) {
        Yichu_youtx_im = '<li id="' + $(".TabHeader li").eq(1001).attr("id") + '" title="' + $(".TabHeader li").eq(1001).attr("title") + '" class="' + $(".TabHeader li").eq(1001).attr("class") + '">' + $(".TabHeader li").eq(1001).html() + '</li>'
        $(".Yichu").prepend(Yichu_youtx_im);
        $(".TabHeader li").eq(1001).remove();
        $("#" + $(".Yichu li").eq(0).attr("id") + "").click(function () {

            WebIM.JieMian.yichuClick(tab, this.id);
            WebIM.JieMian.tabclick(this.id);
        });
        chattag = '<li  class="Listcur" id="' + tabid + '" title="' + $("#" + tabid + "").attr("title") + '" >' + $("#" + tabid + "").html() + '</li>';
        $("#" + tabid + "").remove();
        $(".TabHeader li").removeClass("Listcur");
        tab.prepend(chattag);
        $("#" + tabid + "").click(function () {
            WebIM.JieMian.tabclick(this.id);
        });
        WebIM.JieMian.SetCookie("youtx_webim_cut", tabid + "," + 2);
        if (warnList.length <= 0) {
            WebIM.JieMian.AlertTitle(oldtitie);
            //EditStyle("ChatUser_Y", "ChatUser_b");
            EditStyle("ChatUser_Y", "ChatUser");
        }
    },
    //移除当前
    yichudangqian: function (id) {

        var sp = new Array();
        sp = id.split("_");
        $("#" + id + "").remove();
        $("#win_y_" + sp[2] + "_" + sp[3] + "").remove();

    },
    //移除
    removeClick: function (a) {
        var TabHeader = $(".TabHeader li").length;
        var Yichu = $(".Yichu li").length;
        var id = $(a).parent().attr("id");
        if (id != undefined) {
            var tabid = $(".TabHeader").find("li[class='Listcur']").attr("id");
            var tab = $(".TabHeader");
            var sp = new Array();
            sp = id.split("_");

            WebIM.Query.CloseWindow(loguserid, sp[2], sp[3], function (r) {
                if (r == 0) {
                    if ($(".Yichu li").is("#" + id + "")) {//移除下拉里面的数据
                        //                        WebIM.JieMian.yichudangqian(id);
                        //                        if ($(".Yichu li").length <= 0) {
                        //                            $(".DownArrow").hide();
                        //                            $(".Yichu").hide();
                        //                        }
                    }
                    else if ($(".TabHeader li").is("#" + id + "")) { //移除tab里面的数据
                        var i = $(".TabHeader li").index($("#" + id)) + 1; //当前点击的位置

                        if (TabHeader == 1) {//判断tab里只有一个元素
                            userid_webim = "";
                            WebIM.JieMian.yichudangqian(id);
                            WebIM.JieMian.ShowHide();
                            // $(".TalkBox").hide();
                            RemoveChat();
                            WebIM.JieMian.DelCookie("youtx_bottomleft");
                        } else {//判断tab里有多个元素
                            if (id == tabid) {
                                if (i == TabHeader) { //判断是否点击的是最后一个如果是移除当前选中前一个
                                    if (Yichu == 0) {
                                        var htid = $("#" + id).prev().attr("id"); //得到前邻一个的id
                                        WebIM.JieMian.yichudangqian(id);
                                        WebIM.JieMian.tabclick(htid);

                                        //wjl 修改 2015-02-25begin
                                        var oBox3 = $('.Talk')[0];
                                        oBox3.onmouseover = function () {
                                            //var imId = $(".Listcur").attr("id");
                                            var sp2 = htid.split("_");
                                            var imId1 = "win_y_" + sp2[2] + "_" + sp2[3];
                                            WebIm(imId1);
                                        }
                                        //wjl 修改 2015-02-25end
                                    } else { //如果溢出有元素就选中溢出的第一个元素向上移
                                        var yidi = $(".TabHeader li").eq(0).attr("id");

                                        WebIM.JieMian.yichudangqian(id);
                                        //wjl 修改 2015-02-25begin
                                        //chattag = '<li class="Listcur" id="' + yidi + '" title=' + $(".Yichu li").eq(0).attr("title") + '>' + $(".Yichu li").eq(0).html() + '</li>';
                                        //tab.append(chattag);   
                                        //$(".TabHeader li").eq(0).remove();
                                        var oBox3 = $('.Talk')[0];
                                        oBox3.onmouseover = function () {
                                            var imId = $(".Listcur").attr("id");
                                            var sp2 = imId.split("_");
                                            var imId1 = "win_y_" + sp2[2] + "_" + sp2[3];
                                            WebIm(imId1);
                                        }
                                        //wjl 修改 2015-02-25end
                                        if ($(".Yichu li").length <= 0) {
                                            $(".DownArrow").hide();
                                            $(".Yichu").hide();
                                        }
                                        WebIM.JieMian.tabclick(yidi);
                                        $("#" + yidi).click(function () {
                                            WebIM.JieMian.tabclick($(this).attr("id"));
                                        });
                                    }
                                    userid_webim = "";
                                } else if (i < TabHeader) {
                                    var htid = $("#" + id).next().attr("id"); //得到后邻一个的id
                                    WebIM.JieMian.yichudangqian(id);
                                    WebIM.JieMian.tabclick(htid);
                                    if (TabHeader != 0) {
                                        //var yidi = $(".TabHeader li").eq(0).attr("id");
                                        //wjl 修改 2015-02-25begin
                                        //chattag = '<li  id="' + yidi + '" title=' + $(".Yichu li").eq(0).attr("title") + '>' + $(".Yichu li").eq(0).html() + '</li>';
                                        //tab.append(chattag);
                                        //$(".TabHeader li").eq(0).remove();

                                        //wjl 修改 2015-02-25end
                                        if ($(".Yichu li").length <= 0) {
                                            $(".DownArrow").hide();
                                            $(".Yichu").hide();
                                        }
                                        //                                        $("#" + yidi).click(function () {
                                        //                                            WebIM.JieMian.tabclick($(this).attr("id"));
                                        //                                        });
                                    }
                                    var oBox3 = $('.Talk')[0];
                                    oBox3.onmouseover = function () {
                                        //var imId = $(".Listcur").attr("id");
                                        var sp2 = htid.split("_");
                                        var imId1 = "win_y_" + sp2[2] + "_" + sp2[3];
                                        WebIm(imId1);
                                    }
                                }
                            } else {
                                if (TabHeader > 0) {//如果溢出有元素就选中溢出的第一个元素向上移
                                    var yidi = $(".TabHeader li").eq(0).attr("id");
                                    WebIM.JieMian.yichudangqian(id);
                                    //wjl 修改 2015-02-25begin
                                    //chattag = '<li class="Listcur" id="' + yidi + '" title=' + $(".Yichu li").eq(0).attr("title") + '>' + $(".Yichu li").eq(0).html() + '</li>';
                                    //tab.append(chattag);
                                    //$(".TabHeader li").eq(0).remove();
                                    var oBox3 = $('.Talk')[0];
                                    oBox3.onmouseover = function () {
                                        //var imId = $(".Listcur").attr("id");
                                        var sp2 = tabid.split("_");
                                        var imId1 = "win_y_" + sp2[2] + "_" + sp2[3];
                                        WebIm(imId1);
                                    }
                                    //wjl 修改 2015-02-25end
                                    if ($(".Yichu li").length <= 0) {
                                        $(".DownArrow").hide();
                                        $(".Yichu").hide();
                                    }
                                    WebIM.JieMian.tabclick(tabid);
                                    //                                    $("#" + yidi).click(function () {
                                    //                                        WebIM.JieMian.tabclick($(this).attr("id"));
                                    //                                    });

                                } else {
                                    WebIM.JieMian.yichudangqian(id);
                                    WebIM.JieMian.tabclick(tabid);
                                }
                            }


                        }
                    }
                }
            });

        } else {
            //  $(".TalkBox").hide();
        }


    },
    //移除
    TalkRemoveClick: function (a) {
        var TabHeader = $(".TabHeader li").length;
        var Yichu = $(".Yichu li").length;
        var id = $(a).parent().attr("id");
        if (id != undefined) {
            var tabid = $(".TabHeader").find("li[class='Listcur']").attr("id");
            var tab = $(".TabHeader");
            var sp = new Array();
            sp = id.split("_");

            //            WebIM.Query.CloseWindow(loguserid, sp[2], sp[3], function (r) {
            //                if (r == 0) {
            if ($(".Yichu li").is("#" + id + "")) {//移除下拉里面的数据
                WebIM.JieMian.yichudangqian(id);
                if ($(".Yichu li").length <= 0) {
                    $(".DownArrow").hide();
                    $(".Yichu").hide();
                }
            }
            else if ($(".TabHeader li").is("#" + id + "")) { //移除tab里面的数据
                var i = $(".TabHeader li").index($("#" + id)) + 1; //当前点击的位置

                if (TabHeader == 1) {//判断tab里只有一个元素
                    userid_webim = "";
                    WebIM.JieMian.yichudangqian(id);
                    WebIM.JieMian.ShowHide();
                    // $(".TalkBox").hide();
                    RemoveChat();
                    WebIM.JieMian.DelCookie("youtx_bottomleft");
                } else {//判断tab里有多个元素
                    if (id == tabid) {
                        if (i == TabHeader) { //判断是否点击的是最后一个如果是移除当前选中前一个
                            if (Yichu == 0) {
                                var htid = $("#" + id).prev().attr("id"); //得到前邻一个的id
                                WebIM.JieMian.yichudangqian(id);
                                WebIM.JieMian.tabclick(htid);

                            } else { //如果溢出有元素就选中溢出的第一个元素向上移
                                var yidi = $(".TabHeader li").eq(0).attr("id");

                                WebIM.JieMian.yichudangqian(id);
                                chattag = '<li class="Listcur" id="' + yidi + '" title=' + $(".Yichu li").eq(0).attr("title") + '>' + $(".Yichu li").eq(0).html() + '</li>';

                                if ($(".Yichu li").length <= 0) {
                                    $(".DownArrow").hide();
                                    $(".Yichu").hide();
                                }
                                WebIM.JieMian.tabclick(yidi);
                                $("#" + yidi).click(function () {
                                    WebIM.JieMian.tabclick($(this).attr("id"));
                                });
                            }
                            userid_webim = "";
                        } else if (i < TabHeader) {
                            var htid = $("#" + id).next().attr("id"); //得到后邻一个的id
                            WebIM.JieMian.yichudangqian(id);
                            WebIM.JieMian.tabclick(htid);
                            if (Yichu != 0) {
                                var yidi = $(".TabHeader li").eq(0).attr("id");
                                //chattag = '<li  id="' + yidi + '" title=' + $(".Yichu li").eq(0).attr("title") + '>' + $(".Yichu li").eq(0).html() + '</li>';
                                //wjl 修改2015-02-25begin
                                //tab.append(chattag);
                                //$(".Yichu li").eq(0).remove();

                                if ($(".Yichu li").length <= 0) {
                                    $(".DownArrow").hide();
                                    $(".Yichu").hide();
                                }
                                //                                $("#" + yidi).click(function () {
                                //                                    WebIM.JieMian.tabclick($(this).attr("id"));
                                //                                });
                            }
                        }
                    } else {
                        if (TabHeader > 0) {//如果溢出有元素就选中溢出的第一个元素向上移
                            //                            var yidi = $(".TabHeader li").eq(0).attr("id");
                            WebIM.JieMian.yichudangqian(id);
                            //chattag = '<li class="Listcur" id="' + yidi + '" title=' + $(".Yichu li").eq(0).attr("title") + '>' + $(".Yichu li").eq(0).html() + '</li>';
                            //wjl 修改 2015-02-25begin
                            //tab.append(chattag);
                            //$(".Yichu li").eq(0).remove();

                            if ($(".Yichu li").length <= 0) {
                                $(".DownArrow").hide();
                                $(".Yichu").hide();
                            }
                            WebIM.JieMian.tabclick(tabid);
                            //                            $("#" + yidi).click(function () {
                            //                                WebIM.JieMian.tabclick($(this).attr("id"));
                            //                            });

                        } else {
                            WebIM.JieMian.yichudangqian(id);
                            WebIM.JieMian.tabclick(tabid);
                        }
                    }
                }
            }
            //wjl 修改 2015-02-25begin
            var oBox3 = $('.Talk')[0];
            oBox3.onmouseover = function () {
                var sp2 = tabid.split("_");
                var imId1 = "win_y_" + sp2[2] + "_" + sp2[3];
                WebIm(imId1);
            }
            //wjl 修改 2015-02-25end
        } else {
            //  $(".TalkBox").hide();
        }
    },
    //判断是否已创建聊天窗口 返回false 没有创建 true 已创建
    exist: function (touid, houseid) {
        var id = "win_y_" + touid + "_" + houseid;
        var form = $("#youtx_ch_webim").find("div[id=" + id + "]"); //.children().first()

        if (form.length == 0) {
            return false;
        } else {
            return true;
        }
    },
    //长连接调用
    MeetingMember: function (jsonObj) {
        if (jsonObj != null) {
            var id = "", html = "", tabid = "", uidhouseid;
            //jsonObj["Shield"]  /*后台屏蔽功能：表DzUserMessage 中 shield=1屏蔽 shieid=0未屏蔽*/
            //wjl 添加2015-03-13 begin
            var content2 = "";
            if (jsonObj["content"] != null) {
                content2 = WebIM.JieMian.GetContent(jsonObj["content"]);
            }
            var cont1 = "";
            //判断消息类型20150727
            if (jsonObj["content"] != null) {
                var arr = new Array();
                arr = jsonObj["content"].split("^^^");
                if (arr.length > 1) {
                    if (parseInt(arr[0]) == 3 || parseInt(arr[0]) == 7) {
                        cont1 = WebIM.JieMian.GetContentUrl(content2);
                    } else {
                        cont1 = content2;
                    }
                } else {
                    cont1 = WebIM.JieMian.GetContentUrl(content2);
                }
            }

            //wjl 添加 2015-03-13 end
            switch (jsonObj["type"]) {

                case 1: //接收到的信息
                    if (getUid.indexOf("" + jsonObj["uid"] + ",") < 0) {
                        getUid += jsonObj["uid"] + ",";
                    }
                    id = "win_y_" + jsonObj["uid"] + "_" + jsonObj["roomid"];
                    tabid = "tab_y_" + jsonObj["uid"] + "_" + jsonObj["roomid"];
                    var br_ = "";
                    $("#pos_" + jsonObj["uid"] + "_" + jsonObj["roomid"] + "").val(jsonObj["nowreadpos"]);
                    if (jsonObj["content"].replace(/\s+/g, "") == "") {
                        br_ = "<br>";
                    }
                    uidhouseid = jsonObj["uid"] + jsonObj["roomid"];
                    if ($("#" + id + "").length > 0) {
                        //2015-04-24  5分钟系统提示 begin
                        if (cont1 == "房东大叔不回话，快让客服Duang一下：客服电话：400-630-0088") {
                            var spt = new Array();
                            spt = cont1.split("：");
                            html = '<div class="ResetDefault"><p style="padding-top:10px;">' + spt[0] + '</p><p>' + spt[1] + '：<span>' + spt[2] + '</span></p></div>';
                            //2015-04-24  5分钟系统提示end
                        } else if (userid_webim == uidhouseid && time_webim == (new Date(jsonObj["time"] * 1000)).getMinutes()) {
                            // html = '<div class="Chat_main"><p class="CB"></p><p>' + cont1 + '</p>' + br_ + '</div>';
                            html = '<div class="Chat_main"><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                        } else {
                            html = '<div class="Chat_main"><p class="Chat_h2"><span class="ChatName">' + jsonObj["uname"] + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                            //html = '<div class="Chat_main"><p class="Chat_h2"><span class="ChatName">' + jsonObj["uname"] + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><br><p class="CB"></p><br><p>' + cont1 + '</p>' + br_ + '</div>';
                        }
                        $("#" + id + " .chat_history").append(html);

                        //wjl 添加2015-03-06 begin
                        var oCon03 = $("#" + id).find("#Con02");
                        var oCon02 = $("#" + id).find("#Con03");
                        var oSB03 = $("#" + id).find("#SB03");
                        var oSB02 = $("#" + id).find("#SB02");

                        if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                            oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                            oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                        }
                        //wjl 添加2015-03-06 end
                    }
                    else {
                        WebIM.JieMian.AddChatWin(jsonObj["uid"], jsonObj["roomid"], "", 2, 2, "youtxkey");
                        //2015-04-24  5分钟系统提示 begin
                        if (cont1 == "房东大叔不回话，快让客服Duang一下：客服电话：400-630-0088") {
                            var spt = new Array();
                            spt = cont1.split("：");
                            html = '<div class="ResetDefault"><p style="padding-top:10px;">' + spt[0] + '</p><p>' + spt[1] + '：<span>' + spt[2] + '</span></p></div>';
                            //2015-04-24  5分钟系统提示end
                        } else if (userid_webim == uidhouseid && time_webim == (new Date(jsonObj["time"] * 1000)).getMinutes()) {
                            // html = '<div class="Chat_main"><p class="CB"></p><p>' + cont1 + '</p>' + br_ + '</div>';
                            html = '<div class="Chat_main"><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                        } else {
                            html = '<div class="Chat_main"><p class="Chat_h2"><span class="ChatName">' + jsonObj["uname"] + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                            //html = '<div class="Chat_main"><p class="Chat_h2"><span class="ChatName">' + jsonObj["uname"] + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><br><p class="CB"></p><br><p>' + cont1 + '</p>' + br_ + '</div>';
                        }
                        $("#" + id + " .chat_history").append(html);
                        //wjl 添加2015-03-06 begin
                        var oCon03 = $("#" + id).find("#Con02");
                        var oCon02 = $("#" + id).find("#Con03");
                        var oSB03 = $("#" + id).find("#SB03");
                        var oSB02 = $("#" + id).find("#SB02");

                        if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                            oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                            oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                        }
                        //wjl 添加2015-03-06 end
                    }

                    if (!WebIM.JieMian.exist(jsonObj["uid"], jsonObj["roomid"]) && jsonObj["ishistory"] != 1) {
                        AddMesList(jsonObj["type"], jsonObj["uid"], jsonObj["uname"], jsonObj["roomid"], 1, WebIM.JieMian.GetContent(jsonObj["content"]), 2, "key", 1);
                    }
                    if (jsonObj["ishistory"] == 1) {
                        AddMesList(3, jsonObj["uid"], jsonObj["uname"], jsonObj["roomid"], 1, WebIM.JieMian.GetContent(jsonObj["content"]), 2, "key", 1);
                    }

                    var gh = $("#youtx_ch_webim").find("div:visible").attr("id");

                    if (gh != undefined && gh == "win_y_" + jsonObj["uid"] + "_" + jsonObj["roomid"] && IsTalkBoxHide() == false) {
                        WebIM.Query.SetIsRead(jsonObj["uid"], jsonObj["roomid"]);
                        var pos = $("#pos_" + jsonObj["uid"] + "_" + jsonObj["roomid"] + "").val();
                        if (loguserid != "" && pos != "") {
                            WebIM.Query.SetReadPos(jsonObj["uid"], pos, jsonObj["roomid"], loguserid);
                        }
                        $("#embed_webim_id").attr("autostart", "false");
                    }
                    userid_webim = uidhouseid;
                    time_webim = (new Date(jsonObj["time"] * 1000)).getMinutes();
                    $("#" + id + " .chat_history").scrollTop(100000);
                    var webimfocu = WebIM.JieMian.GetCookie("youtx_webimfocus");
                    if ($(".TabHeader #" + tabid).attr("class") != 'Listcur' && jsonObj["ishistory"] != 1) {
                        $("#" + tabid).addClass("List_Y").removeClass("Listcur");
                        WebIM.JieMian.AlertTitle("【新消息】", true);
                        $("#embed_webim_id").attr("autostart", "true");
                        AddWarn(CreateWarn(jsonObj["uid"], jsonObj["roomid"], jsonObj["uname"]));
                        WebIM.JieMian.playSound();
                    } else if ((webimfocu == "false" || webimfocu == null) && jsonObj["ishistory"] != 1) {
                        $("#" + tabid).addClass("List_Y").removeClass("Listcur");
                        WebIM.JieMian.AlertTitle("【新消息】", true);
                        $("#embed_webim_id").attr("autostart", "true");
                        AddWarn(CreateWarn(jsonObj["uid"], jsonObj["roomid"], jsonObj["uname"]));
                        WebIM.JieMian.playSound();

                    } else if ($(".TabHeader #" + tabid).length <= 0 && jsonObj["ishistory"] != 1) {
                        $("#" + tabid).addClass("List_Y").removeClass("Listcur");
                        WebIM.JieMian.AlertTitle("【新消息】", true);
                        $("#embed_webim_id").attr("autostart", "true");
                        AddWarn(CreateWarn(jsonObj["uid"], jsonObj["roomid"], jsonObj["uname"]));
                        WebIM.JieMian.playSound();
                    }
                    WebIM.JieMian.SetCookie("youtx_webim_cut", "null");
                    //wjl 添加 2015-03-03 begin
                    var oBox3 = $('.Talk')[0];
                    oBox3.onmouseover = function () {
                        var nowId = $("#youtx_ch_webim").find("div:visible").attr("id");
                        WebIm(nowId);
                    }
                    //wjl 添加 2015-03-03 end
                    break;
                case 2: //发送的信息
                    id = "win_y_" + jsonObj["uid"] + "_" + jsonObj["roomid"];
                    if (ttid == 0) {
                        var br_ = "";
                        uidhouseid = loguserid + jsonObj["roomid"];
                        if (jsonObj["content"].replace(/\s+/g, "") == "") {
                            br_ = "<br>";
                        }
                        if ($("#" + id + "").length > 0) {
                            //2015-04-24  5分钟系统提示 begin
                            if (cont1 == "房东大叔不回话，快让客服Duang一下：客服电话：400-630-0088") {
                                html = "";
                                //2015-04-24  5分钟系统提示end
                            } else if (userid_webim == uidhouseid && time_webim == (new Date(jsonObj["time"] * 1000)).getMinutes()) {
                                //html = '<div class="Chat_main02"><p class="CB"></p><p>' + cont1 + '</p><p class="ColorRed" style="text-align:right">' + jsonObj["fmsg"] + '</p>' + br_ + '</div>';
                                html = '<div class="Chat_main02"><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                            }
                            else {
                                // html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><br><p class="CB"></p><br><p>' + cont1 + '</p><p class="ColorRed" style="text-align:right">' + jsonObj["fmsg"] + '</p>' + br_ + '</div>';
                                html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                            }
                            $("#" + id + " .chat_history").append(html);

                            //wjl 添加2015-03-06 begin
                            var oCon03 = $("#" + id).find("#Con02");
                            var oCon02 = $("#" + id).find("#Con03");
                            var oSB03 = $("#" + id).find("#SB03");
                            var oSB02 = $("#" + id).find("#SB02");

                            if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                                oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                                oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                            }
                            //wjl 添加2015-03-06 end

                        }
                        else {
                            WebIM.JieMian.AddChatWin(jsonObj["uid"], jsonObj["roomid"], "", 2, 2, "youtxkey");
                            //2015-04-24  5分钟系统提示 begin
                            if (cont1 == "房东大叔不回话，快让客服Duang一下：客服电话：400-630-0088") {
                                html = "";
                                //2015-04-24  5分钟系统提示end
                            } else if (userid_webim == uidhouseid && time_webim == (new Date(jsonObj["time"] * 1000)).getMinutes()) {
                                html = '<div class="Chat_main02"><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                                //html = '<div class="Chat_main02"><p class="CB"></p><p>' + cont1 + '</p><p class="ColorRed" style="text-align:right">' + jsonObj["fmsg"] + '</p>' + br_ + '</div>';
                            }
                            else {
                                //html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span></p><br><p class="CB"></p><br><p>' + cont1 + '</p><p class="ColorRed" style="text-align:right">' + jsonObj["fmsg"] + '</p>' + br_ + '</div>';
                                html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate((new Date(jsonObj["time"] * 1000))) + '</span><p class="CRecordCon">' + cont1 + '</p>' + br_ + '</div>';
                            }

                            $("#" + id + " .chat_history").append(html);
                            //wjl 添加2015-03-06 begin
                            var oCon03 = $("#" + id).find("#Con02");
                            var oCon02 = $("#" + id).find("#Con03");
                            var oSB03 = $("#" + id).find("#SB03");
                            var oSB02 = $("#" + id).find("#SB02");

                            if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                                oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                                oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                            }
                            //wjl 添加2015-03-06 end
                        }
                        userid_webim = uidhouseid;

                        time_webim = (new Date(jsonObj["time"] * 1000)).getMinutes();
                        $("#" + id + " .chat_history").scrollTop(100000);
                    }
                    //wjl 添加 2015-03-03 begin
                    var oBox3 = $('.Talk')[0];
                    oBox3.onmouseover = function () {
                        var nowId = $("#youtx_ch_webim").find("div:visible").attr("id");
                        WebIm(nowId);
                    }
                    //wjl 添加 2015-03-03 end
                    break;
                case 3: //最近联系人
                    id = "win_y_" + jsonObj["uid"] + "_" + jsonObj["roomid"];
                    if ($("#" + id + "").length == 0) {
                        // WebIM.JieMian.AddChatWin(jsonObj["uid"], jsonObj["roomid"], 2, "youtxkey");
                    }
                    AddMesList(jsonObj["type"], jsonObj["uid"], jsonObj["uname"], jsonObj["roomid"], jsonObj["status"], jsonObj["content"], 2, "key", 0);

                    break;
                case 4: //已打开窗口上线通知
                    var zxtype = new Array();
                    zxtype = $(".TabHeader li[id^='tab_y_" + jsonObj["uid"] + "_']");
                    if (zxtype != null) {
                        for (j = 0; j < zxtype.length; j++) {
                            var tem = $(zxtype[j]).attr("id");
                            $("#" + tem + " span").eq(0).css("opacity", "0.5");
                            //zxtype.addClass("TalkOnline02").removeClass("TalkOnline03")
                        }
                        //zxtype.addClass("TalkOnline02").removeClass("TalkOnline03");
                        $("#SpanName_" + jsonObj["uid"] + "_" + jsonObj["roomid"]).attr("class", "Mes_name_Online");
                    }
                    break;
                case 5: //已打开好友下线通知
                    var zxtype = new Array();
                    zxtype = $(".TabHeader li[id^='tab_y_" + jsonObj["uid"] + "_']");
                    if (zxtype != null) {
                        for (j = 0; j < zxtype.length; j++) {
                            var tem = $(zxtype[j]).attr("id");
                            $("#" + tem + " span").eq(0).css("opacity", "0.5"); /*wjl2015-03-10目前接口有问题：等换接口不在线时此处的opacity=0.5*/
                        }
                        //zxtype.addClass("TalkOnline03").removeClass("TalkOnline02");
                        $("#SpanName_" + jsonObj["uid"] + "_" + jsonObj["roomid"]).attr("class", "Mes_name_Offline");
                    }
                    break;
                case 6:

                    MesListLiClose(jsonObj["uid"], jsonObj["roomid"]);
                    break;
                case 9:

                    WebIM.JieMian.AddChatWin(jsonObj["uid"], jsonObj["roomid"], "", 1, 2, "youtxwebim", 1);
                    //处理点击后队列及样式   
                    if (warnList.length == 0) {
                        //EditStyle("ChatUser_Y", "ChatUser_b");
                        WebIM.JieMian.AlertTitle(oldtitie);
                        EditStyle("ChatUser_Y", "ChatUser");
                    } else {
                        CutStyle();
                        if (warnList.length <= 0) {
                            ReName(warnList[warnList.length - 1].toName);
                        }
                    }

                    AddMesList(3, jsonObj["uid"], jsonObj["uname"], jsonObj["roomid"], jsonObj["status"], jsonObj["content"], 2, "key", 1);
                    break;
                case 10:
                    break;
                case 11: //关闭窗口通知   
                    WebIM.JieMian.TalkRemoveClick($("#tab_y_" + jsonObj["uid"] + "_" + jsonObj["roomid"] + " .TalkClose"));
                    break;
                case 12:

                    break;
            }
        }
    },
    //添加点击事件
    addEvent: function (obj) {
        var sp = new Array();
        sp = obj.split("_");
        var bj = $("#win_y_" + +sp[2] + "_" + sp[3]);
        bj.find("input[class='youtx_im_but']").click(function () { WebIM.JieMian.ChatWinSubmit("-1", null) });
        var send = $("#win_y_" + +sp[2] + "_" + sp[3] + " textarea").keydown(function (event) {
            event = event || window.event;
            if (event.keyCode == "13" || (event.keyCode == "13" && event.ctrlKey)) {
                WebIM.JieMian.ChatWinSubmit("-1", null);
                return false;
            }
        });
        //添加消息记录点击事件begin  2015-05-04
        $("#MR_" + sp[2] + "_" + sp[3]).click(function () {
            eval("var newTab_" + sp[2] + "_" + sp[3] + "=window.open('', '" + sp[2] + "_" + sp[3] + ":balnk', '', true);");
            //var newTab+'_' = window.open('', 'balnk', '', true);
            $.ajax({
                url: WebImHostUrl + "/profile/Ajax/GetMessageByToIdAndHouseId.ashx?toId=" + sp[2] + "&houseId=" + sp[3] + "&callback=?",
                dataType: "jsonp",
                type: "GET",
                crossDomain: false,
                success: function (data) {
                    var chat = $("#win_y_" + sp[2] + "_" + sp[3] + " .ChatWarning");
                    if (data.result == "0") {
                        if (data.messageId > 0) {
                            chat.html("");
                            var url1 = WebImHostUrl + '/profile/User/MailBox/MailDialog.aspx?messageID=' + data.messageId;
                            eval("newTab_" + sp[2] + "_" + sp[3] + ".location.href='" + url1 + "'");
                            //newTab.location.href = url1;
                        } else {
                            //newTab.close();
                            eval("newTab_" + sp[2] + "_" + sp[3] + ".close();");
                            chat.html("");
                            alert(data.text);
                        }
                    } else {
                        // newTab.close();
                        eval("newTab_" + sp[2] + "_" + sp[3] + ".close();");
                        chat.html(data.text);
                    }
                }
            });
        });
        $("#" + sp[2] + "_" + sp[3]).focus(function () {
            $("#win_y_" + sp[2] + "_" + sp[3] + " .ChatWarning").html("");
        });
        //end  2015-05-04
        //添加推荐房源点击事件begin2015-06-03
        $("#HR_" + sp[2] + "_" + sp[3]).click(function () {
            if ($(".HouseRe").html() != "") {
                $(".HouseRe").html("");
                $(".HouseRe").css("display", "none");
            } else {
                $.ajax({
                    url: WebImHostUrl + "/profile/Ajax/GetFangDongHouse.ashx?type=1&houseId=0&callback=?",
                    dataType: "jsonp",
                    type: "GET",
                    crossDomain: false,
                    success: function (data) {
                        if (data.result == "0") {
                            alert("您暂无房源信息");
                        } else if (data.result == "1") {
                            var houseRecommendBox = '';
                            var houseRecommendBoxLi = '';
                            var script = '';
                            //houseRecommendBox += '<div class="HouseRe PosAb" id="HRB_' + sp[2] + '_' + sp[3] + '" style="display:none;">';
                            houseRecommendBox += '<h2 class="HouseReTit"><span>房源推荐</span></h2>';
                            houseRecommendBox += '<div class="ConRecom" style="overflow:auto;">';
                            houseRecommendBox += '<ul class="HouseReUl" id="UL_"' + sp[2] + '_' + sp[3] + '>';
                            houseRecommendBox += '</ul></div>';

                            $(".HouseRe").append(houseRecommendBox);
                            $(data.data).each(function () {
                                var url = WebImHostUrl + "/room/" + this.HouseId + "/";
                                houseRecommendBoxLi += '<li class="PosRe HouseReList">';
                                houseRecommendBoxLi += '<dl class="clearfix"><a href="' + url + '" target="_blank" style="text-decoration:none;"><dt><img src="' + this.HousePic + '" width="69" height="52"></dt></a>';
                                houseRecommendBoxLi += '<dd><a href="' + url + '" target="_blank" style="text-decoration:none;"><h3 class="HouseReListTit TextEllipse">' + this.HouseTitle + '</h3></a>';
                                houseRecommendBoxLi += '<p class="HouseReListTxt TextEllipse">' + this.roomTypes + ' ' + this.bedRoomNum + '居 宜住' + this.LivepeoNum + '人</p>';
                                houseRecommendBoxLi += '<p class="HouseReListTxt TextEllipse">房源编号：' + this.HouseId + '</p>';
                                houseRecommendBoxLi += '<span class="HousePrice">' + this.DayPrice + '/晚</span>';
                                houseRecommendBoxLi += '</dd></dl><span id="' + sp[2] + '_' + this.HouseId + '" class="Recommend_01">推荐</span><p class="HouseReListborder"></p>';
                            });
                            $(".HouseRe .HouseReUl").append(houseRecommendBoxLi);
                            //$("#UL_" + sp[2] + '_' + sp[3] + " li:last-child").removeClass("HouseReListborder");
                            $(".HouseReUl li:last-child .HouseReListborder").removeClass("HouseReListborder");
                            script = '<script type="text/javascript">'
                            + '$(function(){'
                            + '$(document).bind("click",function(e){'
                            + 'var target = $(e.target);'
                            + 'if(target.closest(".HouseRe").length == 0){'
                            + '$(".HouseRe").html("");'
                            + '$(".HouseRe").hide();'
                            + '}})});'
                                + '$(".Recommend_01").each(function(index, element) {'
                                + '$(this).hover(function(){'
                                + ' $(this).addClass("RecommendCur");},'
                                + 'function(){$(this).removeClass("RecommendCur");});'
                                + '$(this).click(function () {'
                                + 'var spid=$(this).attr("id").split("_");'
                                + 'var tbId=$("#UserNr .Listcur").attr("id").split("_");'
                                + ' WebIM.JieMian.ChatWinSubmit("win_y_"+tbId[2]+"_"+tbId[3],WebImHostUrl + "/room/" + spid[1] + "/");'
                                + '});});'
                                + '</script>';
                            $(".HouseRe").append(script);
                            $(".HouseRe").css("display", "block");
                        }
                        else {
                            alert("数据加载异常");
                        }
                    }
                });
            }
        });
    },
    //添加2015-04-22 begin
    //判断房东有没有给租客回信
    JudgeFangDong: function (tId, hId) {
        //添加2015-04-22 消息发送成功，判断谁是房东begin
        var toId = tId;
        var houseId = hId;
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/JudgeFangDongMessage.ashx?toid=" + toId + "&houseId=" + houseId + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            crossDomain: false,
            success: function (data) {
                if (data.stateCode == "0") {
                    if (data.fangDongId > 0) {
                        if (data.fangDongId == toId) {
                            WebIM.JieMian.JudgeFangDongMessage(toId, houseId);
                        }
                    } else {
                        $("#win_y_" + toId + "_" + houseId + " .ChatWarning").html(data.text);
                    }
                } else {
                    $("#win_y_" + toId + "_" + houseId + " .ChatWarning").html(data.text);
                }
            }
        });
        //添加2015-04-22 消息发送成功，判断谁是房东end
    },
    JudgeFangDongMessage: function (toId, houseId) {
        var toId = toId;
        var houseId = houseId;
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/GetFangDongMessage.ashx?toId=" + toId + "&houseId=" + houseId + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            crossDomain: false,
            success: function (data) {
                if (data.stateCode == "0") {
                    if (data.messageCount == "0") {
                        WebIM.JieMian.AddSystemMessage(toId, houseId);
                    }
                } else {
                    $("#win_y_" + toId + "_" + houseId + " .ChatWarning").html(data.text);
                }
            }
        });
    },
    AddSystemMessage: function (toId, houseId) {
        var toId = toId;
        var houseId = houseId;
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/AddSystemMessage.ashx?toId=" + toId + "&houseId=" + houseId + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            crossDomain: false,
            success: function (data) {
                if (data.stateCode == "0") {
                } else {
                }
            }
        });
    },
    CheckMessage: function () {
        var thId = WebIM.JieMian.GetCookie("ck_" + loguserid);

        if (thId != null) {
            var sp1 = new Array();
            var sp2 = new Array();
            sp1 = thId.split(",");
            for (var i = 0; i < sp1.length - 1; i++) {
                sp2.length = 0;
                sp2 = sp1[i].split("_");
                $.ajax({
                    async: false,
                    url: WebImHostUrl + "/profile/Ajax/CheckMessage.ashx?toId=" + sp2[0] + "&houseId=" + sp2[1] + "&callback=?",
                    dataType: "jsonp",
                    type: "GET",
                    crossDomain: false,
                    success: function (data) {
                        if (data.result == "0" && data.sysMessageCount == "0") {
                            WebIM.JieMian.JudgeFangDong(sp2[0], sp2[1]);
                        }
                    }
                });
            }
        }
    },
    //添加2015-04-22 end
    //发送消息
    ChatWinSubmit: function (failId, failContent) {
        var id;
        if (failId == "-1") {
            id = $("#youtx_ch_webim").find("div:visible").attr("id");
        } else {
            id = failId;
        }
        var value2;
        if (failContent == null) {
            value2 = $("#" + id + " textarea").val();
        } else {
            value2 = failContent;
        }
        var chat = $("#" + id + " .ChatWarning");
        var webim_error = "", html = "", br_ = "", myDate = new Date();
        if (value2 != "") {
            ttid = 1;
            if (WebIM.JieMian.GetStrLength(value2) > 400) {
                // value = WebIM.JieMian.autoAddEllipsis(value, 400);
                chat.html("发送内容过多，请重新输入");
                WebIM.JieMian.Warning(id, chat, 1);
            } else {
                var sp = new Array();
                sp = id.split("_");
                uidhouseid = loguserid + sp[3];
                if (value2.replace(/\s+/g, "") == "") {
                    br_ = "<br>";
                }
                if ($("#" + id + "").length > 0) {
                    if (userid_webim == uidhouseid && time_webim == myDate.getMinutes()) {
                        html = '<div class="Chat_main02"><p class="CRecordCon">' + WebIM.JieMian.GetContentUrl(value2) + '</p>' + br_ + '</div>';
                        //html = '<div class="Chat_main02"><p class="CB"></p><p>' + WebIM.JieMian.GetContentUrl(value2) + '</p><p class="ColorRed" style="text-align:right"></p>' + br_ + '</div>';
                    }
                    else {
                        //html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate(myDate) + '</span></p><br><p class="CB"></p><br><p>' + WebIM.JieMian.GetContentUrl(value2) + '</p><p class="ColorRed" style="text-align:right"></p>' + br_ + '</div>';
                        html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate(myDate) + '</span></p><p class="CRecordCon">' + WebIM.JieMian.GetContentUrl(value2) + '</p>' + br_ + '</div>';
                    }
                    $("#" + id + " .chat_history").append(html);
                    //wjl 添加2015-03-06 begin
                    var oCon03 = $("#" + id).find("#Con02");
                    var oCon02 = $("#" + id).find("#Con03");
                    var oSB03 = $("#" + id).find("#SB03");
                    var oSB02 = $("#" + id).find("#SB02");
                    //alert(oCon03[0].offsetHeight + "_" + oCon02[0].offsetHeight + "--55555");
                    if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                        oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                        oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                    }
                    //wjl 添加2015-03-06 end
                }
                else {
                    WebIM.JieMian.AddChatWin(sp[2], sp[3], "", 2, 2, "youtxkey");
                    if (userid_webim == uidhouseid && time_webim == myDate.getMinutes()) {
                        // html = '<div class="Chat_main02"><p class="CB"></p><p>' + WebIM.JieMian.GetContentUrl(value2) + '</p><p class="ColorRed" style="text-align:right"></p>' + br_ + '</div>';
                        html = '<div class="Chat_main02"></p><p class="CRecordCon">' + WebIM.JieMian.GetContentUrl(value2) + '</p>' + br_ + '</div>';
                    }
                    else {
                        //html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate(myDate) + '</span></p><br><p class="CB"></p><br><p>' + WebIM.JieMian.GetContentUrl(value2) + '</p><p class="ColorRed" style="text-align:right"></p>' + br_ + '</div>';
                        html = '<div class="Chat_main02"><p class="Chat_h2"><span class="ChatName">' + fsName + '</span><span class="ChatTime">' + WebIM.JieMian.Todate(myDate) + '</span></p><p class="CRecordCon">' + WebIM.JieMian.GetContentUrl(value2) + '</p>' + br_ + '</div>';
                    }
                    $("#" + id + " .chat_history").append(html);

                    //wjl 添加2015-03-06 begin
                    var oCon03 = $("#" + id).find("#Con02");
                    var oCon02 = $("#" + id).find("#Con03");
                    var oSB03 = $("#" + id).find("#SB03");
                    var oSB02 = $("#" + id).find("#SB02");

                    if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                        oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                        oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                    }
                    //wjl 添加2015-03-06 end

                }
                //换新接口后给WebIM.Query.Send（）方法的value后添加“messageType”
                WebIM.Query.Send(sp[2], sp[3], value2, function (msg) {
                    if (msg["result"] != undefined) {
                        if (msg["result"] != 0) {
                            //添加2015-04-02begin
                            var failClick = $("#" + id).find(".failClick");
                            if (failClick.length == 0) {
                                var html = '<span class="ColorPink" style="text-align:right;padding:5px 0px 5px 13px;">' + " 发送失败，可以" + '<a href="javascript:void(0)" class="failClick">重新发送</a>' + '</span>';
                                var Chat_main02 = $("#" + id + " .Chat_main02");
                                var Chat_P2 = Chat_main02[Chat_main02.length - 1].children[Chat_main02[Chat_main02.length - 1].children.length - 1];
                                var ColorPink = $(Chat_P2).find(".ColorPink");
                                if (ColorPink.length == 0) {
                                    Chat_P2.innerHTML = value2 + html;
                                }
                            }
                            else if (failClick.length == 1) {
                                $("#" + id).find(".failClick").unbind("click");
                                $("#" + id).find(".failClick").removeAttr("href");
                                $("#" + id).find(".failClick").removeClass("failClick").addClass("failNotClick");
                                var html = '<span class="ColorPink" style="text-align:right;padding:5px 0px 5px 13px;">' + " 发送失败，可以" + '<a href="javascript:void(0)" class="failClick">重新发送</a>' + '</span>';
                                var Chat_main02 = $("#" + id + " .Chat_main02");
                                var Chat_P2 = Chat_main02[Chat_main02.length - 1].children[Chat_main02[Chat_main02.length - 1].children.length - 1];
                                var ColorPink = $(Chat_P2).find(".ColorPink");
                                if (ColorPink.length == 0) {
                                    Chat_P2.innerHTML = value2 + html;
                                }
                            }
                            else if (failClick.length > 1) {
                                for (var i = 0; i < failClick.length - 2; i++) {
                                    failClick[i].unbind("click");
                                    failClick[i].removeAttr("href");
                                    failClick[i].removeClass("failClick").addClass("failNotClick");
                                }
                            }
                            //wjl 添加2015-03-06 begin
                            var oCon03 = $("#" + id).find("#Con02");
                            var oCon02 = $("#" + id).find("#Con03");
                            var oSB03 = $("#" + id).find("#SB03");
                            var oSB02 = $("#" + id).find("#SB02");

                            if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                                oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                                oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                            }
                            //添加2015-04-03begin
                            var failClick2 = $("#" + id).find(".failClick");
                            failClick2.click(function () {
                                WebIM.JieMian.ChatWinSubmit(id, value2);
                            });
                            //添加2015-04-03end
                            $(".HouseRe").html("");
                            $(".HouseRe").css("display", "none");
                        } else {
                            var thid = sp[2] + "_" + sp[3];
                            var thid2 = WebIM.JieMian.GetCookie("ck_" + loguserid);
                            if (thid2 == null) {
                                WebIM.JieMian.SetCookie("ck_" + loguserid, thid + ',');
                            } else {
                                if (thid2.indexOf(thid) > -1) {
                                } else {
                                    WebIM.JieMian.DelCookie("ck_" + loguserid);
                                    WebIM.JieMian.SetCookie("ck_" + loguserid, thid2 + thid + ',');
                                }
                            }
                            $(".HouseRe").html("");
                            $(".HouseRe").css("display", "none");
                        }
                    }
                });
                WebIM.JieMian.Getxuci(id, value2, "youtxwbim", function (date) {

                    if (date["result"] == 0) {
                        //html = '<p class="ColorGray999" style="text-align:right;background:url(http://js.youtx.com/images/icon_right.gif) no-repeat 0 -21px;padding:5px 0px 5px 13px;">' + '"' + date["content"] + '"' + " " + date["error"] + '</p>';
                        //添加2015-03-30begin
                        html = '<span class="ColorPink" style="text-align:right;padding:5px 0px 5px 13px;">' + " " + date["error"] + '</span>';
                        var Chat_main02 = $("#" + id + " .Chat_main02");

                        var Chat_P2 = Chat_main02[Chat_main02.length - 1].children[Chat_main02[Chat_main02.length - 1].children.length - 1];
                        Chat_P2.innerHTML = value2 + html;
                        //添加2015-03-30end
                        //wjl 添加2015-03-06 begin
                        var oCon03 = $("#" + id).find("#Con02");
                        var oCon02 = $("#" + id).find("#Con03");
                        var oSB03 = $("#" + id).find("#SB03");
                        var oSB02 = $("#" + id).find("#SB02");

                        if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                            oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                            oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
                        }
                    }
                });
                userid_webim = uidhouseid;
                time_webim = myDate.getMinutes();
                $("#" + id + " .chat_history").scrollTop(100000);
                $("#" + id + " textarea").val("");
                chat.html("");
            }

        } else {
            chat.html("发送内容不能为空，请重新输入");
            WebIM.JieMian.Warning(id, chat, 2);
        }
        //wjl 添加 2015-03-03 begin
        var oBox3 = $('.Talk')[0];
        oBox3.onmouseover = function () {
            WebIm(id);
        };
        //wjl 添加 2015-03-03 end
    },
    ComPlete: function () {

    },
    //wjl 添加 2015-03-06Begin
    GetStyle: function (obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    },
    //wjl 添加 2015-03-06End
    //wjl 2015-03-13 begin
    //用正则表达式匹配聊天内容中的url
    GetContentUrl: function (values) {
        var re = /((((^https?)|(^ftp)):\/\/)?([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/g;
        var sear = new RegExp('为您推荐我的另一套房源</br>');
        var arr;
        var newContent = "";
        var value3;
        var value2;
        if (sear.test(values)) {
            value3 = values.split('"');
            if (value3.length > 0) {
                arr = value3[1].match(re);
                value2 = value3[1];
            }
        } else {
            arr = values.match(re);
            value2 = values;
        }
        if (arr != null && arr != 'null') {
            var url;
            var temp;
            var tem;
            var urlId;
            var roomid;
            var detail;
            var yuMing = WebImHostUrl.split("//")[1];
            for (var i = 0; i < arr.length; i++) {
                var arry1 = arr[i].split("/");
                var arry2 = arry1[arry1.length - 1].split(".");
                if (arry2.length != 2) {
                    temp = arr[i] + '/assd';
                } else {
                    temp = arr[i];
                }
                url = temp.replace(/.+[\.\/]([A-z]+\.[A-z]+)\/[^\/].+/, "$1");
                if (newContent == "") {
                    if (url == 'youtx.com') {
                        tem = arr[i].substring(0, 4);
                        if (tem == 'http') {
                            urlId = arr[i].split("/");
                            if (urlId.length > 0) {
                                roomid = 0;
                                if (urlId[urlId.length - 1] == "") {
                                    if (urlId[urlId.length - 3] == "room" && urlId[urlId.length - 4] == yuMing) {
                                        roomid = urlId[urlId.length - 2];
                                    }
                                } else {
                                    if (urlId[urlId.length - 2] == "room" && urlId[urlId.length - 3] == yuMing) {
                                        roomid = urlId[urlId.length - 1];
                                    }
                                }
                                detail = WebIM.JieMian.GetWebImHouseDetail(roomid, arr[i]);
                                if (detail != "") {
                                    newContent = value2.replace(arr[i], detail);
                                } else {
                                    newContent = value2.replace(arr[i], "<a href='" + arr[i] + "' target='_Blank'>" + arr[i] + "</a>");
                                }
                            }
                        } else {
                            urlId = arr[i].split("/");
                            if (urlId.length > 0) {
                                roomid = 0;
                                if (urlId[urlId.length - 1] == "") {
                                    if (urlId[urlId.length - 3] == "room" && urlId[urlId.length - 4] == yuMing) {
                                        roomid = urlId[urlId.length - 2];
                                    }
                                } else {
                                    if (urlId[urlId.length - 2] == "room" && urlId[urlId.length - 3] == yuMing) {
                                        roomid = urlId[urlId.length - 1];
                                    }
                                }
                                detail = WebIM.JieMian.GetWebImHouseDetail(roomid, "http://" + arr[i]);
                                if (detail != "") {
                                    newContent = value2.replace(arr[i], detail);
                                } else {
                                    newContent = value2.replace(arr[i], "<a href='http://" + arr[i] + "' target='_Blank'>" + arr[i] + "</a>");
                                }
                            }
                        }
                    } else {
                        newContent = value2.replace(arr[i], "<a href='javascript:void(0);' class='outLink'>" + arr[i] + "</a>");
                    }
                }
                else {
                    if (url == 'youtx.com') {
                        tem = arr[i].substring(0, 4);
                        if (tem == 'http') {
                            urlId = arr[i].split("/");
                            if (urlId.length > 0) {
                                roomid = 0;
                                if (urlId[urlId.length - 1] == "") {
                                    if (urlId[urlId.length - 3] == "room" && urlId[urlId.length - 4] == yuMing) {
                                        roomid = urlId[urlId.length - 2];
                                    }
                                } else {
                                    if (urlId[urlId.length - 2] == "room" && urlId[urlId.length - 3] == yuMing) {
                                        roomid = urlId[urlId.length - 1];
                                    }
                                }
                                detail = WebIM.JieMian.GetWebImHouseDetail(roomid, arr[i]);
                                if (detail != "") {
                                    newContent = newContent.replace(arr[i], detail);
                                } else {
                                    newContent = newContent.replace(arr[i], "<a href='" + arr[i] + "' target='_Blank'>" + arr[i] + "</a>");
                                }
                            }
                        } else {
                            urlId = arr[i].split("/");
                            if (urlId.length > 0) {
                                roomid = 0;
                                if (urlId[urlId.length - 1] == "") {
                                    if (urlId[urlId.length - 3] == "room" && urlId[urlId.length - 4] == yuMing) {
                                        roomid = urlId[urlId.length - 2];
                                    }
                                } else {
                                    if (urlId[urlId.length - 2] == "room" && urlId[urlId.length - 3] == yuMing) {
                                        roomid = urlId[urlId.length - 1];
                                    }
                                }
                                detail = WebIM.JieMian.GetWebImHouseDetail(roomid, "http://" + arr[i]);
                                if (detail != "") {
                                    newContent = newContent.replace(arr[i], detail);
                                } else {
                                    newContent = newContent.replace(arr[i], "<a href='http://" + arr[i] + "' target='_Blank'>" + arr[i] + "</a>");
                                }
                            }
                        }
                    } else {
                        newContent = newContent.replace(arr[i], "<a href='javascript:void(0);' class='outLink'>" + arr[i] + "</a>");
                    }
                }
            }
        } else {
            newContent = value2;
        }
        return newContent;
    },
    //2015-06-05
    GetWebImHouseDetail: function (id, url) {
        var content = "";
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/GetFangDongHouse.ashx?type=2&houseId=" + id + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            async: false,
            crossDomain: false,
            success: function (data) {
                if (data.result == "2") {
                    content += '<div class="HouseReDetails">'
                        + '<a href="' + url + '" target="_Blank">' + url + '</a>'
                        + '<a href="' + url + '" target="_Blank" style="text-decoration:none;"><div class="ConMsg">'
                        + '<h2 class="ConMsgTit">' + data.HouseTitle + '</h2>'
                        + '<dl class="clearfix ConMsgDl PosRe">'
                        + '<dt><img src="' + data.HousePic + '" width="120" height="82"></dt>'
                        + '<dd><p class="TextEllipse">' + data.roomTypes + '<span class="PL10">' + data.bedRoomNum + '居</span><span class="PL10">宜居' + data.LivepeoNum + '人</span></p>'
                        + '<p class="ConMsgPAddr">' + data.Adress + '</p>'
                        + '<span class="PosAb ConMsgPrice">' + data.DayPrice + '/晚</span></dd></dl>'
                        + '<p class="HouseData"><span>近期预订（' + data.bookingDays + '）</span><span class="EvalSum">评价（' + data.ExperienceCount + '）</span></p>'
                        + '</div></a></div>';
                } else {
                    content = "";
                }
            }
        });
        return content;
    },
    ////wjl 2015-03-13 end
    Todate: function (date) {

        var now = "", time = "";
        var d = new Date();
        now = date.getFullYear() + "-";
        now = now + WebIM.JieMian.add_zero((date.getMonth() + 1)) + "-";
        now = now + WebIM.JieMian.add_zero(date.getDate()) + " ";

        time = d.getFullYear() + "-";
        time = time + WebIM.JieMian.add_zero(d.getMonth() + 1) + "-";
        time = time + WebIM.JieMian.add_zero(d.getDate()) + " ";
        if (now != time) {
            now = now + WebIM.JieMian.add_zero(date.getHours()) + ":";
            now = now + WebIM.JieMian.add_zero(date.getMinutes()) + ":";
            now = now + WebIM.JieMian.add_zero(date.getSeconds());
        }
        else {
            now = WebIM.JieMian.add_zero(date.getHours()) + ":";
            now = now + WebIM.JieMian.add_zero(date.getMinutes()) + ":";
            now = now + WebIM.JieMian.add_zero(date.getSeconds());
        }
        return now;
    },
    add_zero: function (temp) {
        if (temp < 10) return "0" + temp;
        else return temp;
    },
    //更新用户状态
    GetUserState: function () {
        if (getUid != "") {
            var tmp_uid = getUid;
            getUid = "";
            WebIM.Query.GetState(tmp_uid, function (msg) {
                if (msg.result == 0) {
                    var sp = new Array();
                    sp = tmp_uid.split(",");
                    if (msg.data.length > 0) {
                        var zxtype = "", uid = "";
                        for (var i = 0; i < sp.length; i++) {
                            var _taby = $(".TabHeader li[id^='tab_y_" + sp[i] + "_']").length;
                            zxtype = $(".TabHeader li[id^='tab_y_" + sp[i] + "_'] span").eq(0);
                            var nowObj = new Array();
                            nowObj = $(".TabHeader li[id^='tab_y_" + sp[i] + "_']");
                            if (nowObj != undefined) {
                                uid = sp[i];
                                if (eval(msg.data[0]["" + uid + ""]) == 1) {
                                    if (nowObj.length > 1) {
                                        for (j = 0; j < nowObj.length; j++) {
                                            var tem = $(nowObj[j]).attr("id");
                                            $("#" + tem + " span").eq(0).css("opacity", "0.5");
                                            //$("#" + $("ul li[id^='tab_y_" + sp[i] + "_']").eq(j).attr("id") + " span").eq(0).addClass("TalkOnline02").removeClass("TalkOnline03");
                                        }

                                    } else {
                                        for (j = 0; j < nowObj.length; j++) {
                                            var tem = $(nowObj[j]).attr("id");
                                            $("#" + tem + " span").eq(0).css("opacity", "0.5");
                                            //zxtype.addClass("TalkOnline02").removeClass("TalkOnline03")
                                        }
                                    }
                                } else {
                                    for (j = 0; j < nowObj.length; j++) {
                                        var tem = $(nowObj[j]).attr("id");
                                        $("#" + tem + " span").eq(0).css("opacity", "0.5"); /*wjl2015-03-10目前接口有问题：等换接口不在线时此处的opacity=0.5*/
                                        //zxtype.addClass("TalkOnline03").removeClass("TalkOnline02")
                                    }
                                }
                            }
                        }
                    }
                }

            });

        }
    },
    ShowHide: function () {
        WebIM.JieMian.SetCookie("" + webim_obj + "_TalkBox_Type", "1");
        $(".TalkBox").hide();
    },
    //获得Cookie解码后的值
    GetCookieVal: function (offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1)
            endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    },
    //设定Cookie值
    SetCookie: function (name, value) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";Expires=" + exp.toGMTString() + ";path=/;";

    }, //删除Cookie
    DelCookie: function (name) {
        var exp1 = new Date();
        exp1.setTime(exp1.getTime() - 1);
        var cval = WebIM.JieMian.GetCookie(name);
        document.cookie = name + "=" + cval + "; Expires=" + exp1.toGMTString() + ";path=/;";
    }, //获得Cookie的原始值
    GetCookie: function (name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
                return WebIM.JieMian.GetCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    },
    Getleft: function () {
        var TalkBox_Obj = $("#TalkBox_Youtx_ID");
        if (TalkBox_Obj.is(":visible") == true) {
            var bottomleft = WebIM.JieMian.GetCookie("youtx_bottomleft");
            if (bottomleft != "" && bottomleft != null) {
                var botleft = new Array();
                botleft = bottomleft.split(",");

                var isIE = !!window.ActiveXObject;
                var isIE6 = isIE && !window.XMLHttpRequest;
                if (!isIE6) {
                    TalkBox_Obj.css("bottom", "" + botleft[0] + "px");
                    TalkBox_Obj.css("left", "" + botleft[1] + "px");
                }
            }
        }

    },
    getTalkBoxShow: function () {
        var type = WebIM.JieMian.GetCookie("" + webim_obj + "_TalkBox_Type");
        if (type == 0 || type == "" || type == null) {
            TalkBoxShow();
        } else {
            WebIM.JieMian.ShowHide();
        }
    },
    AlertTitle: function (title, roll) {
        _title = title || "";
        index = 0;
        if (attimer) clearTimeout(attimer);
        document.title = _title;
        if (roll) {
            attimer = setTimeout(WebIM.JieMian.RollTitle, aspan);
        }
    },
    RollTitle: function () {
        //        if (index < tit.length) {
        //            index++;
        //        } else {
        //            index = 0;
        //        }
        //        var t = _title.substring(index);
        //        t += _title.substring(0, index)

        // document.title = t;

        if (show) {
            document.title = "【新消息】";
        } else {
            document.title = "【　　　】";
        }
        show = !show;
        attimer = setTimeout(WebIM.JieMian.RollTitle, aspan);
    },
    ChatWinFocus: function () {
        WebIM.JieMian.AlertTitle(oldtitie);
    },
    youtx_webim_cut: function () {
        var webiimcut = WebIM.JieMian.GetCookie("youtx_webim_cut");
        if (webiimcut != null && webiimcut != "null") {

            var sp = new Array();
            sp = webiimcut.split(",");

            var id = $(".TabHeader .Listcur").attr("id");
            if (sp[0] != id) {
                var sp1 = new Array();
                sp1 = sp[0].split("_");
                //  if (sp[1] == 1) {
                if ($(".Yichu li").is("#" + sp[0] + "")) {
                    var tab = $(".TabHeader");
                    //WebIM.JieMian.yichuClick(tab, sp[0]);
                    WebIM.JieMian.tabclick(sp[0]);
                    SynBrowser(sp1[2], sp1[3]);

                }
                else if ($(".TabHeader li").is("#" + sp[0] + "")) {
                    SynBrowser(sp1[2], sp1[3]);
                    WebIM.JieMian.tabclick(sp[0]);

                }

            } else {
                if (!IsTalkBoxHide()) {
                    var sp1 = new Array();
                    sp1 = sp[0].split("_");
                    SynBrowser(sp1[2], sp1[3]);
                }
            }

        }
    },
    GetStrLength: function (str) {
        var reg = /[\u4E00-\u9FA5]/g;
        var matchs = str.match(reg);
        if (matchs != null) {
            return (matchs + "").split(',').length + str.length;
        }
        return str.length;
    },
    autoAddEllipsis: function (pStr, pLen) {

        var _ret = WebIM.JieMian.cutString(pStr, pLen);
        var _cutFlag = _ret.cutflag;
        var _cutStringn = _ret.cutstring;
        if ("1" == _cutFlag) {
            return _cutStringn;
        } else {
            return _cutStringn;
        }
    },
    cutString: function (pStr, pLen) {
        // 原字符串长度  
        var _strLen = pStr.length;
        var _tmpCode;
        var _cutString;
        // 默认情况下，返回的字符串是原字符串的一部分  
        var _cutFlag = "1";
        var _lenCount = 0;
        var _ret = false;
        if (_strLen <= pLen / 2) {
            _cutString = pStr;
            _ret = true;
        }
        if (!_ret) {
            for (var i = 0; i < _strLen; i++) {
                if (WebIM.JieMian.isFull(pStr.charAt(i))) {
                    _lenCount += 2;
                } else {
                    _lenCount += 1;
                }
                if (_lenCount > pLen) {
                    _cutString = pStr.substring(0, i);
                    _ret = true;
                    break;
                } else if (_lenCount == pLen) {
                    _cutString = pStr.substring(0, i + 1);
                    _ret = true;
                    break;
                }
            }
        }
        if (!_ret) {
            _cutString = pStr;
            _ret = true;
        }

        if (_cutString.length == _strLen) {
            _cutFlag = "0";
        }
        return { "cutstring": _cutString, "cutflag": _cutFlag };
    },
    isFull: function (pChar) {
        if ((pChar.charCodeAt(0) > 128)) {
            return true;
        } else {
            return false;
        }
    }, Warning: function (id, Warning, typeid) {
        clearInterval(timeID);
        leftsecond_webim = 2;
        timeID = setInterval(function () {
            if (leftsecond_webim > 0) {
                if (typeid == 1) {
                    Warning.html("发送内容过多，请重新输入");
                } else if (typeid == 2) {
                    Warning.html("发送内容不能为空，请重新输入");
                }
                leftsecond_webim--;
            }
            else {
                clearInterval(timeID);
                Warning.html("");
            }
        }, 500);

    },
    MouseOverCloseM: function (obj) {
        $(obj).attr("class", "TalkCloseM");
    },
    MouseOutClose: function (obj) {
        $(obj).attr("class", "TalkClose");
    },
    createGestFlashConnet: function (container, flashurl, flashvars, w, h) {
        var flashnode = [];
        var ua = window.navigator.userAgent.toLowerCase();
        if (/msie/.test(ua) && !/opera/.test(ua)) {
            flashnode.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" align="middle" ');
            flashnode.push(' id="soundplayer" name="soundplayer" width="' + w + '" height="' + h + '"> ');
            flashnode.push('	<param name="allowFullScreen" value="true" /> ');
            flashnode.push('	<param name="allowScriptAccess" value="always" /> ');
            flashnode.push('	<param name="movie" value="' + flashurl + '" /> ');
            flashnode.push('	<param name="loop" value="false" /> ');
            flashnode.push('	<param name="menu" value="false" /> ');
            flashnode.push('	<param name="quality" value="high" /> ');
            flashnode.push('	<param name="loop" value="false" /> ');
            flashnode.push('	<param name="wmode" value="window" /> '); //transparent
            flashnode.push('	<param name="flashvars" value="' + flashvars.join('&') + '" /> ');
            flashnode.push('</object>');
        } else {
            flashnode.push('<embed id="soundplayer" name="soundplayer" allowScriptAccess="always" wmode="window" src="' + flashurl + '" loop="false" menu="false" quality="high" align="middle" allowFullScreen="true" width="' + w + '" height="' + h + '" flashvars="' + flashvars.join('&') + '"type="application/x-shockwave-flash"  pluginspage="http://www.macromedia.com/go/getflashplayer">');
            flashnode.push('</embed>');
        }

        $("#soundContainer").html(flashnode.join(''));
    },
    playSound: function () {
        try {
            if (document.getElementById("soundplayer") != null && document.getElementById("soundplayer") != "function") {
                document.getElementById("soundplayer").playSound();
            }
        } catch (e) {

        }

    },
    GetHouse: function (touid, houseid, key, complete) {
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/WebIMHouseNews.ashx?touid=" + touid + "&houseid=" + houseid + "&key=" + key + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            crossDomain: true,
            success: function (data) {
                if (data["result"] == "0") {
                    complete(data);
                    return data;
                }
                else {
                    alert(data["report"]);
                }
            }
        });
    },
    GetHouseTiele: function (houseid, key, complete) {
        $.ajax({
            url: WebImHostUrl + "/profile/Ajax/WebimHouseTitle.ashx?houseid=" + houseid + "&key=" + key + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            crossDomain: true,
            success: function (data) {
                if (data.result == 0) {
                    complete(data);
                    return data;
                }
                else {
                    alert("出错啦！");
                }
            }
        });
    },
    Getxuci: function (id, content, key, complete) {
        var sp = new Array();
        //alert(id);
        sp = id.split("_");
        //alert(sp[2]);
        $.ajax({
            //url: WebImHostUrl + "/profile/Ajax/xuci.ashx?content=" + encodeURIComponent(content) + "&key=" + key + "&t=" + Math.random() + "&callback=?",
            url: WebImHostUrl + "/profile/Ajax/xuci.ashx?content=" + encodeURIComponent(content) + "&touid=" + sp[2] + "&key=" + key + "&t=" + Math.random() + "&callback=?",
            dataType: "jsonp",
            type: "GET",
            crossDomain: true,
            success: function (data) {
                if (data.result == 0) {
                    complete(data);
                    return data;
                }

            }
        });
    },
    GetContent: function (content) {
        // alert(content);
        var ct = "";
        if (content.indexOf("^^^") > -1) {
            var arr = new Array();
            var ar = new Array();
            arr = content.split("^^^");
            //3文本，4音频，5视频，6图片，7推荐房源
            if (parseInt(arr[0]) == 3) {
                ct = arr[1];
                messageType = "chat";
            } else if (parseInt(arr[0]) == 4) {
                ar = arr[1].split(";");
                ct = "对方给您发送了一段语音消息，请<a href=\"" + WebImHostUrl + "/profile/Ajax/WebIMVideoVoice.aspx?vurl=" + ar[0] + "&vtype=" + arr[0] + "\" >点击下载</a></br>(下载游天下手机客户端，查看语音、视频更方便，<a href=\"" + WebImHostUrl + "/mo/\"  target=\"_blank\">立即下载</a>)";
                messageType = "voice";
            } else if (parseInt(arr[0]) == 5) {
                ar = arr[1].split(";");
                ct = "对方给您发送了一段视频，请<a href=\"" + WebImHostUrl + "/profile/Ajax/WebIMVideoVoice.aspx?vurl=" + ar[0] + "&vtype=" + arr[0] + "\" >点击下载</a></br>(下载游天下手机客户端，查看语音、视频更方便，<a href=\"" + WebImHostUrl + "/mo/\"  target=\"_blank\">立即下载</a>)";
                messageType = "video";
            } else if (parseInt(arr[0]) == 6) {
                ar = arr[1].split(";");
                ct = "<a href=\"javaScript:\" onclick ='clickImg(\"" + ar[0] + "\")'><img src=\"" + ar[0] + "&px=50x50\" /></a>";
                messageType = "img";
            } else if (parseInt(arr[0]) == 7) {
                ct = "为您推荐我的另一套房源</br> [<a href=\"" + WebImHostUrl + "/room/" + arr[1] + "/\"  target=\"_blank\">" + arr[2] + "</a>]";
                messageType = "houseinfo";
            }
            //wjl 添加 2015-02-28 begin
            //            else {
            //                messageType = "notice";//系统通知
            //            }
            //wjl 添加 2015-02-28 end

        } else {
            ct = content;
            messageType = "chat";
        }
        return ct;
    }

}
window.WebIM.JieMian = WebIM.JieMian;


// JavaScript Document
//2012-04-28-zyf
var MesTotCount = 0; //消息列表消息数量
var WebIM_MesList_First = true;
var WebIM_MesList_HosueIDs = "";
var WebIM_MesList_ToIDs = "";
//创建消息提示框
var DivChatSmall = document.createElement("div");
DivChatSmall.className = "ChatSmall";
var div = document.createElement("div");
//div.style.position = "absolute";
//div.style.width = "430px";
//div.style.left = "700px";

var ul = document.createElement("ul");
ul.id = "ChatSmallUl";
div.appendChild(ul);
var li = document.createElement("li");
li.id = "ChatMes";
li.className = "ChatMes";
//li.style.cssFloat = "right";
li.onclick = ChatMesList;
li.innerHTML = "短消息（" + MesTotCount + "）";  //x值为相应消息总条数

ul.appendChild(li);
//以上为提示框，以下为消息列表	
var DivChatMes_C_T = document.createElement("div");
DivChatMes_C_T.className = "ChatMes_C_T";

var MesListh2 = document.createElement("h2");
MesListh2.onclick = ChatMesListMin;
var SpanMes_h2 = document.createElement("span");
SpanMes_h2.className = "Mes_h2";
SpanMes_h2.innerHTML = "短消息";
MesListh2.appendChild(SpanMes_h2);
var SpanMes_min = document.createElement("span");
SpanMes_min.className = "Mes_min";
SpanMes_min.title = "最小化";
SpanMes_min.onclick = ChatMesListMin;
MesListh2.appendChild(SpanMes_min);
DivChatMes_C_T.appendChild(MesListh2);
var pAll = document.createElement("p");
pAll.className = "All_mes";

var aAll = document.createElement("a");
aAll.target = "blank"
aAll.href = WebImHostUrl + "/profile/User/MailBox/MyMailBox.aspx?type=All";
aAll.innerHTML = "查看全部历史消息&gt;&gt;";
pAll.appendChild(aAll);
DivChatMes_C_T.appendChild(pAll);
//Begin从接口获取数据
var UlMes_main = document.createElement("ul");
UlMes_main.className = "Mes_main";
UlMes_main.id = "IDUlMes_main";
DivChatMes_C_T.appendChild(UlMes_main);

$(function () {
    $("body").append(webim_html);

    $(".DownArrow").click(function () {
        $(".Yichu").show();
    });
    $(".Yichu").mouseleave(function () {
        $(".Yichu").hide();
    });
    $(".Chat_min").click(function () {
        WebIM.JieMian.ShowHide();
    });



    div.appendChild(DivChatMes_C_T);
    DivChatSmall.appendChild(div);
    document.body.appendChild(DivChatSmall);

    $("#TalkBox_Youtx_ID").easydrag();

    $("#TalkBox_Youtx_ID").setHandler("TalkBox_Youtx_ID_s");
    //$("#TalkBox_Youtx_ID").setHandler("UserBox");
    $("#TalkBox_Youtx_ID").setHandler("UserM");
    var off = $("span[id^='Offline_UID_']");
    if (off.length > 0) {
        var UID = "";
        for (var i = 0; i < off.length; i++) {
            UID += off.eq(i).attr("id").replace("Offline_UID_", "") + ",";
        }
        if (UID != "") {
            WebIM.Query.GetState(UID, function (msg) {
                if (msg.result == 0) {
                    var sp = new Array();
                    sp = UID.split(",");
                    if (msg.data.length > 0) {
                        for (var j = 0; j < sp.length - 1; j++) {

                            if (msg.data[0]["" + sp[j] + ""] == 1) {
                                off.eq(j).attr("class", "Status_online");
                            } else {
                                off.eq(j).attr("class", "Status_Offline");
                            }
                        }
                    }
                }
            });
        }
    }


    if (loguserid != "") {

        WebIM.Query.OpenList(loguserid, function (r) {
            if (r.result == 0) {
                webim_x = r.data.length;
                for (var j = 0; j < webim_x; j++) {
                    webim_y++;
                    WebIM.JieMian.AddChatWin(r["data"][j]["uid"], r["data"][j]["roomid"], r["data"][j]["uname"], 1, 2, "youtxwebim", 1);
                }

                if (webim_y > 0) {

                    WebIM.JieMian.getTalkBoxShow();
                } else {
                    WebIM.JieMian.ShowHide();
                }
            }
        });
    } else {
        WebIM.JieMian.ShowHide();
    }

    var container_webim = "soundContainer";
    var flashurl_webim = "http://js.youtx.com/profile/message.swf";
    var flashvars_webim = [];
    var w_webim = "0";
    var h_webim = "0";
    WebIM.JieMian.createGestFlashConnet(container_webim, flashurl_webim, flashvars_webim, w_webim, h_webim);
    window.onblur = function () { WebIM.JieMian.SetCookie("youtx_webimfocus", "false"); }
    setInterval(WebIM.JieMian.Getleft, 1000);
    setInterval(WebIM.JieMian.youtx_webim_cut, 1000);
    setInterval(WebIM.JieMian.getTalkBoxShow, 1000);
    //计时器
    setInterval('WebIM.JieMian.CheckMessage()', 180000);

    var oBtn = document.getElementById("Btn");
    var OutBox = document.getElementById("OutBox");
    var oCloseBtn = document.getElementById("CloseBtn");
    var cl = null;
    window.onresize = window.onscroll = function () {
        Ytx.ui.Style();
    }
    oCloseBtn.onclick = function () {
        Ytx.ui.fadeOut(OutBox);
        setTimeout(function () { OutBox.style.display = "none" }, 300);
        return false;
    }

    var oDiv = document.getElementById('OutBox');
    var disX = 0;
    var disY = 0;
    oDiv.onmousedown = function (ev) {
        var oEvent = ev || event;
        disX = oEvent.clientX - oDiv.offsetLeft;
        disY = oEvent.clientY - oDiv.offsetTop;
        document.onmousemove = function (ev) {
            var oEvent = ev || event;
            var l = oEvent.clientX - disX;
            var t = oEvent.clientY - disY;
            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };
    WebIM.JieMian.ShowHide();
})


function ChatMesList() {
    clearTimeout(MesChatFlash);
    if ($("#ChatMes").attr("class") != "ChatMes_C") {
        $(".ChatMes_C_T").animate({ "bottom": 23 }, 1000);
        $("#ChatMes").attr("class", "ChatMes_C");
    }
    else {
        $(".ChatMes_C_T").animate({ "bottom": -450 }, 1000);
        $("#ChatMes").attr("class", "ChatMes");
    }
    if (WebIM_MesList_First) {
        WebIM_MesList_First = false;
        var PHouseTitel = $("#IDUlMes_main li p[id^='pHouseTitel_']");
        for (var j = 0; j < PHouseTitel.length; j++) {
            WebIM_MesList_HosueIDs += PHouseTitel.eq(j).attr("id").split('_')[2] + ",";
            WebIM_MesList_ToIDs += PHouseTitel.eq(j).attr("id").split('_')[1] + ",";
        }

        if (WebIM_MesList_HosueIDs != "" && WebIM_MesList_HosueIDs != undefined) {
            WebIM.JieMian.GetHouseTiele(WebIM_MesList_HosueIDs, "webimkey", function (r) {
                if (r.result == 0) {

                    var MesToIDs = WebIM_MesList_ToIDs.split(',');
                    var MesHouseIDs = WebIM_MesList_HosueIDs.split(',');
                    for (var i = 0; i < MesHouseIDs.length - 1; i++) {
                        $("#pHouseTitel_" + MesToIDs[i] + "_" + MesHouseIDs[i]).html(LastMesLength(r["" + MesHouseIDs[i] + ""]));
                    }
                }
            });
        }
    }
}
function ChatMesListMin() {
    clearTimeout(MesChatFlash);
    $(".ChatMes_C_T").animate({ "bottom": -450 }, 1000);
    $("#ChatMes").attr("class", "ChatMes");
}
function ShowAllMessage() {
    var MesListArry = $("#IDUlMes_main li");
    var ToId;
    for (var i = 0; i < MesListArry.length; i++) {
        ToId = MesListArry.eq(i).attr("id").replace('MesList', '');
        var Split_SpanName = $("#SpanName" + ToId).val().split(',');
        for (var j = 0; j < Split_SpanName.length - 1; j++) {
            WebIM.JieMian.AddChatWin(ToId, Split_SpanName[j], "", 2, 2, "webim");
        }
        $("#MesList" + ToId).remove();
        RemoveWarnByID(ToId);
    }
    MesTotCount = 0;
    $("#ChatMes").html("短消息（" + MesTotCount + "）");
    ChatMesListMin();
}
function AddMesList(InterfaceType, ToId, ToName, HouseId, status, ToLastMes, Type, Key, clicks) {
    if ($("#MesList_" + ToId + "_" + HouseId).length > 0) {   //队列已经存在此人消息

        if (InterfaceType == 1) {
            MesListChangeCss();
            MesTotCount++; //********统计总信息数量
            if ($("#MesList_" + ToId + "_" + HouseId).attr("class") == "Message") {
                //计算信息数量
                var temp = $("#SCount_" + ToId + "_" + HouseId).html().replace('(', '').replace(')', '');
                temp++;
                $("#SCount_" + ToId + "_" + HouseId).html("(" + temp + ")");
            }
            else if ($("#MesList_" + ToId + "_" + HouseId).attr("class") == "LiMes_Contact") {
                //新增消息
                var tempLi = $("#MesList_" + ToId + "_" + HouseId);
                var tempLiCount = $("#MesList_" + ToId + "_" + HouseId + " #SCount_" + ToId + "_" + HouseId);
                tempLi.attr("class", "Message");
                tempLiCount.html("(1)");
                if ($(".Message").length > 1) {
                    $(".Message").eq(0).before(tempLi);
                }
                else {
                    $(".LiMes_Contact").eq(0).before(tempLi);
                }
            }
        }
    }
    else {

        var liItem = document.createElement("li");
        liItem.id = "MesList_" + ToId + "_" + HouseId;
        if (InterfaceType == 1) {
            liItem.className = "Message";
            MesTotCount++; //********统计总信息数量
        }
        else if (InterfaceType == 3) {
            liItem.className = "LiMes_Contact";
        }
        var SpanMes_name = document.createElement("span");
        SpanMes_name.id = "SpanName_" + ToId + "_" + HouseId;
        switch (parseInt(status)) {
            case 0:
                SpanMes_name.className = "Mes_name_Offline";
                break;
            case 1:
                SpanMes_name.className = "Mes_name_Online";
                break;
            default:
                SpanMes_name.className = "Mes_name_Offline";
                break;
        }
        SpanMes_name.innerHTML = ToName;               //获取消息人的name
        SpanMes_name.value = HouseId;
        liItem.appendChild(SpanMes_name);

        var SpanCount = document.createElement("span");
        SpanCount.id = "SCount_" + ToId + "_" + HouseId;
        SpanCount.className = "Mes_count";      //数量统计ID
        SpanCount.innerHTML = "(" + 1 + ")";
        if (InterfaceType == 3) {
            SpanCount.innerHTML = "";
        }

        liItem.appendChild(SpanCount);

        var SpanMes_close = document.createElement("span");
        SpanMes_close.id = "SpanMes_close_" + ToId + "_" + HouseId;
        SpanMes_close.className = "Mes_close";

        liItem.appendChild(SpanMes_close);

        var pHouseTitel = document.createElement("p");
        pHouseTitel.id = "pHouseTitel_" + ToId + "_" + HouseId;
        pHouseTitel.className = "mes_p"
        pHouseTitel.innerHTML = "";
        liItem.appendChild(pHouseTitel);

        if (InterfaceType == 1) {
            if ($(".Message").length > 0) {
                $(".Message").eq(0).before(liItem);
            }
            else {
                if ($(".LiMes_Contact").length > 0) {
                    $(".LiMes_Contact").eq(0).before(liItem);
                }
                else {
                    document.getElementById("IDUlMes_main").appendChild(liItem);
                }
            }
            MesListChangeCss();
        }
        else if (InterfaceType == 3) {
            if ($(".LiMes_Contact").length > 0) {
                $(".LiMes_Contact").eq(0).before(liItem);
            }
            else {
                if ($(".Message").length > 0) {
                    $(".Message").eq($(".Message").length - 1).after(liItem);
                }
                else {
                    document.getElementById("IDUlMes_main").appendChild(liItem);
                }
            }
        }
        //相应事件控制
        $("#SpanMes_close_" + ToId + "_" + HouseId).click(function () {
            WebIM.Query.Close(ToId, HouseId, function (r) {
                if (r == 0) {
                    MesListLiClose(ToId, HouseId);
                }
            })
        });
        MesListLiOpenClick(ToId, HouseId, ToName);
        $(".Mes_main li").mouseover(function () {
            $(this).css("background", "#DFF5FA");
        })
        $(".Mes_main li").mouseout(function () {
            $(this).css("background", "");
        })
    }
    $("#ChatMes").html("短消息（" + MesTotCount + "）");
    if (clicks != 0) {    //clicks  为0时，点击获取titel，不为0为点击短消息批量获取titel
        if ($("#pHouseTitel_" + ToId + "_" + HouseId).html() == "") {
            WebIM.JieMian.GetHouseTiele(HouseId, Key, function (r) {
                if (r.result == 0) {
                    $("#pHouseTitel_" + ToId + "_" + HouseId).html(LastMesLength(r["" + HouseId + ""]));
                }
            });
        }
    }


}
function MesListLiClose(ToId, HouseId) {
    if ($("#SpanMes_close_" + ToId + "_" + HouseId).length > 0) {
        if ($("#MesList_" + ToId + "_" + HouseId).attr("class") == "Message") {
            //计算总信息数
            var temp = $("#SCount_" + ToId + "_" + HouseId).html().replace('(', '').replace(')', '');
            MesTotCount = MesTotCount - temp;
            $("#ChatMes").html("短消息（" + MesTotCount + "）");
            $("#MesList_" + ToId + "_" + HouseId).remove();
        }
        else if ($("#MesList_" + ToId + "_" + HouseId).attr("class") == "LiMes_Contact") {
            $("#MesList_" + ToId + "_" + HouseId).remove();
        }
        if ($("#IDUlMes_main li").html() == null) { ChatMesListMin(); }
    }
}
function MesListLiOpenClick(ToId, HouseId, ToName) {
    $(("#SpanName_" + ToId + "_" + HouseId + ",#pHouseTitel_" + ToId + "_" + HouseId + ",#SCount_" + ToId + "_" + HouseId)).click(function () {
        if ($(this.parentElement).attr("class") == "Message") {
            //var ToIdHouseId = (this.parentElement.id).replace('MesList', '');
            CountTotal("_" + ToId + "_" + HouseId);
            WebIM.JieMian.AddChatWin(ToId, HouseId, "", 1, 1, "Key");      //点击打开相应聊天
            //$(this.parentElement).attr("class", "LiMes_Contact");
        }
        else if ($(this.parentElement).attr("class") == "LiMes_Contact") {
            WebIM.JieMian.AddChatWin(ToId, HouseId, "", 1, 1, "Key");         //点击打开相应聊天框
        }
        CreateMessageBox();
        ReName(ToName);
        //wjl 添加2015-03-06 begin
        var oCon03 = $("#win_y_" + ToId + "_" + HouseId).find("#Con02");
        var oCon02 = $("#win_y_" + ToId + "_" + HouseId).find("#Con03");
        var oSB03 = $("#win_y_" + ToId + "_" + HouseId).find("#SB03");
        var oSB02 = $("#win_y_" + ToId + "_" + HouseId).find("#SB02");

        if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
            oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
            oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
        }
        //wjl 添加2015-03-06 end
        //wjl 添加 2015-003-05 begin
        var oBox3 = $('.Talk')[0];
        oBox3.onmouseover = function () {
            WebIm("win_y_" + ToId + "_" + HouseId);
        }
        //wjl 添加 2015-03-05 end
    })
}
function LastMesLength(HouseTitel) {
    if (HouseTitel.length > 15) {
        HouseTitel = HouseTitel.substring(0, 15) + "...";
        return HouseTitel;
    }
    else { return HouseTitel; }
}
function CountTotal(ToIdHouseId) {
    var temp = 0;
    if ($("#SCount" + ToIdHouseId).length > 0) {
        if ($("#SCount" + ToIdHouseId).html() != "") {
            temp = $("#SCount" + ToIdHouseId).html().replace('(', '').replace(')', '');
        }
    }
    MesTotCount = MesTotCount - temp;
    $("#ChatMes").html("短消息（" + MesTotCount + "）");
    $("#SCount" + ToIdHouseId).html("");
    if (MesTotCount == 0) {
        clearTimeout(MesChatFlash);
        if ($("#ChatMes").attr("class") == "ChatMes_Y") {
            $("#ChatMes").attr("class", "ChatMes");
        }
    }
    return MesTotCount;
}
var MesListTime;
var MesChatFlash;
function MesListChangeCss() {
    MesListTime = 0;
    clearTimeout(MesChatFlash);
    if ($("#ChatUser_Message").length <= 0) {//判断是否有最小化窗口
        MesChatFlash = setInterval("MesListFlash()", "500");
    }
}
function MesListFlash() {
    if ($("#ChatMes").attr("class") != "ChatMes_C") {
        if (MesListTime % 2 == 0) {
            $("#ChatMes").attr("class", "ChatMes_Y");
        }
        else {
            $("#ChatMes").attr("class", "ChatMes");
        }
        MesListTime++;
        if (MesListTime > 6) {
            clearTimeout(MesChatFlash);
            MesListTime = 0;
        }
    }
}
///create by luxin 2012-05-14

///用户消息队列
var warnList = new Array();

///创建一个消息提醒对象
///toID：消息的接收者ID
///houseID：消息相关的houseID
///toName：消息接收者的Name
function CreateWarn(toID, houseID, toName) {
    var warn = new Object();
    warn.toID = toID;
    warn.houseID = houseID;
    warn.toName = toName;
    return warn;
}

///创建消息提示框
function CreateMessageBox() {
    if ($("#ChatUser_Message").length <= 0) {
        var obj = $("#ChatSmallUl")[0];
        var node = $("#ChatMes")[0];
        ShowChat(obj, node);
    }
}

///判断当前准备加入队列的对象是否已经在队列中存在
///toID：消息接收者ID
///houseID：房源ID
function IsItemExist(toID, houseID) {
    for (var i = 0; i < warnList.length; i++) {
        if (warnList[i].toID == toID && warnList[i].houseID == houseID) {
            return true;
        }
    }
    return false;
}
//    $.each(warnList, function (key, val) {
//        if (val.toID == toID && val.houseID == houseID) {
//            return true;
//        }
//    });
//    return false;

///向数组尾部新增一个消息对象
///wa：消息对象
function AddWarn(wa) {

    //如果当前新消息接收对象为当前对话框内选中的Tab时
    var activeTabID = $(".TabHeader .Listcur").attr("id");
    var temp = "tab_y_" + wa.toID + "_" + wa.houseID;
    var temp2 = IsTalkBoxHide();
    if (activeTabID == temp && temp2 == false) {
        return;
    }

    if (styleIndex < 3) {
        StopCutStyle(false);
    }

    var isShow = WebIM.JieMian.exist(wa.toID, wa.houseID);
    var isExist = IsItemExist(wa.toID, wa.houseID);

    //当前对象已处在对话框状态或当前对象已处在队列链表
    if (isShow == false && isExist == false) {
        warnList.push(wa);
        CutStyle();
        ReName(wa.toName);
    }
    //当前对象仅处于对象链表时
    if (isShow == false && isExist == true) {
        RemoveWarnByIDAndHouseID(wa.toID, wa.houseID);
        warnList.push(wa);
        CutStyle();
        ReName(wa.toName);
    }
    //当前对象已处于对话框状态时
    if (isShow == true) {
        RemoveWarnByIDAndHouseID(wa.toID, wa.houseID);
        warnList.push(wa);
        CutStyle();
        ReName(wa.toName);
    }
}

///获取最后一次向数组插入的元素
function GetLastWarn() {
    var obj;
    if (warnList.length > 0) {
        obj = warnList.pop();
    }
    ///下面被注释的逻辑放在$("#ChatUser_Message").click(function (){})事件内更符合
    //    if (warnList.length == 0) {
    //        ReName("在线消息");
    //    } else {
    //        CutStyle();
    //        ReName(warnList[warnList.length - 1].toName);
    //    }
    return obj;
}

///删除某一元素
///jquery的each不能使用break跳出循环，使用return false
function RemoveWarn(wa) {
    $.each(warnList, function (key, val) {
        if (val.toID == wa.toID) {
            warnList.splice(key, 1);
            return false;
        }
    });
    if (warnList.length == 0) {
        RemoveChat();
    }
}

///删除列表内对象的toID等于ID的元素
///需要被删除的对象的toID值
function RemoveWarnByID(Id) {
    if (Id == warnList[warnList.length - 1].toID) {
        warnList.pop();
        CutStyle();
        if (warnList.length > 0) {
            ReName(warnList[warnList.length - 1].toName);
        }
    } else {
        $.each(warnList, function (key, val) {
            if (val.toID == Id) {
                warnList.splice(key, 1);
                return false;
            }
        });
    }
}

///删除列表内对象的toID和houseID与参数相同的元素
///toID：需要被删除的对象的toID值
///houseID：需要被删除的对象的houseID值
function RemoveWarnByIDAndHouseID(toID, houseID) {
    if (warnList.length > 0) {
        if (toID == warnList[warnList.length - 1].toID && houseID == warnList[warnList.length - 1].houseID) {
            warnList.pop();
            if (warnList.length > 0) {
                ReName(warnList[warnList.length - 1].toName);
                CutStyle();
            }
        } else {
            $.each(warnList, function (key, val) {
                if (val.toID == toID && val.houseID == houseID) {
                    warnList.splice(key, 1);
                    return false;
                }
            });
        }
    }
}

///显示租客消息栏
///obj：需要DOM对象，消息栏所在的层ID
///node：需要DOM对象，将消息栏添加到该元素的前面
function ShowChat(obj, node) {
    var chatMessage = document.createElement("li");
    chatMessage.id = "ChatUser_Message";
    chatMessage.innerHTML = "在线消息";
    obj.insertBefore(chatMessage, node);
    //$("#ChatUser_Message").addClass("ChatUser_b");
    EditStyle("ChatUser_Y", "ChatUser");
    $("#ChatUser_Message").click(function () {
        if (styleIndex < 3) {
            StopCutStyle(true);
        }
        var wa = GetLastWarn();
        if (typeof (wa) != "undefined") {
            var isTopShow = WebIM.JieMian.exist(wa.toID, wa.houseID);
            if (isTopShow) {
                WebIM.JieMian.AddChatWin(wa.toID, wa.houseID, "", 2, 2, "webimkey");
                WebIM.JieMian.tabclick("tab_y_" + wa.toID + "_" + wa.houseID);
            } else {
                WebIM.JieMian.AddChatWin(wa.toID, wa.houseID, "", 2, 1, "webimkey");
            }

            CountTotal("_" + wa.toID + "_" + wa.houseID); //重新计算消息条数

            //处理点击后队列及样式
            if (warnList.length == 0) {
                //EditStyle("ChatUser_Y", "ChatUser_b");
                EditStyle("ChatUser_Y", "ChatUser");
            } else {
                CutStyle();
                ReName(warnList[warnList.length - 1].toName);
            }
            //wjl 添加2015-03-06 begin
            var oCon03 = $("#win_y_" + wa.toID + "_" + wa.houseID).find("#Con02");
            var oCon02 = $("#win_y_" + wa.toID + "_" + wa.houseID).find("#Con03");
            var oSB03 = $("#win_y_" + wa.toID + "_" + wa.houseID).find("#SB03");
            var oSB02 = $("#win_y_" + wa.toID + "_" + wa.houseID).find("#SB02");

            if (oCon03[0].offsetHeight > oCon02[0].offsetHeight) {
                oCon03[0].style.top = -(oCon03[0].offsetHeight - oCon02[0].offsetHeight) + 'px';
                oSB03[0].style.top = (parseInt(WebIM.JieMian.GetStyle(oSB02[0], 'height')) - parseInt(WebIM.JieMian.GetStyle(oSB03[0], 'height'))) + 'px';
            }
            //wjl 添加2015-03-06 end
            //wjl 添加 2015-003-05 begin
            var oBox3 = $('.Talk')[0];
            oBox3.onmouseover = function () {
                WebIm("win_y_" + wa.toID + "_" + wa.houseID);
            }
            //wjl 添加 2015-03-05 end
        } else {
            ReName($(".TabHeader .Listcur").attr("title"));
            if (IsTalkBoxHide() == false) {
                TalkBoxHide();
                return;
            }
        }
        if (IsTalkBoxHide() == true) {
            TalkBoxShow();
            ReName($(".TabHeader .Listcur").attr("title"));
        }
    });
}

///删除租客消息栏
function RemoveChat() {
    if ($("#ChatUser_Message").length > 0) {
        $("#ChatUser_Message").remove();
    }
}

///删除租客消息栏
///如果有租客消息未读时，闪烁并提示用户
function RemoveChatAndShowMessage() {
    if ($("#ChatUser_Message").length > 0 && warnList.length <= 0) {
        $("#ChatUser_Message").remove();
    }
    if ($("#ChatUser_Message").length > 0 && warnList.length > 0) {
        CutStyle();
        ReName(warnList[warnList.length - 1].toName);
    }
}

///修改节点显示文字
///name:修改后的文字
function ReName(name) {
    if (warnList.length > 0) {
        if ($("#ChatUser_Message").length > 0) {
            $("#ChatUser_Message").eq(0).html(name);
        }
    } else {
        $("#ChatUser_Message").eq(0).html($(".TabHeader .Listcur").attr("title"));
    }
}

///修改节点样式
///oldStyle:先移除旧有样式
///newStyle:再添加新样式
function EditStyle(oldStyle, newStyle) {
    var old = $("#ChatUser_Message").attr("class");
    if (typeof (old) != "undefined") {
        $("#ChatUser_Message").removeClass(oldStyle);
    }
    $("#ChatUser_Message").addClass(newStyle);
}

var styleIndex = 0;
var timeoutID;
///切换样式，提示用户
function CutStyle() {
    if ($("#ChatUser_Message").length > 0) {
        if (styleIndex % 2 == 0) {
            //EditStyle("ChatUser_b", "ChatUser_Y");
            EditStyle("ChatUser", "ChatUser_Y");
        }
        else {
            //EditStyle("ChatUser_Y", "ChatUser_b");
            EditStyle("ChatUser_Y", "ChatUser");
        }
        styleIndex++;
        timeoutID = setTimeout("CutStyle()", 1000);
        if (styleIndex >= 3) {
            clearTimeout(timeoutID);
            styleIndex = 0;
        }
    }
}

///终止样式切换动作
function StopCutStyle(blue) {
    if (blue)
    //EditStyle("ChatUser_Y", "ChatUser_b");
        EditStyle("ChatUser_Y", "ChatUser");
    else
    //EditStyle("ChatUser_b", "ChatUser_Y");
        EditStyle("ChatUser", "ChatUser_Y");
    clearTimeout(timeoutID);
    styleIndex = 0;
}

///判断聊天窗口是否已经最小化
function IsTalkBoxHide() {
    return $(".TalkBox").is(":hidden");
}

///显示聊天窗口
function TalkBoxShow() {
    WebIM.JieMian.SetCookie("" + webim_obj + "_TalkBox_Type", "0");
    WebIM.JieMian.Getleft();
    if ($("#youtx_ch_webim").html() != "") {
        $(".TalkBox").show();
        var tabid = $(".TabHeader .Listcur").attr("id");
        if ($(".TabHeader li").is("#" + tabid + "")) {
            var sp = new Array();
            sp = tabid.split("_");
            //$("#win_y_" + sp[2] + "_" + sp[3] + " .chat_history").scrollTop(100000);
        }
    }
}

///隐藏聊天窗口
function TalkBoxHide() {
    WebIM.JieMian.ShowHide();
}

///同步不同浏览器之间的数据
function SynBrowser(toID, houseID) {
    RemoveWarnByIDAndHouseID(toID, houseID);
    if (warnList.length > 0) {
        ReName(warnList[warnList.length - 1].toName);
    }
    else {
        ReName($(".TabHeader .Listcur").attr("title"));
        WebIM.JieMian.AlertTitle(oldtitie);
        EditStyle("ChatUser_Y", "ChatUser");
    }
}

var Ytx = {};
Ytx.tools = {};
Ytx.tools.getStyle = function (obj, attr) {
    if (obj.currentStyle) {                   //兼容
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
};
Ytx.ui = {};
Ytx.ui.fadeIn = function (obj) {                            //封装函数
    var iCur = Ytx.tools.getStyle(obj, 'opacity');        //获取当前opacity的值;
    if (iCur == 1) { return false; }                         //return false停止执行下面的代码
    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iSpeed = 5;
        if (value == 100) {
            clearInterval(obj.timer);
        }
        else {
            value += iSpeed;
            obj.style.opacity = value / 100;
            obj.style.filter = 'alpha(opacity=' + value + ')';   //做IE6的兼容
        }
    }, 20);
};
Ytx.ui.fadeOut = function (obj) {
    var iCur = Ytx.tools.getStyle(obj, 'opacity');
    if (iCur == 0) { return false; }
    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iSpeed = -5;
        if (value == 0) {
            clearInterval(obj.timer);
        }
        else {
            value += iSpeed;
            obj.style.opacity = value / 100;
            obj.style.filter = 'alpha(opacity=' + value + ')';    //做IE6的兼容
        }
    }, 15);
};

Ytx.ui.PicStyle = function (PicW, PicH) {
    var oOutBoxbg = document.getElementById("OutBoxbg");
    var OutBox = document.getElementById("OutBox");
    if (PicW >= 450) {
        OutBox.style.width = 10 + PicW + "px";
        oOutBoxbg.style.width = 8 + PicW + "px";
    }
    if (PicH >= 360) {
        OutBox.style.height = 10 + PicH + "px";
        oOutBoxbg.style.height = 8 + PicH + "px";
    }
}

Ytx.ui.Style = function () {
    var oOutBoxPic = document.getElementById("OutBoxPic");
    var CH = document.documentElement.clientHeight;
    var CW = document.documentElement.clientWidth;
    var OH = OutBox.offsetHeight;
    var OW = OutBox.offsetWidth;
    var SH = document.documentElement.scrollTop || document.body.scrollTop;
    var SW = document.documentElement.scrollLeft || document.body.scrollLeft;
    var oBoxH = OutBoxPic.offsetHeight;
    OutBox.style.top = SH + (CH - OH) / 2 + "px";
    OutBox.style.left = SW + (CW - OW) / 2 + "px";
    oOutBoxPic.style.top = (OH - oBoxH) / 2 + "px";
}

window.onload = function () {

}
function clickImg(imgUrl) {
    var oOutBoxPic = $("#OutBoxPic");
    oOutBoxPic.attr("src", imgUrl);
    OutBox.style.display = "block"
    var img = new Image();
    img.src = $("#OutBoxPic").attr("src");
    setTimeout(function () {
        var w = img.width;
        var h = img.height;
        if (w != 0 && h != 0) {
            Ytx.ui.PicStyle(w, h);
            Ytx.ui.Style();
            Ytx.ui.fadeIn(OutBox);
        }

    }, 600)
}

