import idb from 'idb';

const IDB_VERSION = 1;

const dbPromise = idb.open('jukebox', IDB_VERSION, upgradeDb => {
  // eslint-disable-next-line
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
  putMany: data => {
    dbPromise.then(db => {
      const tx = db.transaction('tracks', 'readwrite');
      data.forEach(item => {
        tx.objectStore('tracks').put(item);
      });
      return tx.complete;
    });
  },
  put: data => {
    dbPromise.then(db => {
      const tx = db.transaction('tracks', 'readwrite');
      tx.objectStore('tracks').put(data);
      return tx.complete;
    });
  },
  delete: id => {
    dbPromise.then(db => {
      const tx = db.transaction('tracks', 'readwrite');
      tx.objectStore('tracks').delete(id);
      return tx.complete;
    });
  }
};