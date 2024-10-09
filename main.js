const containerVideos = document.querySelector('.videos__container');
const barraPesquisa = document.querySelector('.pesquisar__input');
const botaoCategoria = document.querySelectorAll('.superior__item');

async function searchVideos() {
    try {
        /* inicia o processo de busca de um recurso da rede, retornando uma promessa que é cumprida assim que a resposta estiver disponível. */
        //await obriga a aguardar o retorno do fetch para continuar com a função assíncrona
        const search = await fetch('http://localhost:3000/videos');
        //.json() transforma a response em um json
        const videos = await search.json();

        //para cada video que virá como resposta do JSON
        //será passado esse video em específico como parâmetro na arrow function
        videos.forEach((video) => {
            containerVideos.innerHTML += `<li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem} alt="logo canal"">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
            </div>
        </li>` /* IFRAME incorpora outra página HTML para a pag atual */;
        });
    } catch (e) {
        alert('ERROR 404: Video not found');
        containerVideos.innerHTML = `${e}`;
    }
}

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => {
        filtrarCategoria(nomeCategoria);
    });
});

barraPesquisa.addEventListener('input', () => {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraPesquisa.value.toLowerCase();

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
});

function filtrarCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = filtro.toLowerCase();

    videos.forEach((video) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();
        video.style.display = valorFiltro != 'tudo' ? categoria.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

searchVideos();
