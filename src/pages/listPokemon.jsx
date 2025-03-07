import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/listPokemon.css';
import { getPokemon } from "../controllers/pokemonController";

export default function ListPokemon() {
    const [ pokemons, setPokemons ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ page, setPage ] = useState(1);
    const [ nextPage, setNextPage ] = useState(null);
    const [ prevPage, setPrevPage ] = useState(null);
    const [ imageSize, setImageize ] = useState({width: 200, height: 200});
    const containerRef  = useRef(null);

    useEffect(() => {
        const updateImageSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;

                const calculateSize = window.innerWidth >= 1200 ? containerWidth / 5 - 20 :
                window.innerWidth >= 900 ? containerWidth / 4 - 20 :
                window.innerWidth >= 700 ? containerWidth / 3 - 20 :
                window.innerWidth >= 500 ? containerWidth / 3 - 20 :
                containerWidth - 20;

                const size = Math.max(Math.min(calculateSize, 250), 100);

                setImageize({
                    width: size,
                    height: size
                })
            }
        }
        updateImageSize();
        window.addEventListener('resize', updateImageSize);
        return () => {
            window.removeEventListener('resize', updateImageSize);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (page != 1) {
                setPokemons([])
            }
            try {
                const data = await getPokemon(page);
                setPokemons(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);

                // console.log("Next: ", nextPage);
                // console.log("Prev: ", prevPage);
                
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [page]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="listPokemonBody">
                <div className="listPokemonHeading">
                    <h1>List Pokemon</h1>
                </div>
                <div className="listPokemonContainer">
                    {pokemons.map((pokemon) => (
                        <div className="listPokemonCard">
                            <div className="listPokemonPhoto"
                            style={
                                {
                                    width: imageSize.width,
                                    height: imageSize.height
                                }
                            }>
                            <Suspense fallback={<p>Loading Image...</p>}>
                                <LazyLoadImage 
                                        src={pokemon.officialArtwork} 
                                        alt={`${pokemon.id} error`} 
                                        effect="blur"
                                        height="100%"
                                        width="100%"
                                        />
                            </Suspense>
                            </div>
                            <div className="listPokemonLink">
                                <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id} 
                                style={{textDecoration: "none"}}>
                                    <h3>{pokemon.name.toUpperCase()}</h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={() => setPage(page - 1)} disabled={!prevPage}>Previous</button>
                    <h3>Page {page}</h3>
                    <button onClick={() => setPage(page + 1)} disabled={!nextPage}>Next</button>
                </div>
                <Outlet />
            </div>
        </>
    )
}