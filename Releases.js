const urls = [
    'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1', //Filmes Lançamentos
    'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1'

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
  .then(([releasesMovies, upcomingMovies]) => {
      const filmes = [
      ...(releasesMovies.results || []),
      ...(upcomingMovies.results || [])
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