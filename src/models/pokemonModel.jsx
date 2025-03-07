 export class PokemonModel {
    constructor(name, officialArtwork, url, id) {
        this.name = name;
        this.officialArtwork = officialArtwork;
        this.url = url;
        this.id = id;
    }
}

export class PokemonDetail extends PokemonModel {
    constructor(height, weight, sprites, moves) {
        super (null, null, null, null);
        this.height = height;
        this.weight = weight;
        this.sprites = sprites;
        this.moves = moves;
    }
}

// export class PokemonDetail extends PokemonModel {
//     constructor(name, officialArtwork, url, id, height, weight, sprites, moves) {
//         super (name, officialArtwork, url, id);
//         this.height = height;
//         this.weight = weight;
//         this.sprites = sprites;
//         this.moves = moves;
//     }
// }