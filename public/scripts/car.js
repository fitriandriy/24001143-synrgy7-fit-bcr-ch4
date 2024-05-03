class Car extends Component {
	constructor(data) {
		super(data);
	}

	render() {
		const resultDiv = document.getElementById('result');
		resultDiv.innerHTML = '';

		console.log(typeof this.data)

		if (typeof this.data == 'string') {
			resultDiv.textContent = 'Data not found.';
			return;
		} else if(typeof this.data !== 'string') {
			this.data.forEach(item => {
				let cardHTML = `
					<div class="relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 card border-2 p-5 rounded-lg">
						<div class="h-[200px] w-full overflow-hidden">
							<img class="" src="${item.image}" alt="Car Image">
						</div>
						<div class="my-6">
							<p>${item.type}/${item.model}</p>
							<p class="font-bold my-2">Rp ${item.rentPerDay} / hari</p>
							<p>${item.description}</p>
							<div class="flex mt-2">
								<img class="w-[20px] mr-2" src="./images/capacity.png" alt="capacity">
								<p>${item.capacity} orang</p>
							</div>
							<div class="flex my-2">
								<img class="w-[20px] mr-2" src="./images/transmission.png" alt="transmission">
								<p>${item.transmission}</p>
							</div>
							<div class="flex mb-16">
								<img class="w-[20px] mr-2" src="./images/year.png" alt="year">
								<p>Tahun ${item.year}</p>
							</div>
						</div>
						<button class="absolute bottom-5 bg-[#5CB85F] text-white w-[89%] py-2">Pilih Mobil</button>
					</div>
				`;
				resultDiv.innerHTML += cardHTML;
			});
		}
	}
}