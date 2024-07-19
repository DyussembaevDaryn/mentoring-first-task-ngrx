import { InjectionToken } from '@angular/core';

export const environment = new InjectionToken<{ apiUrl: string }>('environment', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://api.example.com'
  })
});
