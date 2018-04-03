// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googleApi: '',
    firebase: {
            apiKey: 'AIzaSyDUyOeMNp1nUSBX3JpCjwF1G4ujk-Z6EbU',
            authDomain: 'rights-management-portal.firebaseapp.com',
            databaseURL: 'https://rights-management-portal.firebaseio.com',
            projectId: 'rights-management-portal',
            storageBucket: 'rights-management-portal.appspot.com',
            messagingSenderId: '768176307619'
        }
};
