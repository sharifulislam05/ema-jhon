import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../Products/Products";

const ProductDetails = () => {
  const { productkey } = useParams();
  const [product, setProduct] = useState({});
  //product details
  useEffect(() => {
    fetch(`https://dry-mountain-11982.herokuapp.com/product/${productkey}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div>
      <h1 className="text-center mb-5">your product details</h1>
      <Products products={product} showCartBtn={false} />
    </div>
  );
};

export default ProductDetails;
