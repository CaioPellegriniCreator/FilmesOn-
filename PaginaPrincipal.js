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
    const filme = filmes[0];
    document.getElementById("minecraft-imagem").innerHTML =
      `<img src="https://image.tmdb.org/t/p/w500${filme.backdrop_path}">`;
    document.getElementById("minecraft-titulo").innerHTML=
      `<h1>${filme.title}</h1>`;

    const filme2 = filmes[1];
    document.getElementById("final-imagem").innerHTML =
      `<img src="https://image.tmdb.org/t/p/w500${filme2.backdrop_path}">`;
    document.getElementById("final-titulo").innerHTML =
      `<h1>${filme2.title}</h1>`;

  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });