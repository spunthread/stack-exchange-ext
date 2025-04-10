const { runtime, storage } = chrome;

document.getElementById("toggle").addEventListener("click", async (e) => {
  const checked = e.target.checked;
  console.log(checked);
  await storage.local.set({ reload: checked });
});

document.getElementById("time").addEventListener("input", async (e) => {
  const value = e.target.value;
  console.log(value);
  document.getElementById("dsp").innerHTML = value;
  await storage.local.set({ tsms: +value });
});

init();

async function init() {
  const { reload, tsms } = await storage.local.get(["reload", "tsms"]);
  const check = document.getElementById("toggle");
  check.checked = reload;
  const rangeInput = document.getElementById("time");
  const rangeDisplay = document.getElementById("dsp");
  rangeDisplay.innerHTML = rangeInput.value = tsms;
}
