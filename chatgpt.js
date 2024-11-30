console.log("Content Script Injected");

function logChanges(_, observer) {
  const el = document.querySelector('div[role="dialog"] a[href="#"]');
  if (el) {
    el.click();
    observer.disconnect();
  }
}

const observerOptions = {
  childList: true,
  subtree: true,
};

const observer = new MutationObserver(logChanges);
observer.observe(document.body, observerOptions);
