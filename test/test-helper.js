const mongoose = require('mongoose');

before(done => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/muber_test', {
    useMongoClient: true
  });

  mongoose.connection.once('open', () => done()).on('error', err => {
    console.warn('Warning', err); // eslint-disable-line
  });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
