import { fetchPokemonDetail } from "../utils/Api"

export const getPokemonDetail = async (id) => {
    try {
        const pokemon = await fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!pokemon || !pokemon.name) {
            throw new Error("getPokemonDetail - Data Kosong");
        }

        return {
            name: pokemon.name,
            id: pokemon.id,
            officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            height: pokemon.height,
            weight: pokemon.weight,
            sprites: pokemon.sprites,
            moves: pokemon.moves
        }
    } catch (error) {
        throw new Error('getPokemonDetail - Gagal Mengambil Data!');
    }
}