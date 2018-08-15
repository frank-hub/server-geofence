// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

// < script src = "https://www.gstatic.com/firebasejs/5.3.0/firebase.js" > </script>
//     < script >
  // Initialize Firebase
  firebase: {
  // apiKey: 'AIzaSyBaM2-Hv7WrnzGuYQqOiTDIANL5cduHLvU',
  // authDomain: 'precise-location-1531058565225.firebaseapp.com',
  // databaseURL: 'https://precise-location-1531058565225.firebaseio.com',
  // projectId: 'precise-location-1531058565225',
  // storageBucket: 'precise-location-1531058565225.appspot.com',
  // messagingSenderId: '609131036040'

   apiKey: 'AIzaSyBaM2-Hv7WrnzGuYQqOiTDIANL5cduHLvU',
    authDomain: 'precise-location-1531058565225.firebaseapp.com',
    databaseURL: 'https://precise-location-1531058565225.firebaseio.com',
    projectId: 'precise-location-1531058565225',
    storageBucket: 'precise-location-1531058565225.appspot.com',
    messagingSenderId: '609131036040'
},
// firebase.initializeApp(config);
// </script>

  googleMapsKey: 'AIzaSyA9BrfG0u2ijdH2dToRwvs-P-WSDn3nF0U'
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
