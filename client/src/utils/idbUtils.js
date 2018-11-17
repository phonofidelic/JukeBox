import idb from 'idb';

const IDB_VERSION = 1;

const dbPromise = idb.open('jukebox', IDB_VERSION, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('tracks', {
        keyPath: '_id'
      });
  }
});

export const idbTrack = {
  getAll: () => {
    return dbPromise
      .then(db => {
        return db
          .transaction('tracks')
          .objectStore('tracks')
          .getAll();
      })
      .then(tracks => {
        // console.log('idbFeatures.getAll, routes:', routes);
        return tracks;
      })
      .catch(err => console.error(err));
  },
  setAll: data => {
    dbPromise.then(db => {
      const tx = db.transaction('tracks', 'readwrite');
      data.forEach(item => {
        tx.objectStore('tracks').put(item);
      });
      return tx.complete;
    });
  }
};