import { Button, Card, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/getPokemon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import '../css/PokemonLIst.css';

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
        <div className="PokemonListContainer">
            { loading ? (<CircularProgress />) : (
                <>
                    <div className="PokemonListHeading">
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
                    <div className="PokemonListBody">
                        <Grid container spacing={4} justifyContent="center">
                            {pokemon.map((detail) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={detail.name}
                                sx={{
                                    alignItems: "center",
                                    justifyItems: "center"
                                }}>
                                    <Card variant="outlined" className="PokemonListCard">
                                        <LazyLoadImage
                                            src={detail.officialArtwork || "/placeholder.png"}
                                            effect="blur"
                                            alt={detail.name}
                                            placeholderSrc="/placeholder.png"
                                            className="PokemonListImage"
                                        />
                                    </Card>
                                    <Link to={`/pokemon/${detail.id}`} className="PokemonListLink">
                                        <Typography variant="h6">
                                            {detail.name.toUpperCase()}
                                        </Typography>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <Container sx={{ gap: 2, display: "flex", justifyContent: "center" }} className="PokemonListButton">
                        <Button variant="contained" disabled={!prev} onClick={handlePrev}>Prev</Button>
                        <Button variant="contained" disabled={!next} onClick={handleNext}>Next</Button>
                    </Container>
                </>
            )}
        </div>
    );
}