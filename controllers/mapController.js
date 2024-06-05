// mapController.js

const mapService = require('../services/mapService');

exports.setMapCenterByUserLocation = (keyword) => {
  mapService.setMapCenterByUserLocation(keyword);
};

exports.nextTo = () => {
  mapService.nextTo();
};

exports.prevTo = () => {
  mapService.prevTo();
};

exports.search = (keyword) => {
  mapService.search(keyword);
};
