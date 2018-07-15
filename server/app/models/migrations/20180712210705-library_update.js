'use strict';
const Artist = require('../artist.model');

module.exports = {

  up(db, next) {
    // TODO write your migration here
    db.collection('tracks').find({})
    .toArray(
    //   (err, tracks) => {
    // 	if (err) return console.error(err);
    // 	// console.log('### tracks:', tracks);

    	// Loop through tracks
    	// tracks.forEach(track => {
    		
    		// if (typeof track.artist !== 'string') return console.log('track.artist is not a string:', track.artist);
      //       console.log('track.artist:', track.artist);
    		// // console.log('after typecheck')

    		// return db.collection('artists').findOne({name: track.artist})
    		// .then((artist) => {
    		//   return console.log('### artist:', artist);
    		// })
    		// .catch(err => console.log(err))

            // Artist.findOne({ name: track.artist }, (err, artist) => {
            //     if (err) return console.error('# Error:', err);
            //     return console.log('### artist:'. artist);
            // })
    	// })
      // return tracks;
    // }
    )
    .then(tracks => {

        // console.log('### tracks:', tracks);
        // Loop through tracks
        tracks.forEach(track => {
          
          if (typeof track.artist !== 'string') return console.log('track.artist is not a string:', track.artist);
          console.log('track.artist:', track.artist);
          // console.log('after typecheck')

          // console.log('### db:', 
          //   db.collection('artists')
          //   .findOne({name: track.artist})
          //   .then(artist => {
          //     console.log('### artist:', artist)
          //   })
          //   .catch(err => console.error(err))
          // )

          return db.collection('artists').findOne({name: track.artist})
          .then((artist) => {
            console.log('### artist:', artist);
          })
          .catch(err => console.log(err))

              // Artist.findOne({ name: track.artist }, (err, artist) => {
              //     if (err) return console.error('# Error:', err);
              //     return console.log('### artist:'. artist);
              // })
        })
    })
    .catch(err => console.error(err));

    next();
  },

  down(db, next) {
    // TODO write the statements to rollback your migration (if possible)
    next();
  }

};