import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  pokemon: any;

  types = [
    { name: 'normal' },
    { name: 'fighting' },
    { name: 'flying' },
    { name: 'poison' },
    { name: 'ground' },
    { name: 'rock' },
    { name: 'bug' },
    { name: 'ghost' },
    { name: 'steel' },
    { name: 'fire' },
    { name: 'water' },
    { name: 'grass' },
    { name: 'electric' },
    { name: 'psychic' },
    { name: 'ice' },
    { name: 'dragon' },
    { name: 'dark' },
    { name: 'fairy' },
    { name: 'stellar' },
    { name: 'unknown' },
  ];

  typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fighting: '#C22E28',
    flying: '#A98FF3',
    poison: '#A33EA1',
    ground: '#E2BF65',
    rock: '#B6A136',
    bug: '#A6B91A',
    ghost: '#735797',
    steel: '#B7B7CE',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    psychic: '#F95587',
    ice: '#96D9D6',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD',
    stellar: '#FFD700',
    unknown: '#68A090',
  };

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      this.pokemon = data;
    });
  }
}
