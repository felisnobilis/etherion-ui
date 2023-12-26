import { Component, OnInit } from '@angular/core';
import { RealmService } from '../services/realm.service'; // Import your API service

@Component({
  selector: 'app-realms',
  templateUrl: './realms.component.html',
  styleUrls: ['./realms.component.css'],
})
export class RealmListComponent implements OnInit {
  realms: any[] = []; // Array to store the paginated realms
  // Other properties and pagination-related variables

  constructor(private realmService: RealmService) {}

  ngOnInit(): void {
    // Initialize pagination-related variables and fetch the initial page of realms
    this.fetchRealms();
  }

  fetchRealms(): void {
    // Use your realmService to retrieve paginated realms from your API
    this.realmService.getRealms().subscribe((response) => {
      // Process the response and update the 'realms' array
      this.realms = response.results;
      // Update other pagination-related variables if necessary
    });
  }

  // Implement pagination and selection logic as needed
}
