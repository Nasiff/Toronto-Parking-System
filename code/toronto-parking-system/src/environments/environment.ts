// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    // ADD IN YOUR OWN FIREBASE CONFIG HERE (Create a project on firebase), DONT USE MINE BELOW
    apiKey: "AIzaSyAN1yZpahGRicFTsfG_m-Z13JaNv1jWi4E",
    authDomain: "eecs4312-to-parking-system.firebaseapp.com",
    databaseURL: "https://eecs4312-to-parking-system.firebaseio.com",
    projectId: "eecs4312-to-parking-system",
    storageBucket: "eecs4312-to-parking-system.appspot.com",
    messagingSenderId: "521712077197",
    appId: "1:521712077197:web:6cc75674e3580e858ad5c4",
    measurementId: "G-NJ0NZW6C0S"
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
