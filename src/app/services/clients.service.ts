import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientApplication } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getAllClients() {
    return this.http.get('/api/clients');
  }

  getClientById(id: number): Observable<ClientApplication> {
    return <Observable<ClientApplication>> this.http.get('/api/clients/' + id);
  }

  updateClient(client: ClientApplication) {
    return this.http.post<any>('/api/clients/update', {client});
  }
}
