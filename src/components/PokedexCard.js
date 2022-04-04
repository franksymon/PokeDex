import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const PokedexCard = ({pokemonUrl}) => {
 
    
    const [pokemon, setPokemon] = useState ({})
    
    useEffect(()=>{
        axios
            .get(pokemonUrl)
            .then(res => {
                //console.log(res.data)
                setPokemon(res.data)
            })
    },[pokemonUrl])
    
    
   //console.log(pokemonUrl)
    return (
            <article className='pokemon-card'>
                <Link to={`/pokedex/${pokemon.id}`}>
                    <div className='pokemon-card-bg-img'>
                        <img src={pokemon.sprites?.other["official-artwork"].front_default} alt="" />
                    </div>
                    <div className='pokemon-card-section'>
                        <h3>{pokemon.name}</h3>
                        <div className='pokemon-type'>
                            <p>
                                {pokemon.types?.[0].type.name} | {pokemon.types?.[1]?.type.name}
                            </p>
                            <small>Type</small>
                        </div>
                        <div className='pokemon-info'>
                            <div className='pokemon-statu'>
                                <small>HP</small>
                                <p>{pokemon.stats?.[0].base_stat}</p>
                            </div>
                            <div className='pokemon-statu'>
                                <small>Attack</small>
                                <p>{pokemon.stats?.[1].base_stat}</p>
                            </div>
                            <div className='pokemon-statu'>
                                <small>Defense</small>
                                <p>{pokemon.stats?.[2].base_stat}</p>
                            </div>
                            <div className='pokemon-statu'>
                                <small>Speed</small>
                                <p>{pokemon.stats?.[5].base_stat}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </article>
    );
};

export default PokedexCard;