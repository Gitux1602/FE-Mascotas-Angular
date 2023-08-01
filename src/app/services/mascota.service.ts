import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient)
  { 

  }

  getMascotas(): Observable<Mascota[]>
  {
    //this.http.get(this.myAppUrl + this.myApiUrl);              Se puede usar de estas dos maneras
    return this.http.get<Mascota[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  delMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.myAppUrl}${this.myApiUrl}`, mascota);
  }
}


//Explicacion

//Los servicios se hacen para tres cosas:
//1-Hacer peticiones a BE --->Se usará para esto
//2-Reutilizar codigo
//3-Comunicacion entre componentes