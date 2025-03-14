import { fetchPokemon } from "../utils/Api"

export const getPokemon = async (page) => {
    try { 
        const pokemons = await fetchPokemon(page);
        if (!pokemons || !pokemons.results) {
            throw new Error ("getPokemon - Data Kosong");
        }

        const pokemonList = pokemons.results.map((pokemon) => {
            if (!pokemon.url) return null;
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return {
                name: pokemon.name,
                id: id,
                officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            };
        }).filter(Boolean);

        return {
            results: pokemonList,
            next: pokemons.next,
            prev: pokemons.previous
        };
    } catch (error) {
        throw new Error("getPokemon - error");
    }
}