for(var SFUV={Version:"1.30",G_reqURL:("https:"==document.location.protocol?"https://countpvn.3g":"http://countpvn.light")+".fang.com/countpv",G_GlobalCname:"global_cookie",G_UniqueCname:"unique_cookie",G_GUID:"",G_UNID:"U_",G_time:31536e6,G_path:"/",G_out:"",G_param:[],getUqCode:function(){function getInfoTag(infoString,count){try{var s=infoString.toString(36);return s.length>=count?s.substring(s.length-count,s.length):s.substring(0,s.length)}catch(e){return"0"}}for(var s,newList,used,index,userInfoTag,recordTime,randomList=[],i=0;i<20;i++){for(s=Math.round(Math.random()*2147483647).toString(36);s.length<6;)s="0"+s;randomList.push(s)}for(newList=[],used={};newList.length<4;)index=Math.round(Math.random()*2147483647)%20,typeof used[index]=="undefined"&&(newList.push(randomList[index]),used[index]=!0);return userInfoTag="",userInfoTag+=getInfoTag(location.href.length,1),userInfoTag+=getInfoTag(window.history.length,1),userInfoTag+=getInfoTag(document.cookie.length,1),newList.push(userInfoTag),recordTime=(new Date).getTime().toString(36),recordTime.indexOf("-")>=0&&(recordTime=recordTime.substring(1,recordTime.length)),recordTime.length>8&&(recordTime=recordTime.substring(recordTime.length-8,recordTime.length)),newList.push(recordTime),newList.join("")},getDomain:function(){var dm="";return hn=location.hostname,str=hn.replace(/\.(com|net|org|cn$)\.?.*/,""),str.lastIndexOf(".")==-1?dm="."+hn:(str=str.substring(str.lastIndexOf(".")),dm=hn.substring(hn.lastIndexOf(str))),dm},getReferrer:function(){var referrer="";try{referrer=document.top.document.referrer}catch(e){if(document.parent)try{referrer=document.parent.document.referrer}catch(e2){referrer=""}}return referrer===""&&(referrer=document.referrer),referrer},purify:function(str){var targetPattern=new RegExp("#.*");return str=str.replace(targetPattern,""),str=str.replace(/\*/gi,""),str=str.replace(/~/gi,"_"),str.replace(/\^/gi,"")},getcookiedirect:function(O){var o="",l=O+"=",i,I;return document.cookie.length>0&&(i=document.cookie.indexOf(l),i!=-1&&(i+=l.length,I=document.cookie.indexOf(";",i),I==-1&&(I=document.cookie.length),o=document.cookie.substring(i,I))),o},getcookie:function(O){var o=this.getcookiedirect(O);return unescape(o)},getpassportcookie:function(name,subName){var cookieVal="",l=name+"=",i,I,result,subName,start,end;return document.cookie.length>0&&(i=document.cookie.indexOf(l),i!=-1&&(i+=l.length,I=document.cookie.indexOf(";",i),I==-1&&(I=document.cookie.length),cookieVal=document.cookie.substring(i,I))),result="",subName=subName+"=",cookieVal.length>0&&(start=cookieVal.indexOf(subName),start!=-1&&(start+=subName.length,end=cookieVal.indexOf("&",start),end==-1&&(end=cookieVal.length),result=cookieVal.substring(start,end))),result},setcookie:function(n,v,t,p,c){var T="";t&&(T=new Date((new Date).getTime()+t),T="; expires="+T.toGMTString());document.cookie=n+"="+escape(v)+T+(p?";path="+p:"/")+(c?";domain="+c:"")},hascookie:function(){var _cname=this.getcookie((new Date).valueOf()+"_cname");return typeof navigator.cookieEnabled=="undefined"?(this.setcookie(_cname,"1"),this.getcookie(_cname)==="1"?"1":"0"):window.navigator.cookieEnabled?"1":"0"},getNewUnid_mouse:function(unid){return unid.split("*")},setNewUnid_mouse:function(unid,mNum){return unid.split("*")[0]+"*"+mNum},init:function(paramsObj){var _param=[],_iscookie=this.hascookie(),_cookie_act="",_GUID=this.getcookie(this.G_GlobalCname),_UNID=this.getcookie(this.G_UniqueCname),infoList,_tmp,_tmp2,_t,p,aa,curTime,img,s;_iscookie==1?(_GUID?_cookie_act="0":(this.G_GUID=this.getUqCode(),this.setcookie(this.G_GlobalCname,this.G_GUID,this.G_time,this.G_path,this.getDomain()),_GUID=this.G_GUID,_cookie_act="1",this.setcookie(this.G_UniqueCname,this.G_UNID+_GUID,0,this.G_path,this.getDomain()),_UNID=this.G_UNID+_GUID),_UNID||(_UNID=this.G_UNID+this.getUqCode(),this.setcookie(this.G_UniqueCname,_UNID,0,this.G_path,this.getDomain()))):_GUID="";_self=this;var isMove=!1,moveF=function(){if(!isMove){isMove=!0;var mNum=0;try{mNum=parseInt(_self.getNewUnid_mouse(_UNID)[1])}catch(e){}isNaN(mNum)&&(mNum=0);mNum+=1;_self.setcookie(_self.G_UniqueCname,_self.setNewUnid_mouse(_UNID,mNum),0,_self.G_path,_self.getDomain())}},s=setInterval(function(){if(document.body){try{document.body.attachEvent("onmousemove",moveF)}catch(e){document.body.addEventListener("mousemove",moveF,!1)}setTimeout(function(){clearInterval(_self.s)},0)}},500);_self.s=s;paramsObj.isNorth=="N"&&(this.G_reqURL=("https:"==document.location.protocol?"https://countpvs.3g":"http://countpvs.light")+".fang.com/countpv");_param.v=this.Version;paramsObj.bid&&(_param.b=paramsObj.bid);_param.f=typeof paramsObj.frameType=="undefined"||paramsObj.frameType=="unset"?window!=top?1:0:paramsObj.frameType;infoList=[];_param.l=typeof paramsObj.location=="undefined"||paramsObj.location=="unset"?this.purify(window.location.href):this.purify(paramsObj.location);_param.r=typeof paramsObj.referrer=="undefined"||paramsObj.referrer=="unset"?this.purify(this.getReferrer()):this.purify(paramsObj.referrer);_param.g=_GUID;_param.u=_UNID.split("*")[0];_param.c=_iscookie;_param.a=_cookie_act;_param.s="";_param.m=this.getNewUnid_mouse(_UNID).length>1?this.getNewUnid_mouse(_UNID)[1]:0;_param.t=typeof encodeURI=="function"?encodeURI(this.purify(document.title)):"";_tmp=[];_tmp.isso_login=this.getcookie("isso_login");_tmp.isso_uuid=this.getcookie("isso_uuid");_tmp.username=this.getcookie("new_managername");_tmp.soufuncard_user=this.purify(this.getcookiedirect("new_soufuncard")).replace(/,/gi,"~");_tmp.sfut=this.getcookie("sfut");_tmp.isso_uuid&&infoList.push("100~"+_tmp.isso_uuid+"~"+_tmp.isso_login);_tmp.soufuncard_user&&infoList.push("3~"+_tmp.soufuncard_user);_tmp.username&&infoList.push("2~~"+escape(_tmp.username));_tmp.sfut&&infoList.push("1~"+_tmp.sfut);infoList.length==0&&infoList.push("0");_param.i=infoList.join("*");_tmp2=[];_t="";for(p in _param)typeof _param[p]!="function"&&typeof _param[p]!="object"&&typeof _param[p]!="Object"&&(_t=_param[p].toString(),aa=_t.substring(_t.length%8,_t.length%8+1).toString(),_param.s+=aa?aa:"n",_tmp2.push(p+"="+_t));(curTime=(new Date).getTime(),_tmp2.push(curTime),_param.o=paramsObj.urlowner,_tmp2.push("o="+paramsObj.urlowner),_param.realip=paramsObj.realip,_tmp2.push("realip="+paramsObj.realip),_param.pageid=paramsObj.pageid,_tmp2.push("pageid="+paramsObj.pageid),this.G_param=_param,this.IsWebBotVisit())||(img=document.createElement("img"),img.src=this.G_reqURL+"?"+_tmp2.join("^"),img.width=0,img.height=0,s=document.getElementsByTagName("script")[0],s.parentNode.insertBefore(img,s))},WebBot:["baiduspider","googlebot","googlebot-image","mediapartners-google","yahooslurp","Yahoo!SlupChina","Yahoo!-AdCrawler","YodaoBot","Sosospider","sogouspider","sogou","soso","baiduspider","yahoo-blogs","yahoo-verticalcrawler","yahoofeedseeker","yahooseeker-testing","yahooseeker","yahoo-mmcrawler","yahoo!_mindset","Yahoo! Slurp","Yahoo! SlurpChina","googlebot","google-sitemaps","msnbot","msnbot-media","bingbot","BingPreview","baidu Transcoder","baidu\\+Transcoder"],IsWebBotVisit:function(){if(typeof this.WebBot!="undefined"&&this.WebBot.length>0){var botString=this.WebBot.join("|"),botRegex=new RegExp(".*("+botString+").*","gi");try{if(window.navigator.userAgent.match(botRegex))return!0}catch(e){}}return!1}},scripts=document.getElementsByTagName("script"),cntr=scripts.length,curScript;cntr;){if(curScript=scripts[cntr-1],-1!=curScript.src.indexOf("uv.min.js")||-1!=curScript.src.indexOf("uv_new.js")||curScript.src.indexOf("uv_test.js")!=-1){eval(curScript.innerHTML);break}cntr--}