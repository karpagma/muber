'use strict';

const Driver = require('../models/driver');

const DriversController = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  async index(req, res, next) {
    try {
      const { lng, lat } = req.query;

      const drivers = await Driver.geoNear(
        {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        {
          spherical: true,
          maxDistance: 200000
        }
      );

      res.send(drivers);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const driverProps = req.body;
      const driver = await Driver.create(driverProps);
      res.send(driver);
    } catch (e) {
      next(e);
    }
  },

  async edit(req, res, next) {
    try {
      const driverId = req.params.id;
      const driverProps = req.body;

      await Driver.findByIdAndUpdate({ _id: driverId }, driverProps);
      let driver = await Driver.findById({ _id: driverId });
      res.send(driver);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const driverId = req.params.id;
      const driver = await Driver.findByIdAndRemove({ _id: driverId });
      res.status(204).send(driver);
    } catch (e) {
      next(e);
    }
  }
};

module.exports = DriversController;
