import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  //get all product from database
  useEffect(() => {
    fetch("https://dry-mountain-11982.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, [allProducts]);
  //handle single product add to cart
  const handleAddToCart = (product) => {
    const toBeAddedItem = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedItem);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedItem);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    addToDatabaseCart(product.key, count);
    setCart(newCart);
  };
  //update cart when add product to cart
  useEffect(() => {
    const cartItems = getDatabaseCart();
    const productKey = Object.keys(cartItems);
    if (allProducts.length > 0) {
      const product = productKey.map((key) => {
        const reviewProduct = allProducts.find((pd) => pd.key === key);
        reviewProduct.quantity = cartItems[key];
        return reviewProduct;
      });
      setCart(product);
    }
  }, [allProducts]);

  return (
    <div className="row">
      <div
        className="shop__products col-md-9"
        style={{ borderRight: "1px solid gray" }}
      >
        {allProducts.map((pd) => (
          <Products
            products={pd}
            handleAddToCart={handleAddToCart}
            showCartBtn={true}
            key={pd.key}
          />
        ))}
      </div>
      <div className="shop__cart col-md-3">
        <Cart products={cart}>
          <Link to="/review">
            <button className="btn btn-warning">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
