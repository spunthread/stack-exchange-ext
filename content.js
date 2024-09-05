console.log("Content Script Injected");

function logChanges(_, observer) {
  const el = document.querySelector("#onetrust-consent-sdk");

  if (el) {
    observer.disconnect();
    el?.remove();
  }
}

const observerOptions = {
  childList: true,
  subtree: true,
};

const observer = new MutationObserver(logChanges);
observer.observe(document.body, observerOptions);
