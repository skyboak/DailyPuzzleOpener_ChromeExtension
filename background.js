chrome.storage.local.get("puzzleUrls", (data) => {
    const puzzleUrls = data.puzzleUrls || []; // Get stored URLs or use an empty array
  
    // Schedule daily opening at a specific time
    chrome.alarms.create("dailyOpen", {
      periodInMinutes: 24 * 60, // Every 24 hours
    });
  
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === "dailyOpen") {
        puzzleUrls.forEach((url) => {
          chrome.tabs.create({ url });
        });
      }
    });
  });
  