const axios = require('axios');

async function filterData() {
  const driverType = document.getElementById('driverType').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const totalPassengers = document.getElementById('passengers').value;

  const body = {
    driverType,
    date,
    time,
    totalPassengers
  }

  try {
    const response = await axios.post('http://localhost:9000/data', body);
    const filteredData = response.data;
    displayFilteredData(filteredData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = {
  filterData
}