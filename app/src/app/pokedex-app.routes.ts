import { Routes } from '@angular/router';
import { PokedexAppComponent } from './pokedex-app.component';
import { DetailsComponent } from './pokemon/details/details.component';
import { ListComponent } from './pokemon/list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'pokemon/:name', component: DetailsComponent },
];
