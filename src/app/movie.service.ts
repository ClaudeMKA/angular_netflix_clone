import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '255dc64c61f9e878b55f63f276f0ec7b';
  private apiUrl = 'https://api.themoviedb.org/3';


  constructor(private http: HttpClient) { }

  public async getAllMovies(page: number = 1): Promise<any[]> {
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`;
    const response = await this.http.get(url).toPromise() as any;
    return response['results'];
  }

  public getMovies(page: number = 1): Promise<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    return this.http.get(url).toPromise();
  }

  public getMovieVideos(movieId: number): Promise<any> {
    const url = `${this.apiUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get(url).toPromise();
  }

  public async getAventureMovies(): Promise<any[]> {
    const allMovies = await this.getAllMovies();

    // Filtrer les films qui ont le genre "Aventure" (vous devez connaître le genre_id pour Aventure dans TMDb)
    const aventureGenreId = 12; // Exemple : genre_id pour Aventure (vous devez obtenir le bon genre_id)
    const aventureMovies = allMovies.filter(movie => movie.genre_ids.includes(aventureGenreId));

    return aventureMovies;
  }

  public getMoviessimilar(movie_id: string): Observable<any> {
    const url = `${this.apiUrl}/movie/${movie_id}/similar?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
  public getMoviesByGenre(genre_id: number): Promise<any> {
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genre_id}`;
    return this.http.get(url).toPromise();
  }


}
