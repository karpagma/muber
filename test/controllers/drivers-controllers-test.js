const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');
const app = require('../../src/app');

describe('drivers controller', async () => {
  it('post to /api/drivers creates a new driver', async () => {
    // Arrange
    const startCount = await Driver.count();

    // Act
    await request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' });

    // Assert
    const newCount = await Driver.count();
    expect(newCount).to.equal(startCount + 1);
  });

  it('put to /api/drivers/id edits an existing driver', async () => {
    // Arrange
    const driver = new Driver({ email: 't@t.com', driving: false });
    await driver.save();

    // Act
    await request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true });

    // Assert
    const updatedDriver = await Driver.findOne({ email: 't@t.com' });
    expect(updatedDriver.driving).to.equal(true);
  });

  it('delete to /api/drivers/id deletes an existing driver', async () => {
    // Arrange
    const driver = new Driver({ email: 't@t.com', driving: false });
    await driver.save();

    // Act
    await request(app)
      .delete(`/api/drivers/${driver._id}`)
      .send();

    // Assert
    const deletedDriver = await Driver.findOne({ email: 't@t.com' });
    expect(deletedDriver).to.equal(null);
  });

  it.only('get to /api/drivers finds drivers in a location', async () => {
    // Arrange
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628]
      }
    });
    const miaimiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    });

    await Promise.all([seattleDriver.save(), miaimiDriver.save()]);

    // Act
    const response = await request(app)
      .get('/api/drivers?lng=-80&lat=25')
      .send();
    expect(response.body.length).to.equal(1);
    expect(response.body[0].obj.email).to.equals('miami@test.com');
  });
});
