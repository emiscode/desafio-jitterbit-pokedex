import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { types } from "util";

@Injectable()
export class PokemonService {
  private readonly baseUrl = "https://pokeapi.co/api/v2";

  constructor(private readonly httpService: HttpService) {}

  async getPokemonList(offset: number, limit: number) {
    const response = await lastValueFrom(
      this.httpService.get(
        `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      )
    );

    const pokemonList = response.data.results;

    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon: any) => {
        const pokemonDetails = await lastValueFrom(
          this.httpService.get(pokemon.url)
        );
        return {
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          sprite: pokemonDetails.data.sprites.front_default,
        };
      })
    );

    return detailedPokemonList;
  }

  async getPokemonByName(name: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name}`)
      );
      const data = {
        id: response.data.id,
        name: response.data.name,
        sprite: response.data.sprites.front_default,
      };

      console.log({ data });
      return data;
    } catch (error) {
      return null;
    }
  }

  async getPokemonDetails(name: string) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/pokemon/${name}`)
    );
    const data = {
      id: response.data.id,
      name: response.data.name,
      abilities: response.data.abilities.map(
        (ability: any) => ability.ability.name
      ),
      height: response.data.height,
      spriteFront: response.data.sprites.front_default,
      spriteBack: response.data.sprites.back_default,
      artwork: response.data.sprites.other["official-artwork"].front_default,
      types: response.data.types.map((type: any) => type.type.name),
      weight: response.data.weight,
    };
    return data;
  }
}
