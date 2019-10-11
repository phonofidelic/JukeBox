[![Build Status](https://travis-ci.org/phonofidelic/JukeBox.svg?branch=master)](https://travis-ci.org/phonofidelic/JukeBox)

# What this is:

Jukebox is a web application for storing and streaming audio files in the cloud. Once authenticated, users are able to upload files through the application. A backend process scrapes each uploaded file for metadata and additional information can be added by enabling the “Import meta-data from Discogs” option. Once files have been added, they can be browsed and played from the Library. Additional album and artist details can also be viewed.

Files are stored on the Amazon S3 storage system while metadata and user info is maintained in a MongoDB database hosted on mLab. Continuous integration and deployment is maintained using Travis CI to test and deploy a multi-container Docker environment to Amazon’s Elastic Beanstalk.

## [Demo](https://www.phonostream.com)

## Instalation and setup:

1. `git clone https://github.com/phonofidelic/JukeBox.git && cd JukeBox && npm install`

2. In `Jukebox/sever` run `npm install`
3. Create a .env file in the server directory (substitute <...> with appropriate values):

```

PORT=3001
JWT_SECRET=<your JWT secret>
JWT_EXP=<token lifetime (eg. 15m)>
JWT_AUD=<a name for the client app>
JWT_ISS=<a name for the API server>
DB_CONNECTION=<your mondodb server connection address (for production environment)>
CLIENT_DIR=../client/build
DISCOGS_TOKEN=<your discogs api key>
TMP=tmp
```

A tmp folder needs to be created in the server directory.

4. In `JukeBox/client` run `yarn`
5. Start a local mongoDB server by running `mongod`
6. From the root project directory run `npm run dev`
