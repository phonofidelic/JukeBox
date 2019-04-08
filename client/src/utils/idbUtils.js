import { openDB } from 'idb';

const IDB_VERSION = 1;

const db = openDB('jukebox', IDB_VERSION, {
	upgrade(db) {
		const store = db.createObjectStore('tracks', {
			keyPath: '_id'
		});
		store.createIndex('title', 'title')
	}
});

export const idbTrack = {
	getAll: async () => {
		return (await db).getAllFromIndex('tracks', 'title');
	},
	addMany: async data => {
    const tx = (await db).transaction('tracks', 'readwrite');
    data.forEach(item => {
      tx.store.add(item);
    });
    await tx.done;
	},
	put: async data => {
		const tx = (await db).transaction('tracks', 'readwrite');
		tx.store.put(data);
		await tx.done;
	},
	delete: async id => {
		const tx = (await db).transaction('tracks', 'readwrite');
		tx.store.delete(id);
		await tx.done;
	}
};

export const clearIdb = () => {

}
