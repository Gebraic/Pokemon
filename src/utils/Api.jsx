export const fetchPokemon = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
    const response = await fetch(url);
    console.log("API - response: ", response);
    if (!response.ok) {
        throw new Error('API - Gagal Mengambil Data!');
    }
    const data = await response.json();
    return data;
}

export const fetchPokemonDetail = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('API - Gagal Mengambil Data!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("API - Gagal mengambil detail data!");
    }
}