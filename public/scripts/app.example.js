class App {
  constructor() {
    this.searchButton = document.getElementById("filter-btn");
    this.resultContainerElement = document.getElementById("result");
  }

  async init() {
    // await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.searchButton.onclick = this.run;
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.resultContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.resultContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.resultContainerElement.firstElementChild;
    }
  };
}
