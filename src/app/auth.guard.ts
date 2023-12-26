
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Replace with your authentication service

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated, allow access to the route
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}


export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  if (this.authService.isAuthenticated()) {
    return true; // User is authenticated, allow access to the route
  } else {
    // User is not authenticated, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
