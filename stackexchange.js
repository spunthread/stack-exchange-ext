console.log("Content Script Injected");

new MutationObserver((_, observer) => {
  const el = document.querySelector("#onetrust-consent-sdk");
  if (el) {
    el.remove();
    observer.disconnect();
  }
}).observe(document.body, {
  childList: true,
  subtree: true,
});
