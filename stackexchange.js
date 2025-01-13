console.log("Content Script Injected");

new MutationObserver(() => {
  const el = document.querySelector("#onetrust-consent-sdk");
  if (el) el.remove();
}).observe(document.body, {
  childList: true,
  subtree: true,
});
