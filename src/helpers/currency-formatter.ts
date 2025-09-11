export const currencyFormater = (price: number) =>
  new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
    minimumFractionDigits: 2,
  }).format(price);
