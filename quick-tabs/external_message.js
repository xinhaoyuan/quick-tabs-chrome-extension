chrome.extension.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if(request.call == "show-up") {
            chrome.windows.getLastFocused(function (win) {
                function popup_params(width, height) {
                    var screenX = win.left;
                    var screenY = win.top;
                    var winWidth = win.width;
                    var winHeight = win.height;
                    var h = (screenX < 0) ? win.screen.width + screenX : screenX;
                    var left = parseInt(h + ((winWidth - width) / 2), 10);
                    var top = parseInt(screenY + ((winHeight - height) / 2.5), 10);
                    var ret = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',scrollbars=1,location=1,toolbar=1';
                    return ret;
                }
                lastWindow = null;
                var url = chrome.extension.getURL('popup.html');
                window.open(url, "Quick Tabs", popup_params(350, 550));
            });
            sendResponse({success:true});
        } else {
            sendResponse({});
        }
    });
