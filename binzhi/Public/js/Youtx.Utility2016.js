
(function () {
    var Youtx = {
        author: "闵益飞 宋平",
        url: "http://www.youtx.com",
        date: "2011-10-19",
        updateDate: "2012-1-30",
        company: "搜房网 游天下"
    }

    //工具类
    Youtx.Utility = {
        //判断是否为空或者Null
        isNullOrEmpty: function (str) {
            if (str != null && $.trim(str).length > 0) {
                return false;
            } else {
                return true;
            }
        },
        //获取页面URL
        getPageUrl: function () {
            var url = window.location.href;
            return url;
        },
        //获取页面URL的各级目录名称 to Array
        getPageUrlList: function () {
            var arr = this.getPageUrl().split("/");
            return arr;
        },
        //获取页面URL中的锚链接
        getPageHash: function () {
            var hash = window.location.hash;
            return hash;
        },
        //向页面URL中写入锚链接
        setPageHash: function (hash) {
            window.location.hash = hash.replace("#", "");
        },
        //写入Cookie
        setCookie: function (c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + " ;path=/ ;domain=youtx.com";
        },
        //读取Cookie
        getCookie: function (c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
            }
            return "";
        },
        //判断是否全部为字母
        isLetter: function (keyword) {
            return /^[a-z]+$/i.test(keyword);
        },
        isLetterD: function (keyword) {
            return /^\w+$/i.test(keyword);
        },
        //将utf-8字符（如中文）编码并替换掉其中的% -- 防止参数过程中产生乱码
        encodeURI: function (uri) {
            uri = encodeURI(uri);
            //            while (uri.indexOf('%') > -1) {
            //                uri = uri.replace('%', '~');
            //            }
            return uri;
        },
        //解码, 与encodeURI对应
        decodeURI: function (uri) {
            while (uri.indexOf('~') > -1) {
                uri = uri.replace('~', '%')
            }
            return decodeURI(uri).replace(/%2c/g, ',').replace(/\+/g, ' ');
        },
        //替换字符串的字符
        replace: function (str, regExp, replacement) {
            if (typeof (regExp) == 'string') {
                regExp = new RegExp(regExp);
            }
            while (regExp.test(str)) {
                str = str.replace(regExp, replacement);
            }
            return str;
        },
        getViewPic: function (PicUrl, height, width) {
            var newurl = "";
            try {
                if (PicUrl.length > 8) {
                    var first = PicUrl.indexOf('/', 8);
                    var last = PicUrl.lastIndexOf('.');
                    newurl = PicUrl.substring(0, first);
                    newurl += "/viewimage";
                    newurl += PicUrl.substr(first, last - first);
                    newurl += "/" + width + "x" + height;
                    newurl += PicUrl.substr(last, PicUrl.length - last);
                }
            }
            catch (err) {
                debugger;
            }
            return newurl;
        },
        getViewPicC: function (PicUrl, height, width) {
            var newurl = "";
            try {
                if (PicUrl.length > 8) {
                    var first = PicUrl.indexOf('/', 8);
                    var last = PicUrl.lastIndexOf('.');
                    newurl = PicUrl.substring(0, first);
                    newurl += "/viewimage";
                    newurl += PicUrl.substr(first, last - first);
                    newurl += "/" + width + "x" + height + "c";
                    newurl += PicUrl.substr(last, PicUrl.length - last);
                }
            }
            catch (err) {
                debugger;
            }
            return newurl;
        },
        getExchange: function (count, formCur, toCur) {
            try {
                if (formCur.toLocaleUpperCase() == "CNY" || formCur.toLocaleUpperCase() == "RMB") { count = (count * USDCurrency).toFixed(2); }
                else { count = (count * CNYCurrency).toFixed(0); }
            }
            catch (err) {
                debugger;
            }
            return count;
        },
        stopDefaultEvent: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                //IE中阻止函数器默认动作的方式
                window.event.returnValue = false;
            }
            return false;
        }
    }

    //地址参数类
    Youtx.UrlParameter = function () {
        this.list = '1';
        this.viewMode = 'list';
        this.maptype = 'mapa';
        //this.minprice = '',
        //this.maxprice = '',        
        this.language = document.domain.indexOf("en.") > -1 ? "en-US" : "zh";
        this.currency = $.cookie("huobi") ? $.cookie("huobi") : "CNY";
        this.parse();
    }
    //地址字典
    //地址字段名 - HouseSearch - 
    Youtx.UrlParameter.path = '';
    Youtx.UrlParameter.version = "";
    Youtx.UrlParameter.prototype.params = {
        'countryid': { param: 'countryid', regExp: /countryid(\d+)/i, value: '', staticName: '' },
        'country': { param: 'country', regExp: /country([^\/]+)/i, value: '', staticName: 'Country' },
        'province': { param: 'province', regExp: /province([^\/]+)/i, value: '', staticName: 'Province/State' },
        'city': { param: 'city', regExp: /city([^\/]+)/i, value: '', staticName: 'City' },
        'district': { param: 'district', regExp: /district([^\/]+)/i, value: '', staticName: 'District' },
        'area': { param: 'area', regExp: /area(\w+)/i, value: '', staticName: 'Area/Street' },
        'building': { param: 'building', regExp: /building(\w+)/i, value: '', staticName: 'Building/Hotel' },
        'sw': { param: 'sw', regExp: /^sw([_!\.\d,]+)/i, value: '', staticName: '' },
        'ne': { param: 'ne', regExp: /^ne([_!\.\d,]+)/i, value: '', staticName: '' },
        'dis': { param: 'dis', regExp: /dis(\d+)/i, value: '', staticName: '' },
        'range': { param: 'range', regExp: /range(\d+)/i, value: '', staticName: 'Range' },
        'owner': { param: 'owner', regExp: /owner(\d+)/i, value: '', staticName: 'Owner' },
        'sptype': { param: 'spromotype', regExp: /sptype(\d+)/i, value: '', staticName: 'SPromoType' },
        'ptype': { param: 'promotype', regExp: /ptype(\d+)/i, value: '', staticName: 'PromoType' },
        'pid': { param: 'promoid', regExp: /pid(\d+)/i, value: '', staticName: 'PromoID' },
        'sp': { param: 'specialprice', regExp: /sp(\d+)/i, value: '', staticName: 'SpecialPrice' },
        'sding': { param: 'shanding', regExp: /^sding(\d+)/i, value: '', staticName: 'ShanDing' },
        'tag': { param: 'tag', regExp: /^tag([^\/]+)/i, value: '', staticName: 'tags' },
        'stag': { param: 'stag', regExp: /^stag([^\/]+)/i, value: '', staticName: '' },
        'htag': { param: 'htag', regExp: /^htag([^\/]+)/i, value: '', staticName: '' },
        'approve': { param: 'approve', regExp: /approve(\d)/i, value: '', staticName: 'IsApprove' },
        'photo': { param: 'photo', regExp: /^photo(\d)/i, value: '', staticName: 'IsPhoto' },
        'boutique': { param: 'IsBoutique', regExp: /^boutique(\d)/i, value: '', staticName: 'IsBoutique' },
        'mobile': { param: 'mobile', regExp: /^mobile(\d)/i, value: '', staticName: 'IsMobileMaster' },
        'shop': { param: 'shop', regExp: /^shop(\d)/i, value: '', staticName: '' },
        'phone': { param: 'phone', regExp: /^phone(\d)/i, value: '', staticName: '' },
        'fuser': { param: 'fuser', regExp: /fuser(\d+)/i, value: '', staticName: 'MyFavorite' },
        'puser': { param: 'puser', regExp: /puser(\d+)/i, value: '', staticName: 'MyRooms' },
        'ids': { param: 'ids', regExp: /ids([,\d]+)/i, value: '', staticName: '' },
        'sid': { param: 'shopid', regExp: /sid([\d]+)/i, value: '', staticName: '' },
        'htype': { param: 'htype', regExp: /htype([,\d]+)/i, value: '', staticName: 'HouseType' },
        'room': { param: 'room', regExp: /room([,\d]+)/i, value: '', staticName: 'Bedrooms' },
        'bed': { param: 'bed', regExp: /bed(\d+)/i, value: '', staticName: 'Beds' },
        'bath': { param: 'bath', regExp: /bath(\d+)/i, value: '', staticName: 'Baths' },
        'am': { param: 'sp', regExp: /am([\d,]+)/, value: '', staticName: 'Amenities' },
        'rtype': { param: 'rtype', regExp: /rtype([\d,]+)/i, value: '', staticName: 'RoomType' },
        'rctype': { param: 'rctype', regExp: /rctype([\d,]+)/i, value: '', staticName: 'RoomCountType' },
        'in': { param: 'cin', regExp: /in(\d+)/i, value: '', staticName: 'CheckIn' },
        'out': { param: 'out', regExp: /out(\d+)/i, value: '', staticName: 'CheckOut' },
        'guest': { param: 'guest', regExp: /guest(\d+)/i, value: '1', staticName: 'Guests' },
        'price': { param: 'price', regExp: /price([\d,]+)/i, value: '', staticName: 'MinPrice/MaxPrice' },
        'minday': { param: 'minday', regExp: /minday([\d,]+)/i, value: '', staticName: 'MinDay' },
        'longrent': { param: 'islongrent', regExp: /longrent(\d)/i, value: '', staticName: '' },
        'invoice': { param: 'invoice', regExp: /invoice(\d+)/i, value: '', staticName: 'Invoice' },
        'se': { param: '', regExp: /se(\d+)/i, value: '0', staticName: 'FromSearchBar' },
        'guaranteed': { param: 'guaranteed', regExp: /guaranteed(\d+)/i, value: '', staticName: 'Guaranteed' },
        'ct': { param: '', regExp: /ct(\d+)/i, value: '0', staticName: 'CityInputType' },
        'kw': { param: 'kw', regExp: /kw([^\/]+)/i, value: '', staticName: 'Keyword' },
        'kt': { param: '', regExp: /kt(\d+)/i, value: '0', staticName: 'KeywordInputType' },
        'ps': { param: 'ps', regExp: /ps(\d+)/i, value: '', staticName: 'PageSize' },
        'page': { param: 'page', regExp: /page(\d+)/i, value: '1', staticName: 'Page' },
        'sort': { param: 'sort', regExp: /sort(\d+)/i, value: '0', staticName: 'SortBy' },
        'stat': { param: 'stat', regExp: /stat(\d+)/i, value: '0', staticName: '' }
    }

    /*
    /path/params/#archor@path
    */

    Youtx.UrlParameter.prototype.parse = function () {

        var hash = window.location.hash;
        var pathname = window.location.pathname.toLowerCase();
        var args = '';

        pathname = pathname.replace(/^\//, '');
        pathname = pathname.replace(/\/$/, '');
        pathname = pathname.split('/');

        this.path = pathname[0];
        if (pathname.length > 1) {
            args = pathname[1];
        }

        //viewMode
        switch (/^[^\-]+/i.exec(this.path)[0]) {
            case 'list':
                this.list = '1';
                this.path = this.path.replace(/^list-?/i, '');
                break;
            case 'photo':
                this.list = '2';
                this.path = this.path.replace(/^photo-?/i, '');
                break;
            case 'map':
                this.list = '3';
                this.path = this.path.replace(/^map-?/i, '');
                break;
            default:
                this.path = this.path.replace(/^rooms/i, '');
                var list = $.cookie('duanzuViewList');
                if (!Youtx.Utility.isNullOrEmpty(list)) { this.list = list; }
                break;
        }
        switch (this.list) {
            case '1':
                this.viewMode = 'list';
                break;
            case '2':
                this.viewMode = 'photo';
                break;
            case '3':
                this.viewMode = 'map';
                break;
        }

        //params in path
        if (args != '') {
            args = args.split('-');

            var j = 0;
            for (var name in this.params) {
                for (var i = j; i < args.length; i++) {
                    if (this.params[name].regExp.test(args[i])) {
                        this.params[name].value = this.params[name].regExp.exec(args[i])[1];
                        j++;
                        break;
                    }
                }
            }
        }

        //params in anchor
        if (hash != '') {
            hash = hash.replace(/^#/, '');
            hash = hash.split('@');

            if (hash.length > 1) {
                this.path = hash[1];
            }

            args = hash[0];
            args = args.split('-');

            var j = 0;
            for (var name in this.params) {
                for (var i = j; i < args.length; i++) {
                    if (this.params[name].regExp.test(args[i])) {
                        this.params[name].value = this.params[name].regExp.exec(args[i])[1];
                        j++;
                        break;
                    }
                }
            }
        }
        if (islogin2 == "0") { this.params['fuser'].value = ''; }
        this.params['sw'].value = Youtx.Utility.replace(Youtx.Utility.replace(this.params['sw'].value, '_', '-'), '!', '.');
        this.params['ne'].value = Youtx.Utility.replace(Youtx.Utility.replace(this.params['ne'].value, '_', '-'), '!', '.');
        this.params['kw'].value = Youtx.Utility.decodeURI(this.params['kw'].value);
        this.params['city'].value = Youtx.Utility.decodeURI(this.params['city'].value);
        this.params['district'].value = Youtx.Utility.decodeURI(this.params['district'].value);
        this.params['tag'].value = Youtx.Utility.decodeURI(this.params['tag'].value);
        this.params['stag'].value = Youtx.Utility.decodeURI(this.params['stag'].value);
        this.params['htag'].value = Youtx.Utility.decodeURI(this.params['htag'].value);
    }

    //join params for list or photo path, return string
    //params {viewMode, path, se, ...}
    Youtx.UrlParameter.prototype.join = function (args) {
        if (args == null) args = new Object();

        var viewMode = this.viewMode;
        var path = this.path;

        if (args['viewMode'] != null) {
            viewMode = args['viewMode'];
        }
        if (args['path'] != null) {
            path = args['path'];
        }

        //        args['se'] = (args['se'] != null ? args['se'] : '');
        args['sw'] = Youtx.Utility.replace((args['sw'] == null ? this.params['sw'].value : args['sw']), '-', '_');
        args['sw'] = Youtx.Utility.replace(args['sw'], /\./g, '!');
        args['ne'] = Youtx.Utility.replace((args['ne'] == null ? this.params['ne'].value : args['ne']), '-', '_');
        args['ne'] = Youtx.Utility.replace(args['ne'], /\./g, '!');
        //        args['kw'] = Youtx.Utility.encodeURI((args['kw'] == null ? this.params['kw'].value : args['kw']));

        var ps = new Array();
        for (var name in this.params) {
            if (args[name] != null && args[name] != "") {
                ps.push(name + args[name]);
            }
            else if (this.params[name].value && this.params[name].value != 'yymmdd') {
                switch (name) {
                    case 'page':
                        if (this.params['page'].value > 1) { ps.push(name + this.params[name].value); }
                        break;
                    case 'kw':
                        { ps.push(name + Youtx.Utility.encodeURI(this.params[name].value)); }
                        break;
                    case 'city':
                        if (path.match(/list|photo|rooms|map/i) || path == "") { ps.push(name + Youtx.Utility.encodeURI(this.params[name].value)); }
                        break;
                    case 'district':
                        { ps.push(name + Youtx.Utility.encodeURI(this.params[name].value)); }
                        break;
                    case 'sort':
                        if (this.params['sort'].value > 0) { ps.push(name + this.params[name].value); }
                        break;
                    case 'price':
                        if (this.params[name].value != '10,300') { ps.push(name + this.params[name].value); }
                        break;
                    case 'guest':
                        if (this.params[name].value > 1) { ps.push(name + this.params[name].value); }
                        break;
                    case 'range': if (o.params['kw'].value) { ps.push(name + this.params[name].value) } break;
                    case 'stat': break;
                    default:
                        ps.push(name + Youtx.Utility.encodeURI(this.params[name].value));
                        break;
                }
            }
        }

        var url = "";
        if (viewMode == 'map') {
            url = '/map/';
            if (ps.length > 0) {
                url += '#' + ps.join('-');
            } else { url += '#'; }
            if (path != '' && path != "map") {
                url += '@' + path;
            }
        }
        else {
            if (this.language != "en-US") {
                if (path != '') {
                    url += '/' + path + '/';
                }
                else {
                    url += '/' + viewMode + '/';
                }
            } else {
                url += "/s/";
            }
            if (ps.length > 0) {
                url += ps.join('-') + '/';
            }

        }

        return url;
    }

    //join params and set anchor - only for map
    Youtx.UrlParameter.prototype.anchor = function (se) {
        var hash = '';
        var args = new Array();

        for (var name in this.params) {
            if (this.params[name].value) {
                switch (name) {
                    case 'city': if (this.path == '') { args.push(name + this.params[name].value); } break;
                    case 'in': if (this.params[name].value != 'yymmdd') { args.push(name + this.params[name].value); } break;
                    case 'out': if (this.params[name].value != 'yymmdd') { args.push(name + this.params[name].value); } break;
                    case 'guest': if (this.params[name].value > 1) { args.push(name + this.params[name].value); } break;
                    case 'sort': if (this.params[name].value > 0) { args.push(name + this.params[name].value); } break;
                    case 'page': if (this.params[name].value > 1) { args.push(name + this.params[name].value); } break;
                    case 'price': if (this.params[name].value != '10,300') { args.push(name + this.params[name].value); } break;
                    case 'sw': args.push(name + Youtx.Utility.replace(this.params['sw'].value, '-', '_')); break;
                    case 'ne': args.push(name + Youtx.Utility.replace(this.params['ne'].value, '-', '_')); break;
                    case 'kw': args.push(name + Youtx.Utility.encodeURI(this.params['kw'].value)); break;
                    case 'district': args.push(name + Youtx.Utility.encodeURI(this.params['district'].value)); break;
                    case 'stat': break;
                    default: { args.push(name + this.params[name].value); break; }
                }
            }
        }
        if (args.length > 0) {
            hash += args.join('-');
        }

        if (this.path != '') {
            hash += '@' + this.path;
        }

        if (hash != '') {
            window.location.hash = hash;
        }
    }

    //join params for search interface
    Youtx.UrlParameter.prototype.splice = function () {

        var url = '/Ajax/HouseSearch.aspx?';
        var args = new Array();

        for (var name in this.params) {
            if (this.params[name].value != '' && this.params[name].value != null && this.params[name].param != '') {
                if (name == "price") {
                    if (this.params[name].value != "10,300") {
                        args.push(this.params[name].param + '=' + this.params[name].value);
                    }
                }
                else { args.push(this.params[name].param + '=' + this.params[name].value); }
            }
        }
        if (this.path != '' && this.path != 'list' && this.path != 'photo' && this.path != 'map' && this.path != 's') { args.push('path' + '=' + this.path); }
        if (this.version != '') { args.push('version=' + this.version); }
        if (args.length > 0) {
            url += window.encodeURI(args.join('&'));
        }

        return url;
    }

    Youtx.UrlParameter.prototype.getParams = function () {
        var values;
        {
            this.path = $('#path').val();
            if (this.path == '') {
                switch ($.cookie('duanzuViewList')) {
                    case "1": this.path = 'list'; break;
                    case "2": this.path = 'photo'; break;
                    case "3": this.path = 'map'; break;
                }
            }
        }
        if (o.language != "en-US") {
            if ($.trim($("#txtCity").val()) != "输入城市") { this.params['city'].value = $.trim($("#txtCity").val()); }
            else { this.params['city'].value = ""; }
            if ($.trim($("#txtLocation").val()) != Youtx.Page.locationsDefaultValue) { this.params['kw'].value = $.trim($("#txtLocation").val()); }
            else { this.params['kw'].value = ''; }
        } else {
            this.params['kw'].value = $.trim($("#txtCity").val());
        }
        this.params['in'].value = $("#checkin").val().replace(/-/ig, "");
        this.params['out'].value = $("#checkout").val().replace(/-/ig, "");
        this.params['guest'].value = $("#numberofguests").val();
        if ($("#invoice").attr("checked")) { this.params['invoice'].value = '1'; } else { this.params['invoice'].value = ''; }
        if ($("#approve").attr("checked")) { this.params['approve'].value = '1'; } else { this.params['approve'].value = ''; }
        if ($("#photo").attr("checked")) { this.params['photo'].value = '1'; } else { this.params['photo'].value = ''; }
        if ($("#mobilemaster").attr("checked")) { this.params['mobile'].value = '1'; } else { this.params['mobile'].value = ''; }
        if ($("#chk_brandshop").attr("checked")) { this.params['shop'].value = '1'; } else { this.params['shop'].value = ''; }
        if ($("#chk_phone").attr("checked")) { this.params['phone'].value = '1'; } else { this.params['phone'].value = ''; }
        if ($("#shanding").attr("checked")) { this.params['sding'].value = '1'; } else { this.params['sding'].value = ''; }
        // that.sort = $("#sort").val();
        //  that.page = CurrentPage;
        if (this.list == "3") {
            values = new Array();
            $("#RoomType :checked").each(function () {
                values.push($(this).val());
            });
            this.params['rtype'].value = values.join(',');

            values = new Array();
            $("#District :checked").each(function () {
                values.push($(this).val());
            });
            $("#DistrictMore :checkbox:gt(2):checked").each(function () {
                values.push($(this).val());
            });
            this.params['district'].value = values.join(',');

            values = new Array();
            $("#HouseTypeMore input[class=housetype]:checked").each(function () {
                values.push($(this).val());
            });
            this.params['htype'].value = values.join(',');

            values = new Array();
            $("#HouseCondition :checked").each(function () {
                values.push($(this).val());
            });
            $("#HouseConditionMore :checkbox:gt(2):checked").each(function () {
                values.push($(this).val());
            });
            this.params['am'].value = values.join(',');

            this.params['price'].value = $.trim($("#slider_user_min").text().replace("￥", "").replace("$", "")) + "," + $.trim($("#slider_user_max").text().replace("￥", "").replace("+", "").replace("$", ""));
        }
        this.params['kt'].value = '';   //统计都有ga 2013/06/24
        this.params['ct'].value = '';
        this.params['se'].value = '';
    };

    Youtx.UrlParameter.prototype.statistics = function () {

        var args = new Array();
        var url = "";
        if ($.trim($("#txtCity").val()) != '输入城市') { this.params['city'].value = $.trim($("#txtCity").val()); }
        for (var name in this.params) {
            if (this.params[name].value != '' && this.params[name].value != null && this.params[name].staticName != '') {
                switch (name) {
                    case 'in': if (this.params[name].value != "yymmdd") { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'out': if (this.params[name].value != "yymmdd") { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'page': if (this.params[name].value > "1") { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'price': if (this.params[name].value != "10,300") { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'guest': if (this.params[name].value > '1') { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'sort': if (this.params[name].value > '0') { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'se': if (this.params[name].value > '0') { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'ct': if (this.params['city'].value != "") { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'kt': if (this.params["kw"].value != "") { args.push(this.params[name].staticName + '=' + this.params[name].value); } break;
                    case 'ptype': break;
                    case 'pid': break;
                    case 'sp': break;
                    default: args.push(this.params[name].staticName + '=' + window.decodeURI(this.params[name].value)); break;
                }
            }
        }

        args.push("ViewMode" + "=" + this.list);
        args.push("Version" + "=" + this.version);
        args.push("RecordCount" + "=" + totalcount);
        if (typeof userid != "undefined") { if (userid != "") { args.push("UserID" + "=" + userid); } }
        if (this.path != '') { args.push('Path' + '=' + this.path); }
        args.push('ReferrerDomain=' + window.location.hostname);
        if (args.length > 0) {
            url += args.join('&');
        }

        return encodeURI(url);
    }

    //自动下拉提示AutoComplete
    /*
    params = {
    inputId:"文本框id,必填",
    parentId:"下拉菜单div父div的Id,可选，默认添加到body上",
    className:"下拉菜单的样式,可选",
    firstSelected:"下拉提示第一个是否被选中,true,false,默认true",
    userIe6bug:"是否屏蔽ie6bug,true,false,默认false"
    }
    */
    Youtx.AutoComplete = function (params) {
        this.init(params);
    }
    Youtx.AutoComplete.prototype = {
        input: null,
        popup: null,
        //data: null,
        current: -1,
        defaultValue: "",
        parentDoc: null,
        firstSelected: true,
        userIe6bug: false,
        finshFun: function () {
        },
        init: function (params) {
            var that = this;
            that.input = document.getElementById(params.inputId);
            that.popup = document.createElement("div");
            if (!Youtx.Utility.isNullOrEmpty(params.className)) {
                that.popup.className = params.className;
            }

            that.data = null;
            if (!Youtx.Utility.isNullOrEmpty(params.parentId)) {
                that.parentDoc = document.getElementById(params.parentId);
            } else {
                that.parentDoc = document.body;
            }
            if (that.parentDoc != null) {
                that.parentDoc.appendChild(this.popup);
            }

            that.addEvent(document.body, "click", function () {
                that.popup.style.display = "none";
            })

            if (params.firstSelected === false) {
                that.firstSelected = false;
            }
            if (params.userIe6bug === true) {
                this.userIe6bug = true;
            }
        },
        hide: function () {
            this.popup.style.display = "none";
            this.popup.innerHTML = "";
        },
        show: function (data, isLetter) {


            this.isFinsh = false;
            this.popup.innerHTML = "";

            //            if (this.userIe6bug === true) {
            //                this.popup.innerHTML = '<iframe scrolling="no" frameborder="0" class="iframeie6"></iframe>'
            //            }
            var inputValue = this.input.value.toString();
            this.defaultValue = inputValue;
            //修改开始
            var myfdiv = document.createElement("div");
            var myful = document.createElement("ul");
            var myfli;
            myfdiv.setAttribute("class", "citywordTit");
            myfdiv.innerHTML = "请输入中文/拼音或↑↓键选择";
            myful.setAttribute("class", "citywordUl");

            //            var myfdl = document.createElement("dl");
            //            var myfdt = document.createElement("dt");
            //            myfdt.innerHTML = "请输入中文/拼音或↑↓键选择";
            //            myfdl.appendChild(myfdt);

            var aliasName, englishName, abbr;
            //var myfdd;
            var rex = new RegExp('^' + inputValue, 'i');
            var e, s; //e = Match English , s = Match Spell

            for (var i = 0; i < data.length; i++) {
                aliasName = data[i].aliasName;
                myfli = document.createElement("li");
                myfli.title = aliasName;
                myfli.index = i;
                if (isLetter) {
                    e = rex.test(data[i].englishName);
                    s = rex.test(data[i].spell);
                    if (e) { englishName = data[i].englishName; }
                    if (s) { englishName = data[i].spell; }

                    if (e || s) {
                        englishName = englishName.replace(rex, '<span class="ColorFF4401">' + rex.exec(englishName) + '</span>');
                    }
                    else if (inputValue.length > 1) {
                        e = (data[i].abbr.indexOf(inputValue.toUpperCase()) == 0);
                        s = (data[i].spellAbbr.indexOf(inputValue.toUpperCase()) == 0);

                        if (e || s) {
                            if (e) {
                                englishName = data[i].englishName;
                                abbr = data[i].abbr;
                            }
                            if (s) {
                                englishName = data[i].spell;
                                abbr = data[i].spellAbbr;
                            }
                            var k = 0;
                            var l;
                            var result = '';
                            for (var j = 0; j < englishName.length; j++) {
                                l = englishName.substr(j, 1);
                                if (l == abbr.substr(k, 1)) {
                                    result += '<span class="ColorFF4401">' + l + '</span>';

                                    k++;
                                    if (k == abbr.length) {
                                        result += englishName.substring(j + 1);
                                        break;
                                    }
                                }
                                else {
                                    result += l;
                                }
                            }
                            englishName = result;
                        }
                    } //<a href="javascript:void(0)"><span class="ColorFF4401">北京</span>市</a></li>
                    myfli.innerHTML = '<a href="javascript:void(0)" onclick="return false;">' + '<span class="ColorFF4401">' + aliasName + '</span><span class="ColorFF4401">' + englishName + '</span></a>';
                }
                else {
                    var regex = new RegExp(inputValue, "gi");
                    aliasName = aliasName.replace(regex, '<span class="ColorFF4401">' + inputValue + '</span>');
                    myfli.innerHTML = '<a href="javascript:void(0)" onclick="return false;">' + aliasName + '</a>';
                }

                myful.appendChild(myfli);

            }
            this.popup.appendChild(myfdiv);
            this.popup.appendChild(myful);
            this.popup.style.display = "block";
            this.parentDoc.style.display = "block";
            this.initEvent();

        },
        show2: function (data) {

            this.isFinsh = false;
            this.popup.innerHTML = "";

            if (this.userIe6bug === true) {
                this.popup.innerHTML = '<iframe scrolling="no" frameborder="0" class="iframeie6"></iframe>'
            }
            var inputValue = this.input.value.toString();
            this.defaultValue = inputValue;

            var myfdl = document.createElement("dl");
            var myfdt = document.createElement("dt");
            if ($.cookie("LN") != "en-US") {
                myfdt.innerHTML = "请输入中文/拼音或↑↓键选择";
                myfdl.appendChild(myfdt);
            }



            var aliasName, englishName, abbr;
            var myfdd;
            var rex = new RegExp('^' + inputValue, 'i');
            var e, s; //e = Match English , s = Match Spell

            for (var i = 0; i < data.length; i++) {
                aliasName = data[i].text;
                myfdd = document.createElement("dd");
                myfdd.title = aliasName;
                myfdd.index = i;
                var regex = new RegExp(inputValue, "gi");
                aliasName = aliasName.replace(regex, '<span class="pink">' + inputValue + '</span>');
                myfdd.innerHTML = '<span class="cityhyword">' + aliasName + '</span>';

                myfdl.appendChild(myfdd);
            }

            this.popup.appendChild(myfdl);
            this.popup.style.display = "block";
            this.parentDoc.style.display = "block";
            this.initEvent();
        },
        showNoCity: function () {
            var noCity = document.getElementById("divNoCity");
            noCity.style.display = "block";
        },
        hideNoCity: function () {
            var noCity = document.getElementById("divNoCity");
            noCity.style.display = "none";
        },
        stopDefaultEvent: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                //IE中阻止函数器默认动作的方式
                window.event.returnValue = false;
            }
            return false;
        },
        //事件
        addEvent: function (element, type, fn) {
            if (document.addEventListener) {
                element.addEventListener(type, fn, false);
            } else if (document.attachEvent) {
                element.attachEvent('on' + type, fn);
            }
        },
        initEvent: function () {
            var that = this;
            var els = that.popup.getElementsByTagName("li");

            if (that.firstSelected) {
                if (els.length > 0) {
                    els[0].className = "On";
                    that.current = 0;
                }
            }

            var clearListStyle = function () {
                for (var i = 0; i < els.length; i++) {
                    els[i].className = "";
                }
            }

            var inputTextValue = function (key) {
                that.input.value = key;
            }

            that.input.onkeydown = function (event) {
                event = event || window.event;

                if (event.keyCode == 40) {
                    clearListStyle();
                    //Down
                    that.current++;
                    if (that.current >= els.length) {
                        that.current = -1;
                        inputTextValue(that.defaultValue)
                    } else {
                        els[that.current].className = "On";
                        inputTextValue(els[that.current].title.toString())
                    }


                    that.stopDefaultEvent(event);

                } else if (event.keyCode == 38) {
                    //UP
                    clearListStyle();
                    that.current--;
                    if (that.current <= -1) {
                        that.current = els.length;
                        inputTextValue(that.defaultValue)
                    } else {
                        els[that.current].className = "On";
                        inputTextValue(els[that.current].title.toString())
                    }
                } else if (event.keyCode == 13) {
                    //Enter
                    if (that.current > -1 && that.current < els.length) {
                        inputTextValue(els[that.current].title.toString());
                    }
                    that.popup.style.display = "none";
                    that.current = -1;
                    that.finshFun();
                }
            }

            for (var i = 0; i < els.length; i++) {
                els[i].onmouseover = function (event) {
                    clearListStyle();
                    this.className = "On";
                    that.current = this.index;
                }
                els[i].onclick = function (event) {
                    that.current = -1;
                    inputTextValue(this.title.toString());
                    that.popup.style.display = "none";

                    if (that.input.id == "txtCity") {
                        if (typeof (o) != "undefined") { o.params['ct'].value = '2'; }
                        if ($("#ct").length > 0) { $("#ct").val("2"); }
                        if (cityHashMap._size > 0) {
                            $('#txtCity').trigger('blur');
                        }
                    }
                    else {
                        if (typeof (o) != "undefined") { o.params['kt'].value = '2'; }
                        if ($("#kt").length > 0) { $("#kt").val("2"); }
                    }
                }
            }
        }
    }
    Youtx.AutoComplete.prototype.constructor = Youtx.AutoComplete;


    /*
    HashMap
    */
    Youtx.HashMap = function () {
        //大小
        this._size = 0;
        //对象
        this._entry = new Object();
    }
    Youtx.HashMap.prototype = {
        //添加
        add: function (key, value) {
            if (!this.containsKey(key)) {
                this._size++;
            }
            this._entry[key] = value;
        },
        //获取
        get: function (key) {
            return this.containsKey(key) ? this._entry[key] : null;
        },
        //移除
        remove: function (key) {
            if (this.containsKey(key) && (delete this._entry[key])) {
                this._size--;
            }
        },
        //通过key查看是否已经存在
        containsKey: function (key) {
            return (key in this._entry);
        },
        //查看是否还有该值
        containsValue: function (value) {
            for (var prop in this._entry) {
                if (this._entry[prop] == value) {
                    return true;
                }
            }
            return false;
        },
        //大小
        size: function () {
            return this._size;
        },
        //清空
        clear: function () {
            this._size = 0;
            this._entry = new Object();
        },
        //取得所有值
        values: function () {
            var values = new Array();
            for (var prop in this._entry) {
                values.push(this._entry[prop]);
            }
            return values;
        }
    }
    Youtx.HashMap.prototype.constructor = Youtx.HashMap;

    Youtx.Input = {
        initialize: function (input) {
            var type = input.getAttribute('type').toLowerCase();
            if (type == 'integer') {
                input.style.imeMode = 'disabled';
                input.onkeydown = function (ev) {
                    ev = ev || window.event;
                    //debugger;
                    return Youtx.Input.Key.IsEdit(ev) || Youtx.Input.Key.IsNumber(ev);
                }
                input.onblur = function () {
                    while (input.value.indexOf('0') == 0 && input.value.length > 1) {
                        input.value = input.value.substring(1);
                    }
                    if (!/^[0-9]+$/i.test(input.value)) { input.value = input.defaultValue; }
                }
            }
        }
    }
    Youtx.Input.Key = {
        IsSelect: function (ev) {
            if (ev.shiftKey || (ev.ctrlKey && ev.shiftKey)) {
                return (ev.keyCode >= 35 && ev.keyCode <= 40);
            }
            else if (ev.ctrlKey && !ev.shiftKey) {
                return ev.keyCode == 65;
            }
            else {
                return false;
            }
        },
        IsMove: function (ev) {
            return (ev.keyCode >= 35 && ev.keyCode <= 40);
        },
        IsDelete: function (ev) {
            if (ev.ctrlKey) {
                return ev.keyCode == 8;
            }
            else if (ev.shiftKey) {
                return ev.keyCode == 46;
            }
            else {
                return ev.keyCode == 8 || ev.keyCode == 45 || ev.keyCode == 46;
            }
        },
        IsEdit: function (ev) {
            return Input.Key.IsSelect(ev) || Input.Key.IsMove(ev) || Input.Key.IsDelete(ev) || ev.keyCode == 9 || ev.keyCode == 13;
        },
        IsNumber: function (ev) {
            return !ev.shiftKey && ((ev.keyCode >= 48 && ev.keyCode <= 57) || (ev.keyCode >= 96 && ev.keyCode <= 105));
        }
    }

    window.Youtx = Youtx;
    window.Youtx.Utility = Youtx.Utility;
})();

//城市Hash表
var cityHashMap = new Youtx.HashMap();