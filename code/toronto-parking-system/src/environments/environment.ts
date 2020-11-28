// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    // ADD IN YOUR OWN FIREBASE CONFIG HERE (Create a project on firebase), DONT USE MINE BELOW
    apiKey: "AIzaSyB82vNuuWHozAUb_VtBvqpZoNzVGqzloaQ",
    authDomain: "lassonde-sux.firebaseapp.com",
    databaseURL: "https://lassonde-sux.firebaseio.com",
    projectId: "lassonde-sux",
    storageBucket: "lassonde-sux.appspot.com",
    messagingSenderId: "1056494147567",
    appId: "1:1056494147567:web:18355b437b90eec244881a",
    measurementId: "G-3TJX2D8CHB"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
