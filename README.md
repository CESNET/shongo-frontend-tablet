# Shongo Frontend Tablet

Frontend application for the CESNET reservation devices. The application uses the Shongo reservation system to fetch and create meeting room reservations.

## Requirements

- Node ^16.14.0 || ^18.10.0
- Npm

## Set-up

- The application uses the `@cesnet/shongo-calendar` library published on the GitHub registry, you might be required to log in to the GitHub npm, see [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
- Install dependencies by running `npm install`.
- Now you can run the application with `npm start`.

## Build

- To build the application for production, use `ng build --configuration=production`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
