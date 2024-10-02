/* inicia o processo de busca de um recurso da rede, retornando uma promessa que é cumprida assim que a resposta estiver disponível. */
const api = fetch('http://localhost:3000/videos')
//.json() transforma a response em um json (array)
.then((res) => console.log(res.json()));
