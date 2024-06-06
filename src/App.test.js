import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("App", () => {
  it("fetches and displays two random Pokémon", async () => {
    const mockPokemonOne = {
      name: "Pikachu",
      sprites: { front_default: "pikachu.png" },
      types: [{ type: { name: "electric" } }],
      moves: [
        {
          move: {
            name: "thunderbolt",
            url: "https://pokeapi.co/api/v2/move/85/",
          },
        },
      ],
    };

    const mockPokemonTwo = {
      name: "Bulbasaur",
      sprites: { front_default: "bulbasaur.png" },
      types: [{ type: { name: "grass" } }],
      moves: [
        {
          move: {
            name: "vine whip",
            url: "https://pokeapi.co/api/v2/move/22/",
          },
        },
      ],
    };

    const mockMoveOne = { name: "thunderbolt", power: 90 };
    const mockMoveTwo = { name: "vine whip", power: 45 };

    fetchMock
      .mockResponseOnce(JSON.stringify(mockPokemonOne))
      .mockResponseOnce(JSON.stringify(mockPokemonTwo))
      .mockResponseOnce(JSON.stringify(mockMoveOne))
      .mockResponseOnce(JSON.stringify(mockMoveTwo));

    render(<App />);

    fireEvent.click(screen.getByText("Fetch Random Pokémon"));

    await waitFor(() => {
      expect(screen.getByText("Pikachu")).toBeInTheDocument();
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    });
  });

  it("starts a battle and displays the result", async () => {
    const mockPokemonOne = {
      name: "Pikachu",
      sprites: { front_default: "pikachu.png" },
      types: [{ type: { name: "electric" } }],
      moves: [
        {
          move: {
            name: "thunderbolt",
            url: "https://pokeapi.co/api/v2/move/85/",
          },
        },
      ],
    };

    const mockPokemonTwo = {
      name: "Bulbasaur",
      sprites: { front_default: "bulbasaur.png" },
      types: [{ type: { name: "grass" } }],
      moves: [
        {
          move: {
            name: "vine whip",
            url: "https://pokeapi.co/api/v2/move/22/",
          },
        },
      ],
    };

    const mockMoveOne = { name: "thunderbolt", power: 90 };
    const mockMoveTwo = { name: "vine whip", power: 45 };

    fetchMock
      .mockResponseOnce(JSON.stringify(mockPokemonOne))
      .mockResponseOnce(JSON.stringify(mockPokemonTwo))
      .mockResponseOnce(JSON.stringify(mockMoveOne))
      .mockResponseOnce(JSON.stringify(mockMoveTwo));

    render(<App />);

    fireEvent.click(screen.getByText("Fetch Random Pokémon"));

    await waitFor(() => {
      expect(screen.getByText("Pikachu")).toBeInTheDocument();
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Start Battle"));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Pikachu lands a decisive blow with thunderbolt knocking out Bulbasaur!/
        )
      ).toBeInTheDocument();
    });
  });

  it("displays an error if fetching Pokémon fails", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch Pokémon"));

    render(<App />);

    fireEvent.click(screen.getByText("Fetch Random Pokémon"));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch Pokémon. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
