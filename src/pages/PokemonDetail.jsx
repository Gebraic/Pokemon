import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../services/getPokemonDetail";
import { Box, Card, CircularProgress, Container, Slide, Typography, IconButton } from "@mui/material";
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
        <div className="PokemonDetailContainer">
            <Typography variant="h1">{pokemon.name}</Typography>
            <Card className="PokemonDetailBody">
                <Container className="PokemonDetailLeft">
                    <Card className="PokemonDetailImage">
                        <LazyLoadImage 
                        className="OfficialImage" 
                        src={pokemon.officialArtwork} 
                        alt={pokemon.name} 
                        effect="blur" 
                        />
                    </Card>
                    <Slide in={true} direction="up" className="PokemonDetailSprites">
                        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                            <IconButton onClick={handlePrevSprite}><ArrowBackIos /></IconButton>
                            {spriteKeys.length > 0 && (
                                <LazyLoadImage 
                                    src={pokemon.sprites[spriteKeys[currentSpriteIndex]]} 
                                    alt={`${pokemon.name} sprite`} 
                                    effect="blur"
                                />
                            )}
                            <IconButton onClick={handleNextSprite}><ArrowForwardIos /></IconButton>
                        </Box>
                    </Slide>
                </Container>
                <Container className="PokemonDetailRight">
                    <Card className="PokemonDetailBasic">
                        <Typography variant="h3">PokeDex ID: {pokemon.id}</Typography>
                        <Typography variant="h3">Height: {pokemon.height}</Typography>
                        <Typography variant="h3">Weight: {pokemon.weight}</Typography>
                    </Card>
                    <Card className="PokemonDetailMove">
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
                </Container>
            </Card>
        </div>
    );
}