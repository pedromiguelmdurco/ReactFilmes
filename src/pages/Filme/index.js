import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';

function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                    
                }
            })//if caso ache o filme
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate("/", {replace: true});
                return;
            })


        }
        
        loadFilme();



        return() =>{
            console.log("Componente desmontado")
        }
    }, [navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Filme já está na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo");

    }

    if(loading){//colocando um carregando na tela para n ficar vazia caso a api demore para ser lida
        return(
            <div className='filme-info'>
                <h1>Carregando Filme...</h1>
            </div>
        )
    }
   
    return(
        <div className='filme-info'>
            
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10 </strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
            
        </div>
    );
}


export default Filme;