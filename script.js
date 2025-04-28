function handleBloggerFeed(data) {
  const posts = data.items.map(item => ({
    title: item.title,
    content: item.content_html || item.content_text || '', // Prefer HTML, fallback to text
    url: item.url,
    date: item.date_published // Assuming date is in a usable format
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

// Example fetch
const feedUrl = 'https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Fpost40gains.kurtastarita.com%2Ffeeds%2Fposts%2Fdefault';

fetch(feedUrl)
  .then(response => response.json())
  .then(data => handleBloggerFeed(data))
  .catch(error => console.error('Error fetching or parsing feed:', error));
