export const locale = (price) => {
  return price.toLocaleString("es-CL");
};

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

// Calculates total price from PizzaContext.
export const sumPizzas = (total) => {
  return total.reduce((a, b) => a + b.price, 0);
};

// Calculates how many pizzas from PizzaContext.
export const sumQty = (total) => {
  return total.reduce((a, b) => a + b.qty, 0);
};

// Checks if delivery is free or if user has to pay.
export const deliveryFee = (total) => {
  return total.reduce((a, b) => a + b.price, 0) < 11990 ? 2900 : 0;
}