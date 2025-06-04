const urls = [
    'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=27&page=1',  // Filmes de Terror
  'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1',              // Populares
  'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1',             // Cinema (em breve)
  'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1',            // Mais bem avaliadas
  'https://api.themoviedb.org/3/account/21980634/watchlist/movies?language=pt-BR&page=1&sort_by=created_at.asc', // Watchlist da conta
  'https://api.themoviedb.org/3/collection/1241?language=pt-BR',                   // Harry Potter
  'https://api.themoviedb.org/3/collection/230532?language=pt-BR',                 // Marley e eu
  'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', // Séries populares
  'https://api.themoviedb.org/3/collection/173710?language=pt-BR',                 // Homem-Aranha
  'https://api.themoviedb.org/3/collection/86311?language=pt-BR',                  // Vingadores
  'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',          // Filmes em cartaz (cinemas)
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=28&page=1',  // Filmes de Ação
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=35&page=1',  // Filmes de Comédia
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=18&page=1',  // Filmes de Drama
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=10749&page=1', // Filmes de Romance
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=878&page=1',  // Filmes de Ficção Científica
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=16&page=1',   // Filmes de Animação
  'https://api.themoviedb.org/3/discover/movie?language=pt-BR&with_genres=99&page=1',   // Filmes de Documentário
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
  .then(([popularMovies, upcomingMovies, topRatedMovies,
  watchlist, harryPotter, marley, popularSeries,spiderman, avengers, nowPlayingMovies, actionMovies, comedyMovies, 
  dramaMovies,horrorMovies,romanceMovies,sciFiMovies, animationMovies, documentaryMovies]) => {
      const filmes = [
    ...(popularMovies.results || []),
    ...(upcomingMovies.results || []),
    ...(topRatedMovies.results || []),
    ...(watchlist.results || []),
    ...(harryPotter.parts || []),
    ...(marley.parts || []),
    ...(popularSeries.results || []),
    ...(spiderman.parts || []),
    ...(avengers.parts || []),
    ...(nowPlayingMovies.results || []),
    ...(actionMovies.results || []),
    ...(comedyMovies.results || []),
    ...(dramaMovies.results || []),
    ...(horrorMovies.results || []),
    ...(romanceMovies.results || []),
    ...(sciFiMovies.results || []),
    ...(animationMovies.results || []),
    ...(documentaryMovies.results || [])
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

      cartaz.addEventListener('click', () => {
        fetch(`https://api.themoviedb.org/3/movie/${filme.id}?language=pt-BR`, options)
          .then(res => res.json())
          .then(detalhes => {
            const tituloDetalhes = detalhes.title || detalhes.name;
            const descricao = `Sinopse: ${detalhes.overview}`;
            const imagem = `https://image.tmdb.org/t/p/w500${detalhes.backdrop_path || detalhes.poster_path}`;
            const duracao = detalhes.runtime ? `${detalhes.runtime} min` : "Duração não disponível";
            const generos = detalhes.genres ? detalhes.genres.map(g => g.name).join(", ") : "Gêneros não disponíveis";
            const votos = detalhes.vote_average ? `⭐ ${detalhes.vote_average.toFixed(1)}` : "Sem votos";



            abrirModalCompleto(tituloDetalhes, descricao, imagem, duracao, generos, votos);
          })
          .catch(err => {
            console.error('Erro ao buscar detalhes do filme:', err);
          });
      });

      cartaz.appendChild(img);
      cartaz.appendChild(titulo);
      container.appendChild(cartaz);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar os dados:', error);
  });

function abrirModalCompleto(titulo, descricao, imagem, duracao, generos, votos) {
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-descricao").textContent = descricao;
  document.getElementById("modal-img").src = imagem;
  document.getElementById("modal-duracao").textContent = duracao;
  document.getElementById("modal-genero").textContent = generos;
  document.getElementById("modal-votos").textContent = votos;
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}