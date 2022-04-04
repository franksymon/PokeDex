import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PokedexInfo = () => {
    
    const {id} = useParams()
    const [pokemonInfo, setPokemonInfo] = useState({})
    const [movements, setmovements] = useState([])


    console.log(useParams)

    useEffect(()=>{
        axios   
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                //console.log(res.data)
                setPokemonInfo(res.data)
                setmovements(res.data.moves)
            }) 

    },[id])

    return (
        <section id='pokemon-info'>
            <Link to='/pokedex' >
                <div className='btn-info btn'>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
            </Link>
            <div className='img-pokemon-logo'>
                <img src= {"https://logos-marcas.com/wp-content/uploads/2020/05/Pokemon-Logo.png"} alt="logo" />
            </div>
            <article>
                <div className='pokemon-info-img'>
                    <img src={pokemonInfo.sprites?.other["official-artwork"].front_default} alt="pokemon" />
                </div>
                <div className='pokemon-info-status'>
                    <p># {pokemonInfo.id}</p>
                    <h2>{pokemonInfo.name}</h2>
                    <div>
                        <div>
                            <small>Weigth</small>
                            <p>{pokemonInfo.weight}</p>
                        </div>
                        <div>
                            <small>Height</small> 
                            <p>{pokemonInfo.height}</p>
                        </div>
                    </div>
                </div>
                <div className='container-pokemon'>
                    <div className='pokemon-info-section-type'>
                        <div>
                            <h2>Type</h2>
                            <div className='pokemon-info-p'>
                                <p>{pokemonInfo.types?.[0].type.name}</p>
                                {pokemonInfo.types?.[1]?.type.name && <p>{pokemonInfo.types?.[1]?.type.name}</p> }
                            </div>
                        </div>
                        <div>
                            <h2>Abilities</h2>
                            <div className='pokemon-info-p'>
                                <p>{pokemonInfo.abilities?.[0].ability.name}</p>
                                <p>{pokemonInfo.abilities?.[1].ability.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='progres-bars'>
                        <h2>Stats Base</h2>
                        
                        <p>
                            <b>HP:</b>
                            <b>{pokemonInfo.stats?.[0].base_stat}/150</b>
                        </p>
                        <progress  
                            value={pokemonInfo.stats?.[0].base_stat} 
                            max="150">
                        </progress>

                        <p>
                            <b>Attack:</b>
                            <b>{pokemonInfo.stats?.[1].base_stat}/150 </b>
                        </p>
                        <progress  
                            value={pokemonInfo.stats?.[1].base_stat} 
                            max="150">
                        </progress>

                        <p>
                            <b>Defense:</b>
                            <b>{pokemonInfo.stats?.[2].base_stat}/150</b>
                        </p>
                        <progress  
                            value={pokemonInfo.stats?.[2].base_stat} 
                            max="150"> 
                        </progress>

                        <p>
                            <b>Speed</b>
                            <b>{pokemonInfo.stats?.[5].base_stat}/150</b>
                        </p>
                        <progress  
                            value={pokemonInfo.stats?.[5].base_stat} 
                            max="150"> 
                        </progress>
                    </div>
                </div>
            </article>
            <article className='pokemons-movements'>
                    <h2>Movements</h2>
                    <div>
                        {
                            movements?.map(movement => (
                                <p 
                                    key={movement.move.url}
                                    className="movements"
                                >
                                
                                    {movement.move.name}
                                </p>
                            ))
                        }
                    </div>
            </article>
        </section>
    );
};

export default PokedexInfo;