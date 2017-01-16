(function ($) {


    // to track if the mouse button is pressed
    var isMouseDown = false;

    // to track the current element being dragged
    var currentElement = null;

    // callback holders
    var dropCallbacks = {};
    var dragCallbacks = {};

    // bubbling status
    var bubblings = {};

    // global position records
    var lastMouseX;
    var lastMouseY;
    var lastElemTop;
    var lastElemLeft;

    // track element dragStatus
    var dragStatus = {};

    // if user is holding any handle or not
    var holdingHandler = false;

    // returns the mouse (cursor) current position
    $.getMousePosition = function (e) {
        var posx = 0;
        var posy = 0;

        e = e || window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.documentElement.scrollLeft; +document.body.scrollLeft;
            posy = e.clientY + document.documentElement.scrollTop; +document.body.scrollTop;

        }
        return { 'x': posx, 'y': posy };
    };

    // updates the position of the current element being dragged
    $.updatePosition = function (e) {
        var pos = $.getMousePosition(e);

        var spanX = (pos.x - lastMouseX);
        var spanY = (pos.y - lastMouseY);
        var btm=$(window).height() - (lastElemTop + spanY);
        var lft = (lastElemLeft + spanX);
        $(currentElement).css("bottom", btm);
        $(currentElement).css("left", lft);
        WebIM.JieMian.SetCookie("youtx_bottomleft", ""+btm+","+lft+"");
        //$(currentElement).html(currentElement.id + "," + pos.x + "," + pos.y);

        // eval(document.documentElement.scrollTop + document.documentElement.clientHeight - this.offsetHeight - (parseInt(this.currentStyle.marginTop, 10) || 0) - (parseInt(this.currentStyle.marginBottom, 10) || 0))
    };

    // when the mouse is moved while the mouse button is pressed
    $(document).mousemove(function (e) {

        if (isMouseDown && dragStatus[currentElement.id] != 'false') {
            // update the position and call the registered function
            $.updatePosition(e);
            if (dragCallbacks[currentElement.id] != undefined) {
                dragCallbacks[currentElement.id](e, currentElement);
            }

            return false;
        }
    });

    // when the mouse button is released
    $(document).mouseup(function (e) {

        if (isMouseDown && dragStatus[currentElement.id] != 'false') {
            isMouseDown = false;
            if (dropCallbacks[currentElement.id] != undefined) {
                dropCallbacks[currentElement.id](e, currentElement);
            }

            return false;
        }
    });

    // register the function to be called while an element is being dragged
    $.fn.ondrag = function (callback) {
        return this.each(function () {
            dragCallbacks[this.id] = callback;
        });
    };

    // register the function to be called when an element is dropped
    $.fn.ondrop = function (callback) {
        return this.each(function () {
            dropCallbacks[this.id] = callback;
        });
    };

    // disable the dragging feature for the element
    $.fn.dragOff = function () {
        return this.each(function () {
            dragStatus[this.id] = 'off';
        });
    };

    // enable the dragging feature for the element
    $.fn.dragOn = function () {
        return this.each(function () {
            dragStatus[this.id] = 'on';
        });
    };

    // set a child element as a handler
    $.fn.setHandler = function (handlerId) {
        return this.each(function () {
            var draggable = this;

            // enable event bubbling so the user can reach the handle
            bubblings[this.id] = true;

            // reset cursor style
            $(draggable).css("cursor", "");

            // set current drag status
            dragStatus[draggable.id] = "handler";

            // change handle cursor type
            $("#" + handlerId).css("cursor", "move");

            // bind event handler
            $("#" + handlerId).mousedown(function (e) {
                holdingHandler = true;
                $(draggable).trigger('mousedown', e);
            });

            // bind event handler
            $("#" + handlerId).mouseup(function (e) {
                holdingHandler = false;
            });
        });
    }

    // set an element as draggable - allowBubbling enables/disables event bubbling
    $.fn.easydrag = function (allowBubbling) {

        return this.each(function () {

            // if no id is defined assign a unique one
            if (undefined == this.id || !this.id.length) this.id = "easydrag" + (new Date().getTime());

            // save event bubbling status
            bubblings[this.id] = allowBubbling ? true : false;

            // set dragStatus 
            dragStatus[this.id] = "on";

            // change the mouse pointer
            $(this).css("cursor", "move");

            // when an element receives a mouse press
            $(this).mousedown(function (e) {
                //                $("#TalkBox_Youtx_ID").css("position", "absolute");
                //                $("#TalkBox_Youtx_ID_s").css("position", "absolute");
                // just when "on" or "handler"
                if ((dragStatus[this.id] == "off") || (dragStatus[this.id] == "handler" && !holdingHandler))
                    return bubblings[this.id];

                // set it as absolute positioned
                //$(this).css("position", "absolute");

                // set z-index
                $(this).css("z-index", 10000);
                // update track variables
                isMouseDown = true;
                currentElement = this;

                // retrieve positioning properties
                var pos = $.getMousePosition(e);
                lastMouseX = pos.x;
                lastMouseY = pos.y;

                lastElemTop = this.offsetTop;
                lastElemLeft = this.offsetLeft;
                // alert(this.offsetTop);

                $.updatePosition(e);

                return bubblings[this.id];
            });
        });
    };


})(jQuery);