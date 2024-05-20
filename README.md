# Shongo Frontend Tablet

Frontend application for the CESNET reservation devices. The application uses the Shongo reservation system to fetch and create meeting room reservations.

## Requirements

- Node ^16.14.0 || ^18.10.0
- Npm

## Set-up

- The application uses the `@cesnet/shongo-calendar` library published on the GitHub registry, you might be required to log in to the GitHub npm, see next section or [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
- Install dependencies by running `npm install`.
- Now you can run the application with `npm start`.

## GitHub NPM registry log-in

You have to generate a personal access token with access to **read packages** in **Settings -> Developer settings -> Tokens**.

Then you can log in like this:
```
$ npm login --scope=@cesnet --auth-type=legacy --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: TOKEN
```

## Proxy

The development server uses a Webpack proxy that redirects relative path requests to a desired host.

By default the development server uses `https://shongo-dev.cesnet.cz:8001` as the target.

If you want to use your own instance of the Shongo backend, override the target property in the `proxy.conf.mjs` file at the root of the project.

## CORS

The proxy should solve your client side CORS issues, however your origin address also needs to be set-up in the Shongo controller configuration in `rest-api -> origin`.

When connecting to the `https://shongo-dev.cesnet.cz:8001` you should have no problem when running the dev server on the default host:port `localhost:4200`.

Example Shongo controller configuration (dev only):

```xml
<rest-api>
      <host>shongo-dev.cesnet.cz</host>
      <port>8001</port>
      <origin>https://shongo-dev.cesnet.cz</origin>
      <origin>http://localhost:4200</origin>
</rest-api>
```

## Access token

When running the project for the first time, you need to provide an access token that is configured on the backend in the Shongo controller configuration. After that it will be stored in the local storage of the device for the particular host address.

Example configuration:

```xml
<security>
    <authorization>
        <reservation-devices>
            <device>
                <access-token>test-token</access-token>
                <device-id>shongo:reservation:device:1</device-id>
                <resource-id>shongo:shongo-dev.cesnet.cz:res:3</resource-id>
            </device>
        </reservation-devices>
    </authorization>
</security>
```

## Build

To build the application for production, use `ng build --configuration=production`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
