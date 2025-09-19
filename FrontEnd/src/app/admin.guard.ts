import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles = payload['role'] || payload['roles'] || [];

    const isAdmin = Array.isArray(roles)
      ? roles.includes('Admin')
      : roles === 'Admin';

    if (!isAdmin) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (err) {
    router.navigate(['/login']);
    return false;
  }
};
