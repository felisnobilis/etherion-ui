import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../config/api-config'; // Import your API configuration

@Injectable({
  providedIn: 'root',
})
export class RealmService {
  private baseUri = apiConfig.baseUri; // Use the API base URI from the config

  constructor(private http: HttpClient) {}

  getRealmById(id: string): Observable<any> {
    const url = `${this.baseUri}/realms/${id}`; // Construct the API endpoint
    return this.http.get(url);
  }

  // Updated method to retrieve paginated realms using API call
  getRealms(): Observable<any> {
    const url = `${this.baseUri}/realms`; // Construct the API endpoint
    return this.http.get(url);
  }

  // Placeholder method for joining a realm (you can update it similarly)
  joinRealm(id: string): Observable<any> {
    // Replace this with actual logic to join the realm
    // For now, we return a success message
    return of({ success: true, message: 'Joined the realm successfully' });
  }
}
