import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../services/getPokemonDetail";
import { Box, Card, CircularProgress, Container, Slide, Typography, IconButton, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import '../css/PokemonDetail.css';

export default function DetailPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
    
    const { id } = useParams();
    
    const fetchPokemon = async () => {
        setLoading(true);
        try {
            const data = await getPokemonDetail(id);
            if (data && data.name) {
                setPokemon(data);
            }
        } catch (error) {
            throw new Error('DetailPokemon - Data Error');
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchPokemon();
    }, [id]);
    
    if (loading) return <CircularProgress />;
    
    const spriteKeys = pokemon.sprites ? Object.keys(pokemon.sprites).filter(key => typeof pokemon.sprites[key] === "string") : [];

    const handleNextSprite = () => {
        setCurrentSpriteIndex((prevIndex) => (prevIndex + 1) % spriteKeys.length);
    };

    const handlePrevSprite = () => {
        setCurrentSpriteIndex((prevIndex) => (prevIndex - 1 + spriteKeys.length) % spriteKeys.length);
    };
    
    return (
        <>
        <div className= "bg-blue-400 min-h-screen w-screen text-center flex flex-col items-center justify-center p-3">
            <Typography variant="h1" className="text-gray-900 mb-2">{pokemon.name.toUpperCase()}</Typography>
            <div className="bg-amber-200 max-w-[85%] max-h-[75%] h-full w-full p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
                    <div item className="flex-1 flex flex-col items-center justify-center">
                        <Card className="p-4 rounded-lg shadow-md">
                            <LazyLoadImage 
                            className="max-w-[auto] max-h-[220px] w-full h-full"
                            src={pokemon.officialArtwork || "/placeholder.png"}
                            alt={pokemon.name} 
                            effect="blur" 
                            />
                        </Card>
                        <Slide in={true} direction="up" className="mt-4 flex items-center justify-center gap-2">
                            <Box mt={2} className="max-h-[40%] h-full w-auto">
                                <IconButton onClick={handlePrevSprite}><ArrowBackIos /></IconButton>
                                {spriteKeys.length > 0 && (
                                    <LazyLoadImage 
                                        src={pokemon.sprites[spriteKeys[currentSpriteIndex]]} 
                                        alt={`${pokemon.name} sprite`} 
                                        effect="blur"
                                        className="max-h-[200px] max-w-[auto] h-full w-full"
                                    />
                                )}
                                <IconButton onClick={handleNextSprite}><ArrowForwardIos /></IconButton>
                            </Box>
                        </Slide>
                    </div>
                    <div item className="flex-1 flex flex-col gap-4">
                        <Card className="p-4 rounded-lg shadow-md">
                            <Typography variant="h3">PokeDex ID: {pokemon.id}</Typography>
                            <Typography variant="h3">Height: {pokemon.height}</Typography>
                            <Typography variant="h3">Weight: {pokemon.weight}</Typography>
                        </Card>
                        <Card className="p-4 rounded-lg shadow-md flex-1">
                            <Typography variant="h3">Move</Typography>
                            <Slide in={true} direction="up" className="PokemonDetailSlideMove">
                                <Box sx={{ maxHeight: 200, overflowY: "auto", border: "1px solid grey", p: 2, mt: 2 }}>
                                    {pokemon.moves && pokemon.moves.length > 0 ? (
                                        pokemon.moves.map((move, index) => (
                                            <Box key={index} component="section" sx={{ p: 1, borderBottom: '1px solid grey' }}>
                                                {move.move.name}
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography>Tidak ada Data</Typography>
                                    )}
                                </Box>
                            </Slide>
                        </Card>
                    </div>
            </div>
        </div>
        </>
    );
}