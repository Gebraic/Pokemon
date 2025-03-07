import { fetchPokemon, fetchPokemonDetail } from "../utils/Api";
import { PokemonDetail, PokemonModel } from "../models/pokemonModel";
// import { transformWithEsbuild } from "vite";

export const getPokemon = async (page = 1, limit = 20) => {
    try {
        const offset = (page - 1) * limit;
        const pokemons = await fetchPokemon(limit, offset);

        if (!pokemons || !pokemons.results) {
            throw new Error("Data Kosong!");
        }

        const pokemonList = await Promise.all(
            pokemons.results.map(async (pokemon) => {
                const detail = await fetchPokemonDetail(pokemon.url);
                const officialArtwork = detail.sprites.other["official-artwork"].front_default;
                
                return new PokemonModel(
                    pokemon.name,
                    officialArtwork,
                    pokemon.url,
                    detail.id
                );
            })
        );

        return {
            results: pokemonList,
            next: pokemons.next,
            previous: pokemons.previous
        };
    } catch (error) {
        throw new Error('Tidak Dapat Mengambil Data!');
    }
};

export const getPokemonDetail = async (id) => {
    try {
        const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const detail = await fetchPokemonDetail(`${baseUrl}`);

        if (!detail) {
            throw new Error("Pokemon tidak ditemukan!");
        }
        const officialArtwork = detail.sprites.other["official-artwork"].front_default;
        const pokemon = new PokemonDetail(
            detail.height,
            detail.weight,
            detail.sprites,
            detail.moves
        );

        pokemon.name = detail.name;
        pokemon.officialArtwork = officialArtwork,
        pokemon.url = baseUrl;
        pokemon.id = detail.id;

        return pokemon;
    } catch (error) {
        throw new Error(`Controller - GetPokemonDetail: ${error.message}`);
    }
};

// export const getPokemon = async ({ queryKey }) => {
//     const [, {page, limit}] = queryKey;
//     const offset = (page - 1) * limit;
//     const pokemons = await fetchPokemon(limit, offset);

//     if (!pokemons || !pokemons.results) {
//         throw new Error("API - Error di GetPokemon");
//     }

//     const pokemonList = await Promise.all (
//         pokemons.results.map(async (pokemon) => {
//             const detail = await fetchPokemonDetail(pokemon.url)
//             const officialArtwork = detail.sprites.other["official-artwork"].front_default;
//             return new PokemonModel (
//                 pokemon.name,
//                 officialArtwork,
//                 pokemon.url,
//                 detail.id
//             )
//         })
//     );
//     return {
//         results: pokemonList,
//         next: pokemons.next,
//         prev: pokemons.previous
//     };
// };

// export const getPokemonDetail = async ({queryKey}) => {
//     const [, id] = queryKey;
//     const baseUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
//     const detail = await fetchPokemonDetail(baseUrl);

//     if (!detail) {
//         throw new Error ('Controller - Detail Kosong');
//     }

//     const officialArtwork =     detail.sprites.other["official-artwork"].front_default;

//     return new PokemonDetail (
//         detail.name,
//         officialArtwork,
//         url, 
//         detail.id,
//         detail.height,
//         detail.weight, 
//         detail.sprites,
//         detail.moves
//     )

// }