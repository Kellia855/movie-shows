function searchShows() {
  const query = document.getElementById('search-input').value;
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = 'Loading...';

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = '';
      data.forEach(item => {
        const show = item.show;
        if (!show) return;
        const score = item.score.toFixed(2);
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <img src="${show.image ? show.image.medium : 'notFound.avif'}" alt="${show.name}">
          <div class="card-body">
            <h2>${show.name}</h2>
            <p><strong>Type:</strong> ${show.type}</p>
            <p><strong>Language:</strong> ${show.language}</p>
            <p><strong>Premiered:</strong> ${show.premiered || 'N/A'}</p>
            <p><strong>Score:</strong> ${score}</p>
          </div>
        `;

        resultsContainer.appendChild(card);
      });

      if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No TV shows found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    });
}