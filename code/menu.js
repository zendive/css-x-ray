var bg = chrome.extension.getBackgroundPage(),
    enable = bg.options.enable.get(),
    chkEnable = document.querySelector('#chkEnable');

chkEnable.checked = enable;

chkEnable.addEventListener('click', function () {
    chrome.runtime.sendMessage({
        type: 'enable',
        enable: chkEnable.checked
    });
});
