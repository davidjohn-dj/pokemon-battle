const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs range from 1 to 898
    const response = await fetch(`${API_URL}${randomId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon');
    }
    const data = await response.json();
    return data;
};

export const getPokemonMove = async (moveUrl) => {
    const response = await fetch(moveUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch move');
    }
    const data = await response.json();
    return data;
};

export const getRandomMove = async (pokemon) => {
    const randomIndex = Math.floor(Math.random() * pokemon.moves.length);
    const moveUrl = pokemon.moves[randomIndex].move.url;
    return await getPokemonMove(moveUrl);
};
