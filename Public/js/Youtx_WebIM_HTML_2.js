var webim_html = '<div id="TalkBox_Youtx_ID" class="TalkBox" style="display:none;">'
      + '<div class="Talk  PosRe" id="Talk">'
      //wjl添加2015-01-30begin
      + '<div class="UserMenu" id="UserBox">'
      + '<div class="UserMain" id="UserM">'
      + '<ul class="TabHeader" id="UserNr" style="top:0px;">'
      + '</ul>'
      + '</div>'
      + '<div class="UserScroll" id="UserScroll" style="display: none;">'
      + '<span class="UserBar" id="UserBar" style="display:block; top:0px;">'
      + '</span>'
      + '</div>'
      + '</div>'
     //wjl添加2015-01-30end
      + '<div class="Talk_center">'
      + '<span class="DownArrow" style="display:none;"><img src="http://js.youtx.com/images/webim/dowearrow.gif" width="16" height="16" /></span>'
      + '<ul class="Yichu" style="display:none;" >'
      + '</ul>'
      + '<div id="TalkBox_Youtx_ID_s" style=" width:480px;height:26px; cursor: move;">'
      +'<span class="RentName"></span>'
      + '<span class="Chat_min"><img src="http://js.youtx.com/images/webim/SIcon.png" width="25" height="25" /></span>'
//      + '<ul class="TabHeader">'
//      + '</ul>'
      + '</div>'
      + '<div class="clear"></div>'
      + '<div id="youtx_ch_webim">'
      + '</div>'
      + '</div>'
      + '<div class="Talk_right"> </div>'
      + '<div class="HouseRe PosAb" style="display:none;"></div>'
      + '</div>'
      + '</div><div style="display:none;"> <ul id="youtx_none_li"></ul><div id="youtx_none_div"></div> </div><div  id="house_webim_s" style="display:none;"></div> <div id="soundContainer" style=" width:10px; height:10px ;"></div><div id="OutBox" class="OutBox"><div class="OutBoxbg" id="OutBoxbg" ></div><a href="javascript;;" class="CloseBtn" id="CloseBtn"></a><img id="OutBoxPic" class="OutBoxPic" src=""/></div>';

var guangao_wenzi = '<p class="webImTishi" style="background:#FCF3B4;color:#666;line-height:20px; padding-left:5px;">您正在使用游天下推出的新版沟通工具，<a href="http://www.youtx.com/Help#host_gt" target="_blank">了解更多</a><img id="WebIM_Tishi_FR" class="FR WebIM_Tishi_FR" style="margin-top:4px;cursor:pointer;" src="http://js.youtx.com/images/webim/TalkClose.gif"/></p>';
var fangdong_phone = '<div class="PhoneNum"><span class="FwB"></span><span class="FontArial F12" id="FontArial"></span></div>';
var guangao_img = '<div class="ChatAD"><a href="http://www.youtx.com/zhuanti/partyhouse/" target="_blank"><img src="http://img.youtx.com/duanzu/2015_03/31/16/42/68/ppc/008951580600.jpg" /></a></div>';
var ImJsUrl = "http://js.youtx.com";
//var ImJsUrl = "http://beta.www.youtx.com";
document.write("<script src='" + ImJsUrl + "/scripts/youtx_mi_query.js?v=201604071419' type='text/javascript'></script>");
document.write("<script src='" + ImJsUrl + "/scripts/WebIM.js?v=201604071419' type='text/javascript'></script>");
document.write("<script src='" + ImJsUrl + "/scripts/WebIM.Query.js?v=201604071419' type='text/javascript'></script>");
$(function() {
    var s = document.createElement("link");
    s.rel = "stylesheet";
    s.type = "text/css";
    s.href = "" + ImJsUrl + "/styles/Youtx_WebIM.css?v=201605251014";
    document.getElementsByTagName("head")[0].appendChild(s);
});
