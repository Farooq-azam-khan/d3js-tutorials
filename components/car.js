export const formatCar = car =>
  `${car.year} ${car.make} ${car.model}: ${car.price}`;

export const filterByPrice = (cars, price) =>
  cars.filter(car => car.price < price);
