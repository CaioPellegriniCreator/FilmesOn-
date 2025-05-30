const urls = [
  'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1',
  'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1',
  'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1',
  'https://api.themoviedb.org/3/account/21980634/watchlist/movies?language=pt-BR&page=1&sort_by=created_at.asc',
  'https://api.themoviedb.org/3/collection/1241?language=pt-BR',
  'https://api.themoviedb.org/3/collection/230532?language=pt-BR',
  'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
  'https://api.themoviedb.org/3/collection/173710?language=pt-BR',
  'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
  'https://api.themoviedb.org/3/collection/86311?language=pt-BR'
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
.then(([popular, upcoming, topRated, watchlist, collection1241, collection230532, discover, collection173710, topRatedTV, collection86311]) => {
  const filmes = [
  ...(popular.results || []),
  ...(upcoming.results || []),
  ...(topRated.results || []),
  ...(watchlist.results || []),
  ...(collection1241.parts || []),
  ...(collection230532.parts || []),
  ...(discover.results || []),
  ...(collection173710.parts || []),
  ...(topRatedTV.results || []),
  ...(collection86311.parts || [])
];
    const container = document.getElementById("container-filmes");

    filmes.forEach(filme => {
      const cartaz = document.createElement("div");
      cartaz.classList.add("cartaz");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${filme.backdrop_path || filme.poster_path}`;
      img.alt = filme.title || filme.name;

      const titulo = document.createElement("h1");
      titulo.innerText = filme.title || filme.name;

      cartaz.appendChild(img);
      cartaz.appendChild(titulo);
      container.appendChild(cartaz);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });