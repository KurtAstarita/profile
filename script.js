function handleBloggerFeed(data) {
  const posts = data.items.map(item => ({
    title: item.title,
    content: (item.description || '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'), // Replace &nbsp; and &amp;
    url: item.link,
    date: new Date(item.pubDate).toLocaleDateString()
  }));

  let html = '<ul>';
  posts.forEach(post => {
    html += `
      <li>
        <a href="${post.url}">${post.title}</a>
        <p>${post.content.substring(0, 100)}...</p>
        <p>Published: ${post.date}</p>
      </li>
    `;
  });
  html += '</ul>';

  document.getElementById('blogger-feed').innerHTML = html;
}

// Updated feed URL for rss2json
const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fpost40gains.kurtastarita.com%2Ffeeds%2Fposts%2Fdefault';

fetch(feedUrl)
  .then(response => response.json())
  .then(data => handleBloggerFeed(data))
  .catch(error => console.error('Error fetching or parsing feed:', error));
