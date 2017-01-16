
(function () {
    var SearchFor = {
        //城市提示对象
        autoComplete: null,
        //关键字提示对象
        autoCompleteKeyword: null,
        //最后输入内容
        latestValue: null,
        lastestCityValue: '',
        //提示延迟
        tipsTimeout: null,
        cityDefaultValue: "您要去哪儿?",
        //关键字文本框默认值
        locationsDefaultValue: "可输入地址/商圈/地标等",
        init: function () {
            var that = this;
            cityHashMap.add($('#txtCity').val(), $('#path').val());
            // ShowHideLocationIcon();
            this.autoComplete = new Youtx.AutoComplete({
                inputId: "txtCity",
                parentId: "CitiesSuggestion",
                className: "Ytxcitybox",
                firseSelected: true,
                userIe6bug: true
            });

            $("#txtCity").keydown(function (event) {
                if (event.keyCode == 9) {
                    $("#HotCities").hide();
                    $("#txtLocation").focus();
                    that.autoComplete.hide();
                    return false;
                }
                if (event.keyCode != 13 && event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 9) {
                    window.clearTimeout(that.tipsTimeout);
                }
                if (typeof (o) != "undefined") { o.params["ct"].value = "3"; }
                if ($("#ct").length > 0) { $("#ct").val("3"); $("#kt").val("2"); }
            }).focus(function () {
                $("#enter_location_error_message").hide(); if ($.trim($("#txtCity").val()) == that.cityDefaultValue) { $("#txtCity").val(''); $(this).focus(); }
            }).blur(function () {
                if ($.trim($("#txtCity").val()) == "") { $("#txtCity").val(that.cityDefaultValue); }
            });
            $("#txtCity").keyup(function (event) {
                if (event.keyCode != 13 && event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 9) {
                    var value = $("#txtCity").val();
                    that.latestValue = value;
                    $("#HotCities").hide();
                    if ($.trim(value) != "") {
                        //$('#CitiesSuggestion').show();
                        that.showCityTips(value);
                        //                        that.tipsTimeout = window.setTimeout(function () {
                        //                            that.showCityTips(value);
                        //                        }, 200)
                    } else {
                        that.autoComplete.hideNoCity();
                        that.autoComplete.hide();
                    }
                    $(".search_guests").show();

                } else if (event.keyCode == 13) {
                    var path = cityHashMap.get($.trim($("#txtCity").val()));
                    if (path == null) {
                        path = '';
                    }

                    goUrl();
                }
            }).blur(function () {
                // if (that.lastestCityValue != $("#txtCity").val()) { that.showHotAreaTips(); }
                var path = cityHashMap.get($.trim($("#txtCity").val()));
                if (path == null) {
                    path = '';
                }
                $('#path').val(path);

            });
        },
        showCityTips: function (keyword) {
            var iskeyLetter = false; // Youtx.Utility.isLetter(keyword);
            var that = this;
            $.ajax({
                url: "/Ajax/SearchHandlerDefault2016.aspx?keyword=" + encodeURI(keyword) + "&top=5&languageid=1&categoryids=3,4,5,6,7&sortby=5",
                success: function (result) {
                    if (keyword == that.latestValue) {
                        cityHashMap.clear();
                        var obj = eval("(" + result + ")");

                        if (obj.locations != null && obj.locations.length > 0) {

                            var data = obj.locations;
                            var len = data.length;
                            for (var i = 0; i < len; i++) {
                                //if (data[i].pathRooms == 0) { data.splice(i, len - i); break; };
                                if ((data[i].pathRooms == 0) && (data[i].hotelCount == 0)) { data.splice(i, len - i); break; };
                                cityHashMap.add(data[i].displayPath, data[i].path);
                                data[i].aliasName = data[i].displayPath;
                            }
                            if (data != null && data.length > 0) {
                                that.autoComplete.show(data, iskeyLetter);
                                //that.autoComplete.hideNoCity();
                            } else {
                                //that.autoComplete.showNoCity();
                                $("#CitiesSuggestion").hide();
                                that.autoComplete.hide();
                            }
                            // $("#divNoCity").hide();
                        }
                        else {
                            //that.autoComplete.showNoCity();
                            $("#CitiesSuggestion").hide();
                            that.autoComplete.hide();
                            // $("#divNoCity").show();
                        }
                    }
                },
                error: function (err) {
                    debugger
                },
                dataType: "html"
            });
        }
    }

    Youtx.SearchFor = SearchFor;
})()