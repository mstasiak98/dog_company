// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  PUSHER_API_KEY: 'd404806fb04dc022f740',
  PUSHER_CLUSTER: 'eu',
  production: false,
  baseUrl: 'http://127.0.0.1:8000/api',
  dogProfileBaseUrl: 'http://127.0.0.1:8000/api/dogs',
  announcementsBaseUrl: 'http://127.0.0.1:8000/api/announcements',
  usersBaseUrl: 'http://127.0.0.1:8000/api/users',
  messagesBaseUrl: 'http://127.0.0.1:8000/api/messages',
  broadcastAuthenticationUrl: 'http://127.0.0.1:8000/broadcasting/auth',
  nominatimUrl: 'https://nominatim.openstreetmap.org',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
