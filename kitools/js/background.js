// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-45609617-1']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// インストール時
chrome.storage.local.get(function(items){
  if (items.general === undefined){
    _gaq.push(['_trackPageview']);
    chrome.storage.local.set({'general': new Array(false, true, false)});
    chrome.tabs.create({url:'chrome-extension://' + chrome.runtime.id + '/options.html'});
  }
});

// ページアクションを表示
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf('http://portal10.mars.kanazawa-it.ac.jp/portal/student') == 0 ||
      tab.url.indexOf('https://ras.kanazawa-it.ac.jp/portal/,DanaInfo=portal10.mars.kanazawa-it.ac.jp+student') == 0) {
    chrome.storage.local.get(function(items){
      // ポータルの自動ログインが有効
      if (items.general[0]){
        chrome.pageAction.show(tabId);
      }
    });
  }
});
