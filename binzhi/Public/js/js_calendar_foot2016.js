var houseSearch = {
    dateInputInit: function ($startDate, $endDate) {
        var self = this;
        var mindate = parseDate(minDate),
          maxdate = parseDate(maxDate);

        $startDate.dateinput({
            min: mindate,
            max: new Date(+maxdate - 24 * 3600000),
            offset: self.dateOffset || [0, 0]
        });

        $endDate.dateinput({
            min: new Date(+mindate + 24 * 3600000),
            max: maxdate,
            offset: self.dateOffset || [0, 0]
        });

        var checkDateApi = $startDate.data("dateinput"),
            leaveDateApi = $endDate.data("dateinput");

        checkDateApi.change(function (event, date) {
            var leaveDay = parseDate(leaveDateApi.getInput().val()),
                 leaveMinDay = new Date(+date + 24 * 3600000);

            //  checkDateApi.getInput().next().hide();

            // 如果未设定离店时间或入住时间大于离店时间
            if (!leaveDay || compareDate(date, leaveDay)) {
                leaveDateApi.setMin(leaveMinDay).setValue(leaveMinDay).show();
            } else if (leaveDay) {
                leaveDateApi.setMin(leaveMinDay);
            }

        });
        leaveDateApi.change(function (event, date) {
            var startDay = parseDate(checkDateApi.getInput().val()),
                 startMaxDay = new Date(+date - 24 * 3600000);

            // leaveDateApi.getInput().next().hide();

            // 如果未设定入住时间或者入住时间大于离店时间
            if (!startDay || compareDate(startDay, date)) {
                checkDateApi.setValue(startMaxDay).show();
            }

        });
    },
    initView: function (conf) {
        //初始化组件属性和配置参数
        
        this.$startDate = conf.$startDate;
        this.$endDate = conf.$endDate;
       
        

        this.hasInputWord = false;
        this.resCacheData = {};
        this.highLighter = window["Highlighter"] ? new Highlighter() : null;

        //初始化日历控件
        this.dateInputInit($("#startDate"), $("#endDate"));
    }
   
};
function compareBirthDate(date1, date2) {
    var newDate1 = date1.split('-');
    var dateY1 = newDate1[0];
    var dateM1 = newDate1[1];
    var dateD1 = newDate1[2];

    var newDate2 = date2.split('-');
    var dateY2 = newDate2[0];
    var dateM2 = newDate2[1];
    var dateD2 = newDate2[2];

    if (dateY1 < dateY2) {
        return -1;
    }
    else if (dateY1 > dateY2) {
        return 1;
    }
    else if (dateY1 == dateY2) {
        if (dateM1 < dateM2) {
            return -1;
        }
        else if (dateM1 > dateM2) {
            return 1;
        }
        else if (dateM1 == dateM2) {
            if (dateD1 < dateD2) {
                return -1;
            }
            else if (dateD1 > dateD2) {
                return 1;
            }
            else if (dateD1 == dateD2) {
                return 0;
            }
        }
    }
}

