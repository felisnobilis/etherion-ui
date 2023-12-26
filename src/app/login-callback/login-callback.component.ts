import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login-callback',
  template: '<div>Loading...</div>', // Minimal template
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Retrieve the OAuth2 access token from the URL query parameters.
    const accessToken = this.route.snapshot.queryParamMap.get('access_token');

    if (!accessToken) {
      // Handle the case when the access_token is missing or empty.
      this.handleAccessTokenError();
      return;
    }

    // Use the OAuth2 access token to make a REST API call to fetch user data.
    this.fetchUserData(accessToken);
  }

  fetchUserData(token: string) {
    // Set up the HTTP headers with the OAuth2 access token for authorization.
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Define the REST API endpoint to fetch user data. Replace with your API endpoint.
    const apiUrl = 'https://example.com/api/user';

    // Make the REST API call to retrieve user data using RxJS operators.
    this.http
      .get(apiUrl, { headers })
      .pipe(
        switchMap((userData: any) => {
          // Handle the user data as needed (e.g., store it in the application's state).
          // You can also perform additional authentication-related tasks.

          // For example, you might store user data in your authentication service.
          this.authService.setUserData(userData);

          // Redirect the user to the desired route (e.g., user profile).
          this.router.navigate(['/profile']);

          // Return an observable with the userData for further processing, if needed.
          return userData;
        }),
        catchError((error) => {
          // Handle error scenarios (e.g., invalid token, server error).
          // You can implement error handling logic here.
          console.error('Error fetching user data:', error);

          // Redirect to an error page or back to the login page.
          this.router.navigate(['/login']);

          // Handle the error by returning a new observable or re-throwing it.
          return throwError(error);
        })
      )
      .subscribe({
        next: () => {
          // Handle successful completion of the observable here, if needed.
        },
        error: (error) => {
          // Handle errors here if needed.
        },
        complete: () => {
          // Handle completion of the observable here, if needed.
        },
      });
  }

  handleAccessTokenError() {
    // Handle the case when the access_token is missing or empty.
    console.error('Access token is missing or empty.');

    // Redirect to an error page or back to the login page.
    this.router.navigate(['/login']);
  }
}
