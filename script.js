window.handleBloggerFeed = function(data) {
  const feedContainer = document.getElementById(containerId);
  if (!feedContainer) {
    console.error(`Container with ID '${containerId}' not found.`);
    return;
  }

  if (!data || !data.feed || !data.feed.entry) {
    feedContainer.innerHTML = '<p>No recent posts found or invalid feed format.</p>';
    return;
  }

  let feedHTML = '<h3>Recent Blog Posts</h3><ul>';
  const entries = data.feed.entry;
  for (let i = 0; i < Math.min(numPosts, entries.length); i++) {
    const entry = entries[i];
    const title = entry.title.$t;
    let link = '#';
    if (entry.link) {
      // Find the link with rel="alternate"
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

  // Clean up the callback function
  delete window.handleBloggerFeed;
};

  // Append the script tag to load the JSON-P data
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  loadBloggerFeed('https://post40gains.kurtastarita.com/feeds/posts/default', 'blogger-feed-container');
});
