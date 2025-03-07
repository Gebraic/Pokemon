import { fetchPokemonDetail } from "../utils/Api"

export const getPokemonDetail = async (id) => {
    try {
        const pokemon = await fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log("Pokemon: ", pokemon)
        
        if (!pokemon || !pokemon.results) {
            throw new Error("getPokemonDetail - Data Kosong");
        }

        return {
            name: pokemon.name,
            id: pokemon.id,
            height: pokemon.height,
            weight: pokemon.weight,
            sprites: pokemon.sprites,
            moves: pokemon.moves.map(m => m.move.name)
        }
    } catch (error) {
        throw new Error('getPokemonDetail - Gagal Mengambil Data!');
    }
}