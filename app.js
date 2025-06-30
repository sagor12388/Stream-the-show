const db = firebase.firestore();
const movieList = document.getElementById("movie-list");

function loadMovies() {
  movieList.innerHTML = "";
  db.collection("movies").get().then(snapshot => {
    snapshot.forEach(doc => {
      const movie = doc.data();
      const div = document.createElement("div");
      div.className = "movie";
      div.innerHTML = `
        <img src="${movie.thumb}" alt="${movie.title}" />
        <div class="title">${movie.title} ${movie.premium ? '<span class="premium">⭐</span>' : ''}</div>
      `;
      div.onclick = () => openPlayer(movie.url, movie.type || "youtube");
      movieList.appendChild(div);
    });
  });
}

function openPlayer(url, type) {
  const modal = document.getElementById("player-modal");
  const iframe = document.getElementById("video-frame");
  const videoTag = document.getElementById("video-tag");

  if (type === "youtube") {
    iframe.src = url;
    iframe.classList.remove("hidden");
    videoTag.classList.add("hidden");
  } else {
    videoTag.src = url;
    videoTag.classList.remove("hidden");
    iframe.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

function closePlayer() {
  const iframe = document.getElementById("video-frame");
  const videoTag = document.getElementById("video-tag");

  iframe.src = "";
  videoTag.pause();
  videoTag.src = "";
  document.getElementById("player-modal").classList.add("hidden");
}

window.onload = () => {
  loadMovies();
};