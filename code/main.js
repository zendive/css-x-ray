var app = {
    dispatchEnable: function (value) {
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0, I = tabs.length; i < I; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {
                    type: 'enable',
                    enable: value
                });
            }
        });
    }
};

var options = {
    enable: {
        get: function () {
            if (window.localStorage.hasOwnProperty('x-css-enable')) {
                return JSON.parse(window.localStorage.getItem('x-css-enable'));
            }
            else {
                return false;
            }
        },
        set: function (value) {
            var oldValue = window.localStorage.getItem('x-css-enable');
            window.localStorage.setItem('x-css-enable', value);
            if (oldValue !== value) {
                app.dispatchEnable(value);
            }
        }
    }
};

chrome.runtime.onMessage.addListener(function (e, sender) {
    if ('inject' === e.type) {
        chrome.tabs.sendMessage(sender.tab.id, {
            type: 'enable',
            enable: options.enable.get()
        });
    }
    if ('enable' === e.type) {
        options.enable.set(e.enable);
    }
});
