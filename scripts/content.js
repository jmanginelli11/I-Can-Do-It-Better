function filterAvailableClasses(articles) {
  if (articles.length == 0) {
    return;
  }

  articles.forEach((article) => {
    const hasJoinWaitlistLink = Array.from(article.querySelectorAll("a")).some(
      (a) => a.textContent.trim() === "Join Waitlist"
    );

    if (hasJoinWaitlistLink) {
      article.remove();
    }
  });

  const badge = document.createElement("h2");
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `🐒 Filtered Available Classes`;

  // Insert the badge after the h1 on the page
  const heading = document.querySelector("h1");
  heading.insertAdjacentElement("afterend", badge);
}

filterAvailableClasses(document.querySelectorAll("article"));

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If a new article was added.
    for (const node of mutation.addedNodes) {
      let articles = [];
      articles.push(node);
      // Render the reading time for this particular article.
      filterAvailableClasses(articles);
    }
  }
});

// https://developer.chrome.com/ is a SPA (Single Page Application) so can
// update the address bar and render new content without reloading. Our content
// script won't be reinjected when this happens, so we need to watch for
// changes to the content.
observer.observe(document.querySelector("article"), {
  childList: true,
});
