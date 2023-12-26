import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealmService } from '../services/realm.service';

@Component({
  selector: 'app-realm-find',
  templateUrl: './realm-find.component.html',
  styleUrls: ['./realm-find.component.css'],
})
export class RealmFindComponent implements OnInit {
  realm: any;
  realmId: number;
  canJoin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private realmService: RealmService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.realmId = +params['id'];
      this.fetchRealmDetails();
    });
  }

  fetchRealmDetails(): void {
    this.realmService.getRealmById(this.realmId).subscribe(
      (response) => {
        this.realm = response;

        // Check if the realm is available to join based on API response
        this.canJoin = this.realm && this.realm.isJoinable;
      },
      (error) => {
        // Handle error here, e.g., show an error message
        console.error('Error fetching realm details:', error);
      }
    );
  }

  joinRealm(): void {
    this.realmService.joinRealm(this.realmId).subscribe(
      (response) => {
        // Handle success, e.g., show a success message
        console.log('Joined the realm successfully:', response);
      },
      (error) => {
        // Handle error here, e.g., show an error message
        console.error('Error joining the realm:', error);
      }
    );
  }
}
