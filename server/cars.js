const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'data', 'cars.json');

const filter = async (date, passengers) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const cars = JSON.parse(data);
    
    const result = cars.filter((car) => {
      return car.availableAt.slice(0, 10) >= date && car.capacity >= passengers
    });

    if (result.length > 0) {
      return result
    } else {
      return 'Data Not Found!'
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = {
  filter
}