document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.querySelector('button');
  const searchInput = document.querySelector('input[type="text"]');

  // If resultsContainer doesn't exist, create it
  let resultsContainer = document.getElementById('results');
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    resultsContainer.style.marginTop = '2rem';
    document.body.appendChild(resultsContainer);
  }

  searchButton.addEventListener('click', movieSearch);

  // Pressing Enter in the textbox simulates clicking clicking "Search" button
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchButton.click();
    }
  });

  // movieSearch fucntionality to search OMDB API using title or IMDb ID
  // Displays spinner while loading data then builds table of all data returned from the API
  async function movieSearch() {  // Function to search for movies using the OMDB API - nonblocking
    const query = encodeURIComponent(searchInput.value.trim());
    if (!query) return;

    // Get selected search type (title or IMDB ID)
    const searchType = document.querySelector('input[name="searchType"]:checked').value;

    const apiKey = 'fd800a8f';  // OMDB API key
    let url = '';

    if (searchType === 'title') {
      url = `http://www.omdbapi.com/?t=${query}&apikey=${apiKey}`;
    } else if (searchType === 'imdbID') {
      url = `http://www.omdbapi.com/?i=${query}&apikey=${apiKey}`;
    }

    // Display loading spinner for slow network loading
    resultsContainer.innerHTML = `<div style="text-align:center;"><span class="spinner" style="display:inline-block;width:32px;height:32px;border:4px solid #FFD700;border-top:4px solid #001f3f;border-radius:50%;animation:spin 1s linear infinite;"></span></div>
    <style>
      @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Clear spinner for slow network loading
      resultsContainer.innerHTML = '';

      if (data.Response === "False") {
        resultsContainer.innerHTML = `<div style="color:#FFD700;text-align:center;font-weight:bold;">Movie not found!</div>`;
        return;
      }

      // If poster exists, display it above the table
      let posterHtml = '';
      if (data.Poster && data.Poster !== "N/A") {
        posterHtml = `<div style="text-align:center;margin-bottom:1rem;">
          <img src="${data.Poster}" alt="Movie Poster" style="max-width:200px;box-shadow:0 0 10px #FFD700;border:4px solid #FFD700;border-radius:8px;background:#001f3f;">
        </div>`;
      }

      // Build table of all data
      let table = `<table style="margin:auto;border-collapse:collapse;background:#001f3f;color:#FFD700;">
        <tbody>`;
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if (key === "Response" || key === "Poster") continue; // Hide the "Response" and "Poster" rows
          let value = data[key];
          if (Array.isArray(value)) {  // If value is an array, format it
            value = value.map(r => `${r.Source}: ${r.Value}`).join('<br>');
          }
          table += `<tr>
            <td style="border:1px solid #FFD700;padding:8px;font-weight:bold;">${key}</td>
            <td style="border:1px solid #FFD700;padding:8px;">${value}</td>
          </tr>`;
        }
      }
      table += `</tbody></table>`;
      resultsContainer.innerHTML = posterHtml + table;
    } catch (error) {
      resultsContainer.innerHTML = `<div style="color:#FFD700;text-align:center;font-weight:bold;">IMDb ID not found!</div>`;
      console.error('Error fetching data: IMDb ID does not exist', error);
    }
  }
});