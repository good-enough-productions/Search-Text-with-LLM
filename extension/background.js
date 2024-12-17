// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchWithGPT",
    title: "Search with GPT",
    contexts: ["selection"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchWithGPT") {
    // Send selected text to popup
    chrome.runtime.sendMessage({
      type: 'SELECTION',
      text: info.selectionText,
      url: tab.url
    });
    
    // Open popup
    chrome.windows.create({
      url: chrome.runtime.getURL('popup/popup.html'),
      type: 'popup',
      width: 400,
      height: 300
    });
  }
});