import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  //all product insert to database
  const handleAddProduct = () => {
    fetch("https://dry-mountain-11982.herokuapp.com/addProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fakeData),
    }).then((res) => {
      if (res) {
        alert("all data inserted successfully");
      }
    });
  };

  return (
    <div>
      <h3>Manage Inventory</h3>
      <button onClick={handleAddProduct} className="btn btn-success">add product</button>
    </div>
  );
};

export default Inventory;
