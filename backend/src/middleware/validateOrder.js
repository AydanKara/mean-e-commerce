export const validateOrder = (req, res, next) => {
  const { orderItems, shippingInfo, paymentMethod, totalPrice } = req.body;

  if (!orderItems || !orderItems.length) {
    return res.status(400).json({ message: "Order items are required" });
  }
  if (
    !shippingInfo ||
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.zipCode ||
    !shippingInfo.country
  ) {
    return res
      .status(400)
      .json({ message: "Shipping information is incomplete" });
  }
  if (!paymentMethod) {
    return res.status(400).json({ message: "Payment method is required" });
  }
  if (typeof totalPrice !== "number" || totalPrice <= 0) {
    return res.status(400).json({ message: "Total price is invalid" });
  }

  next();
};
