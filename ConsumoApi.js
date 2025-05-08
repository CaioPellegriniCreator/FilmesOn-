const url = 'https://api.themoviedb.org/3/movie/popular';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU5MWZlOTMyMjNlNDczYzczMWQxMTY3YTI5YmE5MSIsIm5iZiI6MTc0NTk3NjgwMS45NjIsInN1YiI6IjY4MTE3ZGUxZmU4OTUyOWQyZjA1NGQ4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.16qNO81RSJSB-ejf5hUb3dw7jzGEc1O73BFXojs7MJ8';  // O token fornecido

fetch(url, {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`  // Aqui está o Bearer Token no cabeçalho
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Aqui os dados da API vão aparecer no console
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });
