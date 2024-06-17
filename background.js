chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      const key = `jsFiles_${tabId}`;
      chrome.storage.local.remove(key, () => {
        console.log(`JavaScript files for tab ${tabId} cleared.`);
        chrome.action.setBadgeText({ text: '' }); 
      });
    }
  });
  