const trackRoutes = require('./track_routes');

module.exports = (app, db) => {
	trackRoutes(app, db);
}