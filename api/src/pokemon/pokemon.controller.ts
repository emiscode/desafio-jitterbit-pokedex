import { Controller, Get, Param, Query } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getPokemonList(
    @Query("offset") offset: number = 0,
    @Query("limit") limit: number = 20
  ) {
    return this.pokemonService.getPokemonList(offset, limit);
  }

  @Get("search")
  getPokemonByName(@Query("name") name: string) {
    return this.pokemonService.getPokemonByName(name);
  }

  @Get(":id")
  getPokemonDetails(@Param("id") name: string) {
    return this.pokemonService.getPokemonDetails(name);
  }
}
