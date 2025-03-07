import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../services/getPokemonDetail";
import { Box, Card, CircularProgress, Container, Slide } from "@mui/material";

export default function DetailPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const data = await getPokemonDetail(id);
                console.log("data: ", data);
                setPokemon(data);
            } catch (error) {
                throw new Error('DetailPokemon - Data Error');
            }
        }
        fetchPokemon();
    }, [id])


    return (
        loading ? <CircularProgress/> : (
            <Container>
                <Container>
                    <Container>
                        <Card>

                        </Card>
                        <Slide>

                        </Slide>
                    </Container>
                    <Container>
                        <Card>
                            <Typography variant="h3">PokeDex ID: {pokemon.id}</Typography>
                            <Typography variant="h3">Height: {pokemon.height}</Typography>
                            <Typography variant="h3">Weight: {pokemon.weight}</Typography>
                        </Card>
                        <Box>
                            {pokemon.moves && pokemon.moves.length > 0 ? (
                                pokemon.moves.map((move) => {
                                    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                                        {mov.move.name}
                                    </Box>
                                })
                            ) : 
                            (
                                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                                    Tidak ada Data
                                </Box>
                            )
                            }
                        </Box>
                    </Container>
                </Container>
            </Container>
        )
    )
}