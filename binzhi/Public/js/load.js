function __getDomain(){var dm="";return hn=location.hostname,str=hn.replace(/\.(com|net|org|cn$)\.?.*/,""),str.lastIndexOf(".")==-1?dm="."+hn:(str=str.substring(str.lastIndexOf(".")),dm=hn.substring(hn.lastIndexOf(str))),dm}var _dctc=_dctc||{},_account=_dctc._account||[],_gaq=_dctc._gaq||[],_isNorth=_dctc.isNorth||"Y",_bid=_dctc.bid||"1",_urlowner=_dctc.urlowner||"",_sfuv_frameType=_dctc.frameType||"unset",_sfuv_location=typeof _dctc.location=="undefined"?"unset":_dctc.location,_sfuv_referrer=typeof _dctc.referrer=="undefined"?"unset":_dctc.referrer,_realip=_dctc.realip||"",_pageid=_dctc.pageid||"",__domain,i,j;if(_dctc.trackEvent=function(obj){var i,arrTrackEvent,arrObjProperty,j;if(obj)try{if(_account.length>0)for(i in _account){for(_gaq.push(["t"+i+"._setAccount",_account[i]]),arrTrackEvent=[],arrTrackEvent.push("t"+i+"._trackEvent"),arrObjProperty=[obj.c,obj.a,obj.l,obj.v,obj.n],j=0;j<arrObjProperty.length;j++)arrObjProperty[j]&&arrTrackEvent.push(arrObjProperty[j]);_gaq.push(arrTrackEvent)}}catch(err){}},__domain=__getDomain(),_account.length>0)for(i in _account)_gaq.push(["t"+i+"._setAccount",_account[i]]),_gaq.push(["t"+i+"._setDomainName",__domain]),_gaq.push(["t"+i+"._addOrganic","soso","w"]),_gaq.push(["t"+i+"._addOrganic","soso","key"]),_gaq.push(["t"+i+"._addOrganic","sogou","query"]),_gaq.push(["t"+i+"._addOrganic","sogou","keyword"]),_gaq.push(["t"+i+"._addOrganic","youdao","q"]),_gaq.push(["t"+i+"._addOrganic","baidu","word"]),_gaq.push(["t"+i+"._addOrganic","baidu","q1"]),_gaq.push(["t"+i+"._addOrganic","baidu","w"]),_gaq.push(["t"+i+"._addOrganic","baidu","kw"]),_gaq.push(["t"+i+"._addOrganic","360","q"]),_gaq.push(["t"+i+"._addOrganic","360","kw"]),_gaq.push(["t"+i+"._addOrganic","so.com","q"]),_gaq.push(["t"+i+"._addOrganic","easou","q"]),_gaq.push(["t"+i+"._addOrganic","yicha","key"]),_gaq.push(["t"+i+"._addOrganic","roboo","q"]),_gaq.push(["t"+i+"._trackPageview"]);if(_dctc._trackTrans)for(j in _dctc._trackTrans)_gaq.push(["t"+_dctc._trackTrans[j]+"._trackTrans"]);(function(){var ga=document.createElement("script"),s;ga.type="text/javascript";ga.async=!0;ga.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s)})(),function(){var uv=document.createElement("script"),s;uv.type="text/javascript";uv.async=!0;uv.src=document.location.protocol+"//static.soufunimg.com/ggcp/uv/new/uv.min.js?20160329";uv.text="SFUV.init({isNorth:_isNorth,bid:_bid,frameType:_sfuv_frameType,location:_sfuv_location,referrer:_sfuv_referrer,urlowner:_urlowner,realip:_realip,pageid:_pageid})";s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(uv,s)}()