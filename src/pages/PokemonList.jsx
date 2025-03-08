import { Button, Card, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/getPokemon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

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
        loading ? (<CircularProgress />) : (
        <div className="PokemonListContainer">
            <div className="PokemonListHeading">
                
            </div>
            <div className="PokemonListBody">
                <Grid container spacing={5} justifyContent="center">
                    {pokemon.map((detail) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={detail.name}>
                            <Card
                                variant="outlined"
                                sx={{
                                    width: 200,
                                    height: 250,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    backgroundColor: "white",
                                    padding: 1,
                                    margin: "auto",
                                }}>
                                
                                <LazyLoadImage
                                    src={detail.officialArtwork ? detail.officialArtwork : "No Data"}
                                    effect="blur"
                                    alt={detail.name}
                                    placeholderSrc="/placeholder.png"
                                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
                                />

                            </Card>
                            <Link to={`/pokemon/${detail.id}`} style={{ textDecoration: "none" }}>
                                <Typography
                                    variant="h6"
                                    color="white"
                                    sx={{
                                        backgroundColor: "black",
                                        width: "100%",
                                        textAlign: "center",
                                        padding: 1,
                                        borderRadius: "0 0 8px 8px",
                                    }}
                                >
                                    {detail.name.toUpperCase()}
                                </Typography>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Container sx={{ gap: 2, display: "flex", justifyContent: "center" }}>
                <Button variant="contained" disabled={!prev} onClick={handlePrev}>Prev</Button>
                <Button variant="contained" disabled={!next} onClick={handleNext}>Next</Button>
            </Container>
        </div>
        )
    )
}