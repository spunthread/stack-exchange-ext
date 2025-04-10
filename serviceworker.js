const { runtime, storage, tabs } = chrome;

runtime.onInstalled.addListener(async () => await storage.local.set({ iid: 0, tsms: 3e3, reload: false }));
storage.local.onChanged.addListener(onStorageChanged);

async function onStorageChanged(changes) {
  // console.log("storage changed", changes);
  if (changes.reload) {
    if (changes.reload.newValue) {
      const { tsms = 2e3 } = await storage.local.get("tsms");
      const iid = setInterval(() => reloadCurrentPage(), tsms);
      await storage.local.set({ iid });
      // console.log("iid updated", iid);
    } else {
      const { iid } = await storage.local.get("iid");
      clearInterval(iid);
      // console.log("iid cleared", iid);
    }
  }
}

async function reloadCurrentPage() {
  const [activeTab] = await tabs.query({
    active: true,
    currentWindow: true,
  });

  // console.log(activeTab, activeTab?.id);

  if (activeTab && activeTab.id) {
    await tabs.reload(activeTab.id);
  } else {
    console.warn("No active tab found.");
  }
}
