var WebHost = "http://www.youtx.com";
var WebIMHost = "http://webim.youtx.com";
//var WebIMHost="http://webim.beta.www.youtx.com"; //"http://chat.client.3g.fang.com";/*要换的新接口*/
var session = "", check = "", talk_time = null, webim_error_send = 0;
/**
* json对象转字符串形式
*/
function json2str(o) {
    var arr = [];
    var fmt = function (s) {
        if (typeof s == 'object' && s != null) return json2str(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    }
    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}
function JsonArrayToString(jsonArray) {
    var JsonArrayString = "[";
    for (var i = 0; i < jsonArray.length; i++) {
        JsonArrayString = JsonArrayString + json2str(jsonArray[i]) + ",";
    }
    JsonArrayString = JsonArrayString.substring(0, JsonArrayString.length - 1) + "]";
    return JsonArrayString;
}
WebIM.Query = {
    Error: function () {
        // return "{\"Result\":\"400\",\"Message\":\"您的网络已经断开，请刷新页面重新连接。\"}";
        return { "result": "400", "Message": "您的网络已经断开，请刷新页面重新连接。" };
    },
    //发送消息
    Send: function (touid, houseid, content, complete) {

        //黑名单
        $.ajax({
            url: WebHost + '/Ajax/AjaxBlackList.aspx',
            success: function (data) {
                if (data == 'feng') {
                    //delCookie('new_loginid');
                    location.href = '/user/login/';
                }
            }
        });


        $.ajax({
            type: "get", //使用post方法访问后台
            dataType: "jsonp", //返回json格式的数据
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebHost + "/profile/Ajax/SendMessage.ashx?touid=" + touid + "&houseid=" + houseid + "&content=" + encodeURIComponent(content) + "&r=" + Math.random() + "&callback=?", //要访问的后台地址
            complete: complete, //AJAX请求完成时触发事件
            success: function (msg) {
                webim_error_send = 0;
                complete(msg);
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status != 200) {
                    webim_error_send = webim_error_send + 1;
                    if (webim_error_send != 0) {
                        complete(WebIM.Query.Error());
                    }
                    WebIM.Query.WebimError("Send", "" + textStatus + "|" + errorThrown + "", "", XMLHttpRequest.status, XMLHttpRequest.readyState);
                }
            }
        });
    },
    //wjl 修改2015-02-27 begin
    //发送消息
    Send1: function (touid, houseid, content, messageType, complete) {
        var data = { touid: touid, houseid: houseid, content: encodeURIComponent(content), messageType: messageType, r: Math.random() };
        $.ajax({
            type: "post", //使用post方法访问后台
            dataType: "jsonp", //返回json格式的数据
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            data: data,
            url: WebHost + "/profile/Ajax/SendMessage1.ashx",   //要访问的后台地址
            complete: complete, //AJAX请求完成时触发事件
            success: function (msg) {
                webim_error_send = 0;
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status != 200) {
                    webim_error_send = webim_error_send + 1;
                    if (webim_error_send == 3) {
                        complete(WebIM.Query.Error());

                    }
                    WebIM.Query.WebimError("Send", "" + textStatus + "|" + errorThrown + "", "", XMLHttpRequest.status, XMLHttpRequest.readyState);
                }

            }
        });
    },
    //wjl 修改 2015-02-27 end
    //用户在线状态更新
    UpdateState: function () {
        if (parseInt(getcookie('new_loginid')) > 0) {
            //生成隐藏的iframe用来刷新接口
            $.ajax({
                type: "get",
                dataType: "jsonp",
                jsonp: 'callback',
                timeout: 25000,  //超时时间25秒
                url: WebIMHost + "/useronline?" + Math.random(),
                beforeSend: function (R) {
                    R.setRequestHeader('Connection', 'Keep-Alive');
                },
                success: function (msg) {
                    //data中有最新消息uid和uname
                    return msg;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    return WebIM.Query.Error();
                }
            });
        }
    },
    //用户在线状态获取，多个uid以半角逗号(,)隔开
    GetState: function (uids, complete) {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebIMHost + "/checkuseronline?uid=" + uids + "&r=" + Math.random() + "&callback=?",
            // complete: complete,
            success: function (msg) {
                complete(msg);
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error();
            }
        });
    },
    //删除最近联系人
    Close: function (uid, houseid, complete) {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebIMHost + "/close?uid=" + uid + "&roomid=" + houseid + "&r=" + Math.random() + "&callback=?",
            success: function (msg) {
                complete(msg.result);
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error(); ;
            }
        });
    },
    //长连接
    Talk: function () {
        if (talk_time != null) {
            clearTimeout(talk_time);
        }
        //alert(WebIMHost + "/talk?r=" + Math.random() + "&callback=?");
        if (parseInt(getcookie('new_loginid')) > 0) {
            $.ajax({
                type: "get",
                dataType: "jsonp",
                jsonp: 'callback',
                url: WebIMHost + "/talk?r=" + Math.random() + "&callback=?",
                // url: "/Demo/talk.ashx?r=" + Math.random() + "&callback=?",
                beforeSend: function (R) {
                    R.setRequestHeader('Connection', 'Keep-Alive');
                },
                success: function (msg) {
                    if (msg.result == 0) {
                        WebIM.Query.Comet(msg);
                    }
                    else {
                        WebIM.Query.WebimError("Talk", "" + check + "", "" + msg.result + "", 0, 0);
                        //alert(WebIM.Query.GetMessage(msg.result));
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status != 200) {
                        WebIM.Query.Talk();
                        WebIM.Query.WebimError("Talk", "" + textStatus + "|" + errorThrown + "", "", XMLHttpRequest.status, XMLHttpRequest.readyState);
                    }
                    //                    WebIM.Query.Talk();                    
                }
            });
        }
        else {
            talk_time = setTimeout(WebIM.Query.Talk, 1000);
        }
    },
    //根据长连接返回的类型调用相关方法
    Comet: function (msg) {
        //                 if (JsonArrayToString(msg.data).length > 4) {
        //                     alert(JsonArrayToString(msg.data));
        //                 }
        if (msg.data.length > 0) {
            for (i = 0; i < msg.data.length; i++) {
                switch (msg.data[i].type) {
                    case 0: { WebIM.Query.Talk(); } //心跳信息
                        break;
                    case 1: { } //接收到的信息
                    case 2: { } //发送的信息
                    case 3: { } //最近联系人
                    case 4: { } //已打开窗口上线通知
                    case 5: { } //已打开好友下线通知
                    case 6: { } //删除最近联系人
                    case 9: { } //打开一个聊天窗口
                    case 10: { } //被他人打开聊天窗口
                    case 11: //关闭窗口通知 
                        { WebIM.JieMian.MeetingMember(msg.data[i]); }
                        break;
                    case 7: { WebIM.Query.Talk(); } //服务器端要求客户端重新连接
                        break;
                    case 8: //返回当前session信
                        {
                            session = msg.data[i].session;
                            check = msg.data[i].check;
                        }
                        break;
                    default: { }
                        break;
                }
            }
            WebIM.JieMian.GetUserState();
            if (parseInt(getcookie('new_loginid')) > 0) {
                var url = WebIMHost + "/talk?r=" + Math.random() + "&callback=?";
                if (session != "" && check != "") {
                    url = WebIMHost + "/talk?session=" + session + "&check=" + check + "&r=" + Math.random() + "&callback=?";
                }
                $.ajax({
                    type: "get",
                    dataType: "jsonp",
                    jsonp: 'callback',
                    url: url,
                    // url: "/Demo/talk.ashx?session=" + msg.session + "&check=" + msg.check + "&r=" + Math.random() + "&callback=?",
                    beforeSend: function (R) {
                        R.setRequestHeader('Connection', 'Keep-Alive');
                    },
                    success: function (msg) {
                        if (msg.result == 0) {
                            WebIM.Query.Comet(msg);
                        }
                        else {
                            WebIM.Query.WebimError("Talk", "" + check + "", "" + msg.result + "", 0, 0);
                            //alert(WebIM.Query.GetMessage(msg.result));
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        WebIM.Query.Talk();
                        if (XMLHttpRequest.status != 200) {
                            WebIM.Query.WebimError("Talk", "" + textStatus + "|" + errorThrown + "", "", XMLHttpRequest.status, XMLHttpRequest.readyState);
                        }
                    }
                });
            }
            else {
                talk_time = setTimeout(WebIM.Query.Talk, 1000);
            }
        }
    },
    //消息设置为已读
    SetIsRead: function (touid, houseid) {
        $.ajax({
            type: "get", //使用post方法访问后台
            dataType: "jsonp", //返回json格式的数据
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebHost + "/profile/Ajax/SetMessage.ashx?touid=" + touid + "&houseid=" + houseid + "&r=" + Math.random() + "&callback=?", //要访问的后台地址
            success: function (msg) {
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error();
            }
        });
    },
    //打开聊天窗口接口
    OpenWindow: function (uid, uname, to_uid, to_uname, houseid) {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebIMHost + "/openwin?uid=" + uid + "&uname=" + encodeURIComponent(uname) + "&to_uid=" + to_uid + "&to_uname=" + encodeURIComponent(to_uname) + "&roomid=" + houseid + "&r=" + Math.random() + "&callback=?",
            success: function (msg) {
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error();
            }
        });
    },
    //关闭联系人窗口
    CloseWindow: function (uid, to_uid, houseid, complete) {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebIMHost + "/winclose?uid=" + uid + "&to_uid=" + to_uid + "&roomid=" + houseid + "&r=" + Math.random() + "&callback=?",
            success: function (msg) {
                complete(msg.result);
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error();
            }
        });
    },
    //正在聊天人列表 {'result':0,'data'：[{‘uid1’: 1,’uid2’:0,’13’:439,….}]} 
    OpenList: function (uid, complete) {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebIMHost + "/openlist?uid=" + uid + "&callback=?",
            success: function (msg) {
                complete(msg);
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error();
            }
        });
    },
    //设置当前窗口读过的消息的最大位置
    SetReadPos: function (to_uid, pos, houseid, userid) {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebIMHost + "/setreadpos?to_uid=" + to_uid + "&pos=" + pos + "&roomid=" + houseid + "&uid=" + userid + "",
            success: function (msg) {
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                return WebIM.Query.Error();
            }
        });
    },
    //错误码转换为错误信息
    GetMessage: function (result) {
        var M = new Array(['0', '成功'], ['1001', '参数名错误'], ['1002', 'Cookie解析错误'], ['1003', 'cookie解析错误'], ['1004', '用户校验错误'], ['1005', '同步消息(广播)系统错误'], ['1006', '用户初始化错误'], ['1007', '参数内容错误'], ['1008', '同一用户长连接过多'], ['1009', '锁定错误'], ['1010', '工作队列已满'], ['400', '访问接口出错']);
        for (i = 0; i < M.length; i++) {
            if (result == M[i][0]) {
                return M[i][1];
            }
        }
        return "未知错误";
    },
    WebimError: function (type, count, message, status, readystate) {
        $.ajax({
            type: "get", //使用post方法访问后台
            dataType: "jsonp", //返回json格式的数据
            jsonp: 'callback',
            timeout: 25000,  //超时时间25秒
            url: WebHost + "/profile/Ajax/WebimErrorLog.ashx?type=" + type + "&count=" + count + "&message=" + message + "&status=" + status + "&readystate=" + readystate + "&callback=?", //要访问的后台地址
            //complete: complete, //AJAX请求完成时触发事件
            success: function (msg) {
                return msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }

}
window.WebIM.Query = WebIM.Query;
$(function () {
    //初始化环境
    setInterval(WebIM.Query.UpdateState, 10000);
    WebIM.Query.Talk();
});