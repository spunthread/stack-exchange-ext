console.log("Content Script Injected");

new MutationObserver(() => {
  const el1 = document.querySelector('div[role="dialog"] a[href="#"]');
  if (el1) el1.click();
  const el2 = document.querySelector('form[type="button"] div.absolute.bottom-full');
  if (el2) el2.remove();
}).observe(document.body, {
  childList: true,
  subtree: true,
});
