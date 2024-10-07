const containerVideos = document.querySelector('.videos__container');

/* inicia o processo de busca de um recurso da rede, retornando uma promessa que é cumprida assim que a resposta estiver disponível. */
const api = fetch('http://localhost:3000/videos')
    //.json() transforma a response em um json
    .then((res) => res.json())
    .then((videos) => {
        //para cada video que virá como resposta do JSON
        //será passado esse video em específico como parâmetro na arrow function
        videos.forEach((video) => {
            containerVideos.innerHTML += `<li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem} alt="logo canal"">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>` /* IFRAME incorpora outra página HTML para a pag atual */;
        });
    })
    .catch((error) => {
        containerVideos.innerHTML = `
    <p>Error ao Carregar videos: ${error}</p>`;
    });
