import axios from "axios";
import {
  getRandomPokemon,
  getPokemonMove,
  getRandomMove,
} from "./pokemonService";

jest.mock("axios");

describe("pokemonService", () => {
  describe("getRandomPokemon", () => {
    it("should fetch a random Pokémon", async () => {
      const pokemonData = {
        name: "Pikachu",
        sprites: { front_default: "pikachu.png" },
        types: [{ type: { name: "electric" } }],
        moves: [{ move: { name: "thunderbolt" } }],
      };
      axios.get.mockResolvedValue({ data: pokemonData });

      const result = await getRandomPokemon();
      expect(result).toEqual(pokemonData);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringMatching(/https:\/\/pokeapi.co\/api\/v2\/pokemon\/\d+/)
      );
    });
  });

  describe("getPokemonMove", () => {
    it("should fetch Pokémon move details", async () => {
      const moveData = {
        name: "thunderbolt",
        power: 90,
      };
      axios.get.mockResolvedValue({ data: moveData });

      const result = await getPokemonMove(
        "https://pokeapi.co/api/v2/move/thunderbolt"
      );
      expect(result).toEqual(moveData);
      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/move/thunderbolt"
      );
    });
  });

  describe("getRandomMove", () => {
    it("should fetch a random move for a given Pokémon", async () => {
      const pokemonData = {
        moves: [
          { move: { url: "https://pokeapi.co/api/v2/move/thunderbolt" } },
        ],
      };
      const moveData = {
        name: "thunderbolt",
        power: 90,
      };
      axios.get.mockResolvedValueOnce({ data: moveData });

      const result = await getRandomMove(pokemonData);
      expect(result).toEqual(moveData);
      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/move/thunderbolt"
      );
    });
  });
});
