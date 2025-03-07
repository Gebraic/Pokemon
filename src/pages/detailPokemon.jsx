import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../css/detailPokemon.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPokemonDetail } from "../controllers/pokemonController";

export default function DetailPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            setPokemon(null);
            try {
              const data = await getPokemonDetail(id);
              setPokemon(data);
              setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemon();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!pokemon) return <p>No Pokémon data</p>;

    return (
        <div className="detailPokemonBody">
          <div className="detailPokemonHeading">
            <h1>{pokemon.name.toUpperCase()}</h1>
          </div>
          <div className="detailPokemonContainer">
            <div className="detailPokemonLeft">
              <div className="detailPokemonImage">
                <LazyLoadImage
                  src={pokemon.officialArtwork}
                  alt={`${pokemon.name} image`}
                  effect="blur"
                  placeholderSrc="/placeholder.png"
                />
              </div>
              <div className="detailPokemonSprites">
                <h3>Sprites</h3>
                <Slider >
                  {pokemon.sprites && Object.keys(pokemon.sprites).map((key) => (
                      pokemon.sprites[key] && typeof pokemon.sprites[key] === "string" && (
                          <LazyLoadImage
                              key={key}
                              src={pokemon.sprites[key]}
                              alt={`${pokemon.id} ${key}`}
                              effect="blur"
                              placeholderSrc="/placeholder.png"
                          />
                      )
                  ))}
                </Slider>
              </div>
            </div>
            <div className="detailPokemonRight">
              <div className="detailPokemonBasicInfo">
                <h2>PokeDex ID: {pokemon.id}</h2>
                <h2>Height: {pokemon.height ? `${pokemon.height / 10} m` : "N/A"}</h2>
                <h2>Weight: {pokemon.weight ? `${pokemon.weight / 10} kg` : "N/A"}</h2>
              </div>
              <div className="detailPokemonMoves">
              <h3>Moves</h3>
                <ul className="movesList">
                    {pokemon.moves && pokemon.moves.length > 0 ? (
                        pokemon.moves.map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                        ))
                    ) : (
                        <li>No moves available</li>
                    )}
                </ul>
              </div>
            </div>
          </div>
            <Outlet />
        </div>
    );
}