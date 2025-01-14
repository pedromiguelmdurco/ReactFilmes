import {useEffect, useState} from 'react';
import api from '../../services/api'
import {Link} from 'react-router-dom';
import './home.css';

//URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{//toda vez q o usuario abrir a aplicação ele ira ler a api

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmes(response.data.results.slice(0, 10))//colocando na state do 0 a 10

        }

        loadFilmes();
        setLoading(false);
    });


    if(loading){//colocando um carregando na tela para n ficar vazia caso a api demore para ser lida
        return(
            <div className='loading'>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return(
        <div className='container'>

            <div className='lista-filmes'>

                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}

            </div>

        </div>
    );
}


export default Home;