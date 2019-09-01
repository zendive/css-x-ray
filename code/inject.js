var $body = document.querySelector('body');
if ($body) {
    chrome.runtime.sendMessage({type: 'inject'});
    chrome.runtime.onMessage.addListener(function (e) {
        if ('enable' === e.type) {
            $body.classList.toggle('x-ray', e.enable);
        }
    });    
}
