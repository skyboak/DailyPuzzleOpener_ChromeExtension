chrome.runtime.onInstalled.addListener(() => {
  // Code to run when the extension is installed (optional)
});

chrome.runtime.onStartup.addListener(() => {
  // Code to run when the browser is launched (optional)
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Code to handle messages sent from other parts of the extension
});

const openDefaultPuzzles = () => {
  // Logic to determine default puzzle URLs and store them in an array
  const defaultUrls = [
    "https://www.nytimes.com/games/wordle",
    "https://www.playdate.io/connections"
  ];
  
  // Open each predefined puzzle URL in a new tab
  defaultUrls.forEach(url => {
    chrome.tabs.create({ url });
  });
};
/*
chrome.storage.sync.get("defaultPuzzles", (data) => {
  const puzzles = data?.defaultPuzzles || DEFAULT_PUZZLES;
  puzzles.forEach((puzzle) => {
    if (puzzle.enabled) {
      chrome.tabs.create({ url: puzzle.url });
*/
// Check if today's date has changed
const isNewDay = () => {
  const today = new Date().toLocaleDateString();
  const lastCheck = chrome.storage.local.get('lastCheck');
  
  if (!lastCheck || lastCheck !== today) {
    chrome.storage.local.set('lastCheck', today);
    return true;
  }
  
  return false;
};

// Main logic
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openPuzzles") {
    openDefaultPuzzles();
  }
});

chrome.runtime.onStartup.addListener(() => {
  if (isNewDay()) {
    openDefaultPuzzles();
  }// Code to run when the browser is launched (optional)
});


