'use strict';

var utils = require('../utils/writer.js');
var Boxoffice = require('../service/BoxofficeService');

module.exports.getBoxoffice = function getBoxoffice (req, res, next) {
  var isDetailRequired = req.swagger.params['isDetailRequired'].value;
  Boxoffice.getBoxoffice(isDetailRequired)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
