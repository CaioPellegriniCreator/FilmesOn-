const urls = [
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=18&page=1',      // Drama
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=35&page=1',      // Comédia
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=10759&page=1',   // Ação & Aventura
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=10765&page=1',   // Ficção Científica & Fantasia
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=16&page=1',      // Animação / Anime
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=9648&page=1',    // Mistério / Suspense
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=10751&page=1',   // Família
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=99&page=1' ,      // Documentário
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=16&with_origin_country=JP&page=1', //Animes
  'https://api.themoviedb.org/3/discover/tv?language=pt-BR&with_genres=10759&page=1' //Videogame


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
  .then(([drama, videogame, comedy, action, cientific, anime, mystery, family, documentary, anim]) => {
      const series = [
      ...(videogame.results || []),
      ...(drama.results || []),
      ...(comedy.results || []),
      ...(action.results || []),
      ...(cientific.results || []),
      ...(anime.results || []),
      ...(mystery.results || []),
      ...(family.results || []),
      ...(documentary.results || []),
      ...(anim.results || []),
];


    const container = document.getElementById("container-filmes");

    series.forEach(serie => {
      const cartaz = document.createElement("div");
      cartaz.classList.add("cartaz");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${serie.backdrop_path || serie.poster_path}`;
      img.alt = serie.title || serie.name;

      const titulo = document.createElement("h1");
      titulo.innerText = serie.title || serie.name;

      cartaz.addEventListener('click', () => {
        fetch(`https://api.themoviedb.org/3/tv/${serie.id}?language=pt-BR`, options)
          .then(res => res.json())
          .then(detalhes => {
            const tituloDetalhes = detalhes.title || detalhes.name;
            const descricao = `Sinopse:  ${detalhes.overview}` || "Não disponível";
            const imagem = `https://image.tmdb.org/t/p/w500${detalhes.backdrop_path || detalhes.poster_path}`;
            const temporadas = `Temporadas:  ${detalhes.number_of_seasons}` || "Não disponível";
            const generos = detalhes.genres ? detalhes.genres.map(g => g.name).join(", ") : "Gêneros não disponíveis";
            const votos = detalhes.vote_average ? `⭐ ${detalhes.vote_average.toFixed(1)}` : "Sem votos";



            abrirModalCompleto(tituloDetalhes, descricao, imagem, temporadas, generos, votos);
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

function abrirModalCompleto(titulo, descricao, imagem, temporadas, generos, votos) {
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-descricao").textContent = descricao;
  document.getElementById("modal-img").src = imagem;
  document.getElementById("modal-temporadas").textContent = temporadas;
  document.getElementById("modal-genero").textContent = generos;
  document.getElementById("modal-votos").textContent = votos;
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}