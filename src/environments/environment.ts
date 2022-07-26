// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import packageJson from '../../package.json';
export const environment = {
  firebase: {
    projectId: 'flashcard-c24ef',
    appId: '1:774405791828:web:2a8ea3ead7778047550dc1',
    databaseURL: 'https://flashcard-c24ef-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'flashcard-c24ef.appspot.com',
    apiKey: 'AIzaSyCbP6mzoRl1a-UT4wYvUrMRZwLVEjX86pE',
    authDomain: 'flashcard-c24ef.firebaseapp.com',
    messagingSenderId: '774405791828',
    measurementId: 'G-4XX7Z2SDZ8',
  },
  production: false,
  // version: `(dev) v${packageJson.version}`,
   version: '0.01',
  apiUrl: 'http://localhost:3000/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
