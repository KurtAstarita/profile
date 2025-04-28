let bloggerFeedContainerId; // Global variable for container ID
let bloggerFeedNumPosts; // Global variable for the number of posts

function loadBloggerFeed(feedUrl, containerId, numPosts = 3) {
  bloggerFeedContainerId = containerId; // Assign the containerId to the global variable
  const jsonpUrl = feedUrl + '?alt=json-in-script&callback=handleBloggerFeed';
  const script = document.createElement('script');
  script.src = jsonpUrl;
  script.async = true;

  script.onerror = function() {
    console.error('Failed to load Blogger feed (JSON-P).');
    const feedContainer = document.getElementById(bloggerFeedContainerId); // Use the global variable
    if (feedContainer) {
      feedContainer.innerHTML = '<p>Failed to load recent blog posts.</p>';
    }
  };

  document.head.appendChild(script);
}

window.handleBloggerFeed = function(data) {
  const feedContainer = document.getElementById(bloggerFeedContainerId);
  if (!feedContainer) {
    console.error(`Container with ID '${bloggerFeedContainerId}' not found.`);
    return;
  }

  if (!data || !data.feed || !data.feed.entry) {
    feedContainer.innerHTML = '<p>No recent posts found or invalid feed format.</p>';
    return;
  }

  let feedHTML = '<h3>Recent Blog Posts</h3><ul>';
  const entries = data.feed.entry;
  for (let i = 0; i < Math.min(bloggerFeedNumPosts, entries.length); i++) { // Changed 'numPosts' to 'bloggerFeedNumPosts'
    const entry = entries[i];
    const title = entry.title.$t;
    let link = '#';
    if (entry.link) {
      const alternateLink = entry.link.find(item => item.rel === 'alternate');
      if (alternateLink) {
        link = alternateLink.href;
      }
    }
    const published = new Date(entry.published.$t).toLocaleDateString();

    feedHTML += `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a> <span class="post-date">(${published})</span></li>`;
  }
  feedHTML += '</ul>';
  feedContainer.innerHTML = feedHTML;

  delete window.handleBloggerFeed;
};
