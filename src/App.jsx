import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PokemonList from './pages/PokemonList';
import DetailPokemon from './pages/PokemonDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PokemonList/>,
  },   
  {
    path: '/pokemon/:id',
    element: <DetailPokemon />,
  }
]);

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "36px",
      fontWeight: "bolder",
    },
    h2: {
      fontSize: "28px",
      fontWeight: "bold",
    }, 
    h3: {
      fontSize: "24px",
      fontWeight: "normal",
    }
  }
});

export default function App(){
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
