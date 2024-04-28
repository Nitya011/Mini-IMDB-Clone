// DOM elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Event listener for search input
if (searchInput) {
  searchInput.addEventListener("input", debounce(searchMovies, 300));
}

// Function to debounce API requests
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Function to search movies
async function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    searchResults.innerHTML = "";
    return;
  }

  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=8d7a6741`
  );
  const data = await response.json();

  if (data.Response === "True") {
    displaySearchResults(data.Search);
  } else {
    searchResults.innerHTML = "<p>No results found</p>";
  }
}

// Function to display search results
function displaySearchResults(results) {
  searchResults.innerHTML = "";
  results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    // Wrap each movie card in a link to movie.html with IMDb ID as query parameter
    movieCard.innerHTML = `
        <a href="movie.html?id=${movie.imdbID}" onclick="fetchAndDisplayMovieDetails('${movie.imdbID}')">
          <img src="${movie.Poster}" alt="${movie.Title}">
        </a>
          <div>
            <a href="movie.html?id=${movie.imdbID}" onclick="fetchAndDisplayMovieDetails('${movie.imdbID}')">
                <h2>${movie.Title}</h2>
            </a>
            <p>Year: ${movie.Year}</p>
            <button class="favorite-btn" onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
          </div>
      `;
    searchResults.appendChild(movieCard);
  });
}
