const moment = require('moment');

function formatDateTime(date) {
  return moment(date).format('D/M/YYYY'); 
}

module.exports = { formatDateTime };