function checkIdCard(cardNo) {
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    var len = cardNo.length;
    if (len != 15 && len != 18) {
        returnContent.msg = '证件号码位数不正确';
        returnContent.rst = false;
        return returnContent;
    }
    var reg;
    var cardNoSplit;
    var bGoodDay;
    var birth;
    if (len == 15) {
        if (!(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(cardNo))) {
            returnContent.msg = '证件号码格式不正确';
            returnContent.rst = false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            cardNoSplit = cardNo.match(reg);
            birth = new Date('19' + cardNoSplit[2] + '/' + cardNoSplit[3] + '/' + cardNoSplit[4]);
            bGoodDay = (birth.getYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));
        }
    }
    else if (len == 18) {
        if (!(/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(cardNo))) {
            returnContent.msg = '证件号码格式不正确';
            returnContent.rst = false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
            cardNoSplit = cardNo.match(reg);
            birth = new Date(cardNoSplit[2] + "/" + cardNoSplit[3] + "/" + cardNoSplit[4]);
            bGoodDay = (birth.getFullYear() == Number(cardNoSplit[2])) && ((birth.getMonth() + 1) == Number(cardNoSplit[3])) && (birth.getDate() == Number(cardNoSplit[4]));

        }
    }
    if (!bGoodDay) {
        returnContent.msg = '证件号码格式不正确';
        returnContent.rst = false;
    }
    else {
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth();
        var nowDate = new Date().getDate();

        if (compareBirthDate(birth.getFullYear() + '-' + birth.getMonth() + '-' + birth.getDate(), ((nowYear - 102) + "-" + nowMonth + "-" + nowDate)) < 0 || compareBirthDate(birth.getFullYear() + '-' + birth.getMonth() + '-' + birth.getDate(), (nowYear + "-" + nowMonth + "-" + nowDate)) > 0) {
            returnContent.msg = '证件号码格式不正确';
            returnContent.rst = false;
        }
        else {
            if (len == 15) {
                return returnContent;
            }
            else {
                // check city
                var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
                if (aCity[parseInt(cardNo.substr(0, 2))] == null) {
                    returnContent.msg = '证件号码格式不正确';
                    returnContent.rst = false;
                }
                var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子  
                var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码  
                var sum = 0, idx;
                for (var i = 0; i < cardNo.length - 1; i++) {
                    sum += parseInt(cardNo.substr(i, 1), 10) * arrExp[i];
                }
                idx = sum % 11;
                // 检验第18为是否与校验码相等  
                if (arrValid[idx] != cardNo.substr(17, 1).toUpperCase()) {
                    returnContent.msg = '证件号码格式不正确';
                    returnContent.rst = false;
                }
            }
        }
    }
    return returnContent;
}


function checkMilitaryCardNo(cardno) {
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    //var regNumCn = /^[0-9]{1,30}$/;
    //var regNumCnZn = /^[0-9][\u4E00-\u9FA5][a-zA-z]{1,30}$/;
    var regCn = /^[\u4E00-\u9FA5]$/;
    var regEn = /^[a-zA-Z]$/;
    var regNum = /^\d$/;
    var cnLength = 0;
    var enLength = 0;
    var numLength = 0;
    for (var i = 0; i < cardno.length; i++) {
        if (regCn.test(cardno[i])) {
            cnLength += 2;
        }
        else if (regEn.test(cardno[i])) {
            enLength += 1;
        }
        else if (regNum.test(cardno[i])) {
            numLength += 1;
        }
    }
    if (cnLength == 0 || numLength == 0) {
        returnContent.msg = "请输入正确的证件号码";
        returnContent.rst = false;
    }
    else if (cnLength + enLength + numLength <= 0 || cnLength + enLength + numLength > 30) {
        returnContent.msg = "请输入正确的证件号码";
        returnContent.rst = false;
    }
    return returnContent;
}

function checkPassPortCardNo(cardno) {
    var returnContent = {};
    returnContent.msg = '';
    returnContent.rst = true;
    var reg = /^[a-zA-Z0-9]{5,20}$/;
    if (!reg.test(cardno)) {
        returnContent.msg = "请输入正确的护照号码";
        returnContent.rst = false;
    }
    return returnContent;
}

