const urls = [
  'https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1', //Populares
  'https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1', //Mais bem avaliadas
  'https://api.themoviedb.org/3/tv/airing_today?language=pt-BR&page=1', // Indo ao ar hoje
  'https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&page=1', //Atualmente estão no ar
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=18&page=1', // Drama
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=10765&page=1', //Ficção Científica e fantasia
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=35&page=1', // Comédia
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=9648&page=1',// Terror
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=10751&page=1', //Familia
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=99&page=1', //Documentário
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=10759&page=1'//Ação

];

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU5MWZlOTMyMjNlNDczYzczMWQxMTY3YTI5YmE5MSIsIm5iZiI6MTc0NTk3NjgwMS45NjIsInN1YiI6IjY4MTE3ZGUxZmU4OTUyOWQyZjA1NGQ4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.16qNO81RSJSB-ejf5hUb3dw7jzGEc1O73BFXojs7MJ8';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
};


Promise.all(urls.map(url => fetch(url, options).then(res => res.json())))
.then(([popular, avaliations, air, the_air, tragedy, cientific, comedy, suspense, family, documentary, action]) => {
  const series = [
  ...(popular.results || []),
  ...(avaliations.results || []),
  ...(air.results || []),
  ...(the_air.results || []),
  ...(tragedy.results || []),
  ...(cientific.results || []),
  ...(comedy.results || []),
  ...(suspense.results || []),
  ...(family.results || []),
  ...(documentary.results || []),
  ...(action.results || [])

];
    const container = document.getElementById("container-series");

    series.forEach(serie => {
      const cartaz = document.createElement("div");
      cartaz.classList.add("cartaz");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${serie.backdrop_path || serie.poster_path}`;
      img.alt = serie.title || serie.name;

      const titulo = document.createElement("h1");
      titulo.innerText = serie.title || serie.name;

      cartaz.appendChild(img);
      cartaz.appendChild(titulo);
      container.appendChild(cartaz);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });
