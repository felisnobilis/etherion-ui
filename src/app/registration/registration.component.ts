import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../../config/api-config';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  formData: any = {};
  registrationError: string | null = null;

  @ViewChild('registrationForm') registrationForm!: NgForm;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.formData);

      // Send registration data to the REST API using the API base URI
      this.http
        .post<any>(apiConfig.baseUri, this.formData)
        .pipe(
          switchMap((response) => {
            console.log('Registration successful:', response);

            // Reset the form after successful registration
            this.registrationForm.resetForm();
            this.registrationError = null;

            // Return an observable to avoid nested subscriptions
            return of(response);
          }),
          catchError((error) => {
            console.error('Registration error:', error);

            // Display the error message to the user
            this.registrationError = error.error.message || 'Registration failed.';

            // Return an observable with an error to avoid nested subscriptions
            return of(error);
          })
        )
        .subscribe();
    }
  }
}
