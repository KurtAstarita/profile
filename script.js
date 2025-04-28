  function loadBloggerFeed(feedUrl, containerId, numPosts = 3) {
    fetch(feedUrl)
      .then(response => response.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        const feedContainer = document.getElementById(containerId);

        if (!feedContainer) {
          console.error(`Container with ID '${containerId}' not found.`);
          return;
        }

        if (items.length === 0) {
          feedContainer.innerHTML = '<p>No recent posts found.</p>';
          return;
        }

        let feedHTML = '<h3>Recent Blog Posts</h3><ul>';
        for (let i = 0; i < Math.min(numPosts, items.length); i++) {
          const item = items[i];
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const pubDate = new Date(item.querySelector('pubDate').textContent).toLocaleDateString();
          // You can extract a summary or content snippet if needed

          feedHTML += `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a> <span class="post-date">(${pubDate})</span></li>`;
        }
        feedHTML += '</ul>';
        feedContainer.innerHTML = feedHTML;
      })
      .catch(error => {
        console.error('Error fetching Blogger feed:', error);
        const feedContainer = document.getElementById(containerId);
        if (feedContainer) {
          feedContainer.innerHTML = '<p>Failed to load recent blog posts.</p>';
        }
      });
  }

  // Call the function to load the feed when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadBloggerFeed('https://feeds.feedburner.com/post40gains/feed', 'blogger-feed-container');
  });
