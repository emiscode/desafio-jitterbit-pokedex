import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonService {
  private baseUrl = 'http://localhost:3000/api/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  searchPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?name=${name}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }
}
