import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokedexCard from './PokedexCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';



const Pokedex = () => {
    
    const userName = useSelector(state => state.userName)
    
    const[pokemons, setPokemons] = useState ([])
    const[pokemonName, setPokemonName] = useState("")
    const[pokemonTypes, setPokemonTypes] = useState([])
    
    const navigate = useNavigate()
    
    /*********Paginacion*********/
    const [page, setPage] = useState(1)
    const itemsPokemon = 12
    const lastIndex = page * itemsPokemon
    const firstIndex = lastIndex - itemsPokemon
    const pokemonPage = pokemons?.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(pokemons?.length/itemsPokemon)
    const pagesNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        if(i > page - 4 && i < page + 4){
            pagesNumbers.push(i);
        }
    }
    /*****************************/

    useEffect(()=>{
        axios
            .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
            .then(res => {
                //console.log(res.data.results)
                setPokemons(res.data.results)
            })

        // Peticion tipos de Pokemons, para consumir en los option del selectd 
        axios
            .get("https://pokeapi.co/api/v2/type")
            .then(res => {
                //console.log(res.data.results)
                setPokemonTypes(res.data.results)
            })

    },[])

    
    const submit = (e) =>{
        e.preventDefault();
        navigate(`/pokedex/${pokemonName}`)
    }
    
    const handelTypePokemon = (e) =>{
        console.log(e.target.value)
            axios
                .get(e.target.value)
                .then(res => {
                    //console.log(res.data.pokemon)
                    setPokemons(res.data.pokemon)
                })
    }


    return (
        <section id='pokemon'>
            
            <Link to='/'>
                <div className='btn-pokedex btn '>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
            </Link>

            <div className='pokedex-container-title'> 
                <div className='title-name'>
                    <h1>PokeDex</h1>
                    <p>Welcome {userName}, here you can find yuor favorite pokemon! </p>
                </div>

                <div className='input-pokedex'>
                    <div className='input-container'>
                        <select onChange={handelTypePokemon}>
                        
                        <option value={pokemons}>---</option>
                        {
                            pokemonTypes.map(pokemonType => (
                                <option 
                                    value={pokemonType.url} 
                                    key={pokemonType.url}
                                    >
                                    {pokemonType.name}
                                </option>
                            ))
                        }
                        </select>
                    </div>

                    <form  onSubmit={submit} className='input-container'>
                        <input 
                            type="text"
                            name='pokemon-name'
                            id='pokemonName'
                            placeholder='Name Pokemon'
                            value={pokemonName}
                            onChange={e => setPokemonName(e.target.value)} 
                        />
                        <button className='btn-search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </div>
           
            <div className='pokemon-container-card'>
                {
                   pokemonPage.map( pokemon => (
                        <PokedexCard 
                            pokemonUrl = {pokemon.url ? pokemon.url : pokemon.pokemon.url} 
                            key={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
                    ))
                }
            </div>

            <div className='btn-pages'>
                <button 
                    onClick={()=> setPage(page -1)}
                    disabled={page <= 1} 
                >
                    <i className="fa-solid fa-circle-arrow-left"></i>
                </button>

                {pagesNumbers.map(page =>(
                        <button 
                            key={page}
                            onClick={()=> setPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                <button 
                    onClick={()=> setPage(page +1)}
                    disabled={page >= totalPages}
                >
                    <i className="fa-solid fa-circle-arrow-right"></i>
                </button>
            </div>

        </section>
    );
};

export default Pokedex;