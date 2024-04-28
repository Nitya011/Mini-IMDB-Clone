// DOM element
const movieDetailsContainer = document.getElementById("movieDetails");

// Function to fetch and display movie details
async function fetchAndDisplayMovieDetails(imdbID) {
  console.log("Fetching and displaying movie details...");
  console.log(imdbID);
  try {
    if (!imdbID) {
      console.error("IMDb ID not found in query parameter");
      return;
    }

    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=8d7a6741`
    );
    const movieData = await response.json();

    if (movieData.Response === "True") {
      displayMovieDetails(movieData);
    } else {
      console.error("Failed to fetch movie details");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to display movie details
function displayMovieDetails(movie) {
  movieDetailsContainer.innerHTML = `
      <div class="movie-details">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div>
          <h1>${movie.Title}</h1>
          <p><strong>Year:</strong> ${movie.Year}</p>
          <p><strong>Rated:</strong> ${movie.Rated}</p>
          <p><strong>Released:</strong> ${movie.Released}</p>
          <p><strong>Runtime:</strong> ${movie.Runtime}</p>
          <p><strong>Genre:</strong> ${movie.Genre}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
          <button class="favorite-btn" onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
        </div>
      </div>
    `;
}
