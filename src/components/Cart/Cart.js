import React from "react";

const Cart = (props) => {
  const product = props.products;
  const itemsPrice = product.reduce(
    (total, pd) => total + pd.price * pd.quantity,
    0
  );
  const tax = itemsPrice * 0.1;
  let shipping = 0;
  if (itemsPrice === 0) {
    shipping = 0;
  } else if (itemsPrice > 100) {
    shipping = 5;
  } else if (itemsPrice < 100) {
    shipping = 10;
  }
  let grandTotal = itemsPrice + tax + shipping;
  const grandTotalFixed = parseFloat(grandTotal);

  return (
    <div style={{ lineHeight: "15px" }}>
      <h3 className="text-center">Order Summary</h3>
      <p className="text-center">items order: {props.products.length}</p>
      <p>
        Items:{" "}
        <span className="float-right mr-5">${itemsPrice.toFixed(2)}</span>
      </p>
      <p>
        Shipping & Handling:{" "}
        <span className="float-right mr-5">${shipping}</span>
      </p>
      <p>
        Estimated Tax(10%):{" "}
        <span className="float-right mr-5">${tax.toFixed(2)}</span>
      </p>
      <p className="text-danger">
        Order Total:
        <span className="float-right mr-5">${grandTotalFixed.toFixed(2)}</span>
      </p>
      {props.children}
    </div>
  );
};

export default Cart;