function getBirthdayByIdCard(cardNo) {
    var cardNoVal = cardNo.replace(/\s/g, "");
    var len = cardNoVal.length;
    var birth = '';
    if (len != 15 && len != 18) {
        return false;
    }
    if (len == 15) {
        if (!(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/.test(cardNoVal))) {
            return false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            cardNoSplit = cardNoVal.match(reg);
            birth = new Date('19' + cardNoSplit[2] + '/' + cardNoSplit[3] + '/' + cardNoSplit[4]);
        }
    }
    else if (len == 18) {
        if (!(/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/.test(cardNoVal))) {
            return false;
        }
        else {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/);
            cardNoSplit = cardNoVal.match(reg);
            birth = new Date(cardNoSplit[2] + "/" + cardNoSplit[3] + "/" + cardNoSplit[4]);
        }
    }
    var fullMonth = birth.getMonth() + 1;
    var fullDate = birth.getDate();
    if (fullMonth < 10) {
        fullMonth = '0' + fullMonth;
    }
    if (birth.getDate() < 10) {
        fullDate = '0' + birth.getDate();
    }
    return birth.getFullYear() + '-' + fullMonth + '-' + fullDate;
}

function getSexByIdCard(cardNo) {
    var cardNoVal = cardNo.replace(/\s/g, "");
    var len = cardNo.length;
    if (len != 15 && len != 18) {
        return false;
    }
    var sex = '';
    if (parseInt(cardNoVal.substr(16, 1)) % 2 == 1) {
        return 'man';
    }
    else {
        return 'women';
    }
}
function parseDate(val, date) {
    if (val === undefined) { return; }
    if (val.constructor == Date) { return val; }

    if (typeof val == 'string') {

        // rfc3339?
        var els = val.split("-");
        if (els.length == 3) {
            return new Date(integer(els[0]), integer(els[1]) - 1, integer(els[2]));
        }

        // invalid offset
        if (!(/^-?\d+$/).test(val)) { return; }

        // convert to integer
        val = integer(val);
    }

    date.setDate(date.getDate() + val);
    return date;
}

function compareDate(date1, date2, type) {
    var date1 = date1.getTime(), date2 = date2.getTime();
    return !type ? date1 - date2 >= 0 : date1 - date2 > 0;
}

function dateGtWeek(date1, date2) {
    return date1.getTime() > date2.getTime() - 7 * 24 * 3600000;
}

function integer(val) {
    return parseInt(val, 10);
}

/*
* 验证时间段是否合法
* 1、离店时间大于入住时间
* 2、离店时间与入住时间是否重复
*/
function getTimeCompare(checkin, checkout, oldtime) {
    return checkout - checkin > 0 && checkin + checkout - timeData[0] - timeData[1] != 0;
}


function changeToLeftTime(leftSeconds) {
    //alert("changeToLeftTime");
    var h = parseInt(leftSeconds / (60 * 60)),
    m = parseInt((leftSeconds - h * 3600) / 60),
    s = leftSeconds % 60;

    h = h > 9 ? h + '' : '0' + h;
    m = m > 9 ? m + '' : '0' + m;
    s = s > 9 ? s + '' : '0' + s;

    return h + ':' + m + ':' + s;
}

// core function
// compare date
// @ add "type" for bug ID:1470
//其他js使用公共函数
function compareDate(date1, date2, type) {
    var date1 = date1.getTime(), date2 = date2.getTime();
    return !type ? date1 - date2 >= 0 : date1 - date2 > 0;
}

Array.prototype.contains = Array.prototype.contains || function (item) {
    var len = this.length;
    while (len--) {
        if (this[len] === item) {
            return true;
        }
    }
    return false;
};

