let currentTab: chrome.tabs.Tab;

export const getCurrentTab = async () => {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  if (currentTab !== tab && tab) {
    currentTab = tab;
    return tab;
  }
  return currentTab;
};
