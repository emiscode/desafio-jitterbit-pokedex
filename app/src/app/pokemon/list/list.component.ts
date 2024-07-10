import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  pokemons: any[] = [];
  offset: number = 0;
  limit: number = 20;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    this.pokemonService
      .getPokemonList(this.offset, this.limit)
      .subscribe((data) => {
        this.pokemons = [...this.pokemons, ...data];
        this.offset += this.limit;
      });
  }

  searchPokemon() {
    if (this.searchTerm) {
      this.pokemonService.searchPokemon(this.searchTerm).subscribe((data) => {
        if (data) {
          this.pokemons = [data];
          return;
        }
        this.pokemons = [];
      });
    }
  }
}
