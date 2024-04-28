// DOM element
const favoriteMoviesContainer = document.getElementById("favoriteMovies");

// Function to add movie to favorites
function addToFavorites(imdbID) {
  console.log("add to favorites");
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  if (!favoriteMovies.includes(imdbID)) {
    favoriteMovies.push(imdbID);
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    // Reload the page to reflect changes
    location.reload();
  }
}

// Function to display favorite movies
function displayFavoriteMovies() {
  favoriteMoviesContainer.innerHTML = "";
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  favoriteMovies.forEach(async (imdbID) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=8d7a6741`
    );
    const movieData = await response.json();

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
        <img src="${movieData.Poster}" alt="${movieData.Title}">
        <div>
          <h2>${movieData.Title}</h2>
          <p>Year: ${movieData.Year}</p>
          <button class="remove-btn" onclick="removeFromFavorites('${imdbID}')">Remove from Favorites</button>
        </div>
      `;
    favoriteMoviesContainer.appendChild(movieCard);
  });
}

// Function to remove movie from favorites
function removeFromFavorites(imdbID) {
  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  favoriteMovies = favoriteMovies.filter((id) => id !== imdbID);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  displayFavoriteMovies();
}

// Initial display of favorite movies
displayFavoriteMovies();