//初始化导航上的tips功能
/*function FloatPanel(srcId, desId, direction, highlightCss) {

    var src = $("#" + srcId), des = $("#" + desId), SHOW = false;
    direction = direction || 'bottom';

    src.bind("mouseenter", function () {
        if (!SHOW) {
            var el = $(this), position = el.offset();

            switch (direction) {

                case "top":
                    des.show().css({ 'top': position.top - des.height(), 'left': position.left, 'z-index': '990', 'position': 'absolute' });
                    break;
                case "left":
                    des.show().css({ 'top': position.top + el.outerHeight(), 'right': position.left, 'z-index': '990', 'position': 'absolute' });
                    break;
                case "middle-left":
                    des.show().css({ 'top': (position.top - (des.outerHeight() - el.outerHeight()) / 2), 'left': position.left - des.outerWidth(), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "right":
                    des.show().css({ 'top': position.top, 'left': position.left + el.outerWidth(), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "middle-right":
                    des.show().css({ 'top': (position.top - (des.outerHeight() - el.outerHeight()) / 2), 'left': position.left + el.outerWidth(), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "right-bottom":
                    des.show().css({ 'top': position.top + el.outerHeight(), left: position.left - (des.outerWidth() - src.outerWidth()), 'z-index': '990', 'position': 'absolute' });
                    break;
                case "middle-bottom":
                    des.show().css({ 'top': position.top + el.outerHeight(), left: position.left - (des.outerWidth() - src.outerWidth()) / 2, 'z-index': '990', 'position': 'absolute' });
                    break;
                case "bottom":
                    des.show().css({ 'top': position.top + el.outerHeight(), 'left': position.left, 'z-index': '990', 'position': 'absolute' });
                    break;

            }

            if (highlightCss) {
                src.addClass(highlightCss);
            }
        }

    }).bind("mouseleave", function (event) {
        var e = $(event.relatedTarget);
        if (e.attr("id") != desId && e.parents("#" + desId).length == 0) {
            SHOW = false;
            if (highlightCss) {
                src.removeClass(highlightCss);
            }
            des.hide();
        }
    });
    des.bind("mouseleave", function (event) {
        var e = $(event.relatedTarget);
        if (e.attr("id") != srcId && e.parents("#" + srcId).length == 0) {
            SHOW = false;
            des.hide();
            if (highlightCss) {
                src.removeClass(highlightCss);
            }
        }
    });
}*/


function getValFromHash(key) {
    if (location.hash.length > 1) {
        var hash = location.hash.substring(1, location.hash.length);
        var hashArray = hash.split('&');
        if (hashArray.length > 0) {
            for (var i = 0; i < hashArray.length; i++) {
                var kv = hashArray[i];
                var indexOfEqualSign = kv.indexOf('=');
                if (indexOfEqualSign > -1) {
                    var itemKey = kv.substring(0, indexOfEqualSign);
                    if (itemKey.toLowerCase() == key.toLowerCase()) {
                        return kv.substring(indexOfEqualSign + 1, kv.length);
                    }
                }
            }
        }
    }

    return null;
}


function getPrevId() {
    if (traceData && traceData.prevId) {
        return traceData.prevId;
    }

    return getValFromHash("prevId");
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

(function () {
    String.prototype.endWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substring(this.length - str.length) == str)
            return true;
        else
            return false;
        return true;
    }
    String.prototype.startWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length) == str)
            return true;
        else
            return false;
        return true;
    }

    function appendLogToUrl(url) {
        if (typeof (traceData) == "undefined") {
            return url;
        }

        if (!url || url.toLowerCase().startWith("javascript:") || url.toLowerCase().startWith("#")) {
            return url;
        }

        var indexOfHash = url.indexOf('#');
        if (indexOfHash < 0) {
            url += '#prevId=' + traceData.pageId;
            return url;
        }

        var hash = url.substr(indexOfHash + 1);
        if (hash) {
            if (hash.toLowerCase().indexOf('previd=') > -1) {
                return url;
            }

            url += (url.endWith('&') ? '' : '&') + 'prevId=' + traceData.pageId;
        } else {
            url += 'prevId=' + traceData.pageId;
        }
        return url;
    }

    window.openUrl = function (vUrl) {
        window.open(appendLogToUrl(vUrl));
    }

    $(document).on("click", "a", function () {
        if (typeof (traceData) == "undefined" || !traceData.pageId) {
            return;
        }

        var srcHref = $(this).attr("href");
        var url = appendLogToUrl(srcHref);
        if (url != srcHref) {
            $(this).attr('href', url);
        }
    });
})();


