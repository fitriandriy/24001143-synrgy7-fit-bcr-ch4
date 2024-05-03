async function filterData(e) {
  const driverType = document.getElementById('driverType').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const totalPassengers = document.getElementById('passengers').value;
  const body = JSON.stringify({
      driverType,
      date,
      time,
      totalPassengers
  });

  e.preventDefault();
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body
      });

      responseData = await response.json();

      const carComponent = new Car(responseData);
      carComponent.render();

      console.log('Response:', responseData);
  } catch (error) {
      console.error('Error:', error.message);
  }
}