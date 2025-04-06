const { runtime, storage } = chrome;

document.getElementById("toggle").addEventListener("click", async (e) => {
  const checked = e.target.checked;
  console.log(checked);
  await storage.local.set({ reload: checked });
});

init();

async function init() {
  const { reload } = await storage.local.get("reload");
  const check = document.getElementById("toggle");
  check.checked = reload;
}
