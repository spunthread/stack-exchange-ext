console.log("Content Script Injected");

new MutationObserver((_, observer) => {
  const el = document.querySelector('div[role="dialog"] a[href="#"]');
  if (el) {
    el.click();
    observer.disconnect();
  }
}).observe(document.body, {
  childList: true,
  subtree: true,
});
