import React, { useEffect, useState } from 'react'
import "./index.css"
import PokemonCards from "./PokemonCards"

export function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=4";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const detailPokemonUrl = data.results.map(async (ele) => {
        const res = await fetch(ele.url);
        const data = await res.json();
        return data;
      });
      const detailsRes = await Promise.all(detailPokemonUrl);
      setPokemon(detailsRes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError()
    }
  }
  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchPokemons = pokemon.filter((currPokemon) => currPokemon.name.toLowerCase().includes(search.toLocaleLowerCase()));
  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    )
  }
  return (
    <>
      <section className='container'>
        <header>
          <h1> Let's Catch Pokemon</h1>
        </header>
        <div className='pokemon-search'>
          <input
            type="text"
            placeholder='Search Pokemon'
            className='pokemon-search-input'
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
        </div>
        <div>
          <ul className='cards'>
            {
              searchPokemons.map((currPokemon) => {
                return <PokemonCards key={currPokemon.id} pokemonData={currPokemon}></PokemonCards>

              })
            }
          </ul>
        </div>
      </section>

    </>
  )
}
