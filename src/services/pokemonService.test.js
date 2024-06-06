import { getRandomPokemon, getPokemonMove, getRandomMove } from './pokemonService';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('Pokemon Service', () => {
    it('should fetch a random Pokemon', async () => {
        const mockPokemon = { name: 'Pikachu', id: 25 };
        fetchMock.mockResponseOnce(JSON.stringify(mockPokemon));

        const result = await getRandomPokemon();
        expect(result).toEqual(mockPokemon);
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('https://pokeapi.co/api/v2/pokemon/'));
    });

    it('should fetch a move given a move URL', async () => {
        const mockMove = { name: 'thunderbolt', power: 90 };
        const moveUrl = 'https://pokeapi.co/api/v2/move/85/';
        fetchMock.mockResponseOnce(JSON.stringify(mockMove));

        const result = await getPokemonMove(moveUrl);
        expect(result).toEqual(mockMove);
        expect(fetchMock).toHaveBeenCalledWith(moveUrl);
    });

    it('should fetch a random move for a given Pokemon', async () => {
        const mockMove = { name: 'thunderbolt', power: 90 };
        const mockPokemon = {
            name: 'Pikachu',
            id: 25,
            moves: [
                { move: { name: 'thunderbolt', url: 'https://pokeapi.co/api/v2/move/85/' } }
            ]
        };
        fetchMock.mockResponseOnce(JSON.stringify(mockMove));

        const result = await getRandomMove(mockPokemon);
        expect(result).toEqual(mockMove);
        expect(fetchMock).toHaveBeenCalledWith('https://pokeapi.co/api/v2/move/85/');
    });
});
