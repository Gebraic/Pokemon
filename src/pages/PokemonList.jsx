import { Button, Card, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/getPokemon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import '../css/PokemonList.css';

export default function PokemonList() {
    const [ pokemon, setPokemon ] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ next, setNext ] = useState(null);
    const [ prev, setPrev ] = useState(null);

    const fetchData = async (url) => {
        setLoading(true);

        try {
            const data = await getPokemon(url);
            if (data && data.results) {
                setPokemon(data.results);
                setNext(data.next);
                setPrev(data.prev);
            } else {
                console.error("PokemonList - Data tidak Valid");
            }
        } catch (error) {
            throw new Error('PokemonList - Error get Data');
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    
    const handleNext = () => {
        if (next) fetchData(next);
    }
    
    const handlePrev = () => {
        if (prev) fetchData(prev);
    }

    return (
        <div className="text-center pt-0 p-8 max-w-screen">
            { loading ? (<CircularProgress />) : (
                <>
                    <div className="p-8">
                    <Typography variant="h1" 
                    sx={{
                        color: "#ffcb05",
                        textShadow: "2px 2px #3b4cca",
                        fontWeight: "bold",
                        fontSize: "3.5rem",
                    }}>
                        Pokemon List
                    </Typography>
                    </div>
                    <div className="flex-wrap justify-center gap-[20px]" >
                        <Grid container spacing={4} >
                            {pokemon.map((detail) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={detail.name}
                                sx={{
                                    alignItems: "center",
                                    justifyItems: "center",
                                }}>
                                    <Card variant="outlined" className="PokemonListCard" sx={{
                                        backgroundColor: "white",
                                        borderRadius: "30px",
                                        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
                                        transition: "transform 0.2s ease-in-out",
                                        padding: "15px",
                                        maxWidth: "400px",
                                        width: "100%",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                        },
                                    }}>
                                        <LazyLoadImage
                                            src={detail.officialArtwork || "/placeholder.png"}
                                            effect="blur"
                                            alt={detail.name}
                                            placeholderSrc="/placeholder.png"
                                            className="w-[100%] h-[auto] object-contain"
                                        />
                                    </Card>
                                    <Link to={`/pokemon/${detail.id}`} 
                                    className="text-center w-[100%] block bg-amber-300 h-[auto] p-2 rounded-[30px] mt-[15px] font-bold
                                    text-blue-950 hover:bg-amber-100 max-w-[400px]">
                                        <Typography variant="h6">
                                            {detail.name.toUpperCase()}
                                        </Typography>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <Container sx={{ gap: 2, display: "flex", justifyContent: "center" }} 
                    className="PokemonListButton">
                        <Button variant="contained" disabled={!prev} onClick={handlePrev}>Prev</Button>
                        <Button variant="contained" disabled={!next} onClick={handleNext}>Next</Button>
                    </Container>
                </>
            )}
        </div>
    );
}