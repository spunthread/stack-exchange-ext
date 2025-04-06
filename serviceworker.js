const { runtime, storage, tabs } = chrome;

runtime.onInstalled.addListener(async () => {
  await storage.local.set({ iid: 0, reload: false });
  storage.local.onChanged.addListener(onStorageChanged);
});

async function onStorageChanged(changes) {
  // console.log("storage changed", changes);
  const { reload } = changes;
  if (reload.newValue) {
    const iid = setInterval(() => reloadCurrentPage(), 2e3);
    await storage.local.set({ iid });
  } else {
    const { iid } = await storage.local.get("iid");
    clearInterval(iid);
  }
}

async function reloadCurrentPage() {
  const [activeTab] = await tabs.query({
    active: true,
    currentWindow: true,
  });

  if (activeTab && activeTab.id) {
    tabs.reload(activeTab.id);
  } else {
    console.warn("No active tab found.");
  }
}
