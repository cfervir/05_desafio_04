export const locale = (price) => {
  return price.toLocaleString("es-CL");
};

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}