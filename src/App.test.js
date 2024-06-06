// src/App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { getRandomPokemon, getRandomMove } from './services/pokemonService';

// Mock the Pokemon service functions
jest.mock('./services/pokemonService');

const mockPokemonOne = {
  name: 'Pikachu',
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { name: 'electric' } }],
  moves: [{ move: { name: 'thunderbolt' } }],
};

const mockPokemonTwo = {
  name: 'Bulbasaur',
  sprites: { front_default: 'bulbasaur.png' },
  types: [{ type: { name: 'grass' } }],
  moves: [{ move: { name: 'vine whip' } }],
};

const mockMoveOne = {
  name: 'thunderbolt',
  power: 90,
};

const mockMoveTwo = {
  name: 'vine whip',
  power: 45,
};

test('fetches and displays two random Pokémon', async () => {
  getRandomPokemon.mockResolvedValueOnce(mockPokemonOne).mockResolvedValueOnce(mockPokemonTwo);
  getRandomMove.mockResolvedValueOnce(mockMoveOne).mockResolvedValueOnce(mockMoveTwo);

  render(<App />);

  fireEvent.click(screen.getByText('Fetch Random Pokémon'));

  await waitFor(() => expect(screen.getByText('Pikachu')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('Bulbasaur')).toBeInTheDocument());
});

test('starts a battle and displays the result', async () => {
  getRandomPokemon.mockResolvedValueOnce(mockPokemonOne).mockResolvedValueOnce(mockPokemonTwo);
  getRandomMove.mockResolvedValueOnce(mockMoveOne).mockResolvedValueOnce(mockMoveTwo);

  render(<App />);

  fireEvent.click(screen.getByText('Fetch Random Pokémon'));

  await waitFor(() => expect(screen.getByText('Pikachu')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('Bulbasaur')).toBeInTheDocument());

  fireEvent.click(screen.getByText('Start Battle'));

  await waitFor(() =>
    expect(screen.getByText((content, element) => {
      const hasText = (node) => node.textContent === "Battle 1: Pikachu lands a decisive blow with thunderbolt knocking out Bulbasaur!";
      const elementHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
      return elementHasText && childrenDontHaveText;
    })).toBeInTheDocument()
  );
});

test('displays an error if fetching Pokémon fails', async () => {
  getRandomPokemon.mockRejectedValueOnce(new Error('API is down'));

  render(<App />);

  fireEvent.click(screen.getByText('Fetch Random Pokémon'));

  await waitFor(() => expect(screen.getByText('Failed to fetch Pokémon. Please try again.')).toBeInTheDocument());
});
