import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { routes } from './pokedex-app.routes';
import { PokedexAppComponent } from './pokedex-app.component';
import { PokemonService } from './pokemon/pokemon.service';
import { DetailsComponent } from './pokemon/details/details.component';
import { ListComponent } from './pokemon/list/list.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
  ],
  providers: [PokemonService, provideHttpClient(withInterceptorsFromDi())],
  declarations: [PokedexAppComponent, ListComponent, DetailsComponent],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
