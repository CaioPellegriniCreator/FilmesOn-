const url = 'https://api.themoviedb.org/3/movie/popular';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU5MWZlOTMyMjNlNDczYzczMWQxMTY3YTI5YmE5MSIsIm5iZiI6MTc0NTk3NjgwMS45NjIsInN1YiI6IjY4MTE3ZGUxZmU4OTUyOWQyZjA1NGQ4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.16qNO81RSJSB-ejf5hUb3dw7jzGEc1O73BFXojs7MJ8';  // O token fornecido

fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const filmes = data.results;
      const container = document.getElementById("container-filmes");

      filmes.map(filme => {
        const cartaz = document.createElement("div");
        cartaz.classList.add("cartaz");

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path}`;
        img.alt = filme.title;

        const titulo = document.createElement("h1");
        titulo.innerText = filme.title;

        cartaz.appendChild(img);
        cartaz.appendChild(titulo);
        container.appendChild(cartaz);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar os dados:', error);
    });