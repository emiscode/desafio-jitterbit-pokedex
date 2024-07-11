import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { PokemonService } from "../src/pokemon/pokemon.service";

const mockPokemonList = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
];

const mockPokemonDetails = [
  {
    id: 1,
    name: "bulbasaur",
    sprites: { front_default: "https://pokeapi.co/api/v2/pokemon/1/sprite" },
  },
  {
    id: 2,
    name: "ivysaur",
    sprites: { front_default: "https://pokeapi.co/api/v2/pokemon/2/sprite" },
  },
];

const mockPokemonByName = {
  id: 1,
  name: "bulbasaur",
  sprites: { front_default: "https://pokeapi.co/api/v2/pokemon/1/sprite" },
};

describe("PokemonService", () => {
  let service: PokemonService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should return a list of detailed Pokemon", async () => {
    jest.spyOn(httpService, "get").mockImplementation((url: string): any => {
      if (url.includes("/pokemon?")) {
        return of({
          data: { results: mockPokemonList },
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        });
      } else if (url.includes("/pokemon/1/")) {
        return of({
          data: mockPokemonDetails[0],
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        });
      } else if (url.includes("/pokemon/2/")) {
        return of({
          data: mockPokemonDetails[1],
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        });
      }
    });

    const result = await service.getPokemonList(0, 2);
    expect(result).toEqual([
      {
        id: 1,
        name: "bulbasaur",
        sprite: "https://pokeapi.co/api/v2/pokemon/1/sprite",
      },
      {
        id: 2,
        name: "ivysaur",
        sprite: "https://pokeapi.co/api/v2/pokemon/2/sprite",
      },
    ]);
  });

  it("should return a Pokemon by name", async () => {
    jest.spyOn(httpService, "get").mockImplementation((url: string): any => {
      if (url.includes("/pokemon/bulbasaur")) {
        return of({
          data: mockPokemonByName,
          status: 200,
          statusText: "OK",
          headers: {},
          config: {},
        });
      }
    });

    const result = await service.getPokemonByName("bulbasaur");
    expect(result).toEqual({
      id: 1,
      name: "bulbasaur",
      sprite: "https://pokeapi.co/api/v2/pokemon/1/sprite",
    });
  });

  // Add more test cases here if needed
});
