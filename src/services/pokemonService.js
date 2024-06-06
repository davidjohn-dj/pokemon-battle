import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs range from 1 to 898
    const response = await axios.get(`${API_URL}${randomId}`);
    return response.data;
};

export const getPokemonMove = async (moveUrl) => {
    const response = await axios.get(moveUrl);
    return response.data;
};

export const getRandomMove = async (pokemon) => {
    const randomIndex = Math.floor(Math.random() * pokemon.moves.length);
    const moveUrl = pokemon.moves[randomIndex].move.url;
    return await getPokemonMove(moveUrl);
};
