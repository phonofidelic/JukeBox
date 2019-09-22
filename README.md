[![Build Status](https://travis-ci.org/phonofidelic/JukeBox.svg?branch=master)](https://travis-ci.org/phonofidelic/JukeBox)

# What this is:

A web-app for uploading and streaming audio files.

The application connects to the users Google Drive account, using it to store audio files to be streamed to the Jukebox client. Users can upload files through the client and have the option of letting the app use Discogs to add any missing metadata like cover art, artist/album into etc. This data is saved to a MongoDB database and can be edited by the user through the client interface.

## Instalation and setup:

1. `git clone https://github.com/phonofidelic/JukeBox.git && cd JukeBox && npm install`

2. In `Jukebox/sever` run `npm install`
3. Create a .env file in the server directory (substitute <...> with appropriate values):

```

PORT=3001
PROD_API_ROOT=<root URL for production API>
JWT_SECRET=<your JWT secret>
JWT_EXP=<token lifetime (eg. 15m)>
JWT_AUD=jukebox_client
JWT_ISS=jukebox_api
DB_CONNECTION=<your mondodb server connection address (for production environment)>
FS_AUDIO=uploads/audio
FS_IMAGE=uploads/images
CLIENT_DIR=../client/build
DISCOGS_TOKEN=<your discogs api key>
G_CLIENT_ID=<google client ID>
G_CLIENT_SECRET=<google client sectret>
G_REDIRECT_URI=gdrive/authcode
TMP=tmp
```

A tmp folder needs to be created in the server directory.

4. In `JukeBox/client` run `yarn`
5. Start a local mongoDB server by running `mongod`
6. From the root project directory run `npm run dev`

## Build:

1. Create a Dockerfile in the root directory (substitute <...> with appropriate values):

```
FROM node:carbon

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm run prodinstall

EXPOSE 8080

<enter environment variables here in the format 'ENV {key}={value}'>

CMD [ "npm", "start" ]
```

2. Run `npm run build`
