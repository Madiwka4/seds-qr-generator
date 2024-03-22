# SEDS.kz QR Generator
This is a basic QR Code Generator done as my first attempt to use Next.js and React. You can see it in use https://qr.seds.kz

# SEDS.kz QR Code Generator

This is a QR Code Generator built with Next.js and React.

## Getting Started

First, run the development server:

```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.


## Building and Running for Production

To create an optimized build of your app:

```bash
npm run build
```

After building your app, you can start the production server:

```bash
npm run start
```

## Docker

You can also run your app in a Docker container:

First, build the Docker image:

```bash
docker build . -t seds-qr-generator
```

Then, run the Docker image:

```bash
docker run -p 3000:3000 seds-qr-generator
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.