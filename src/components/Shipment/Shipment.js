import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import happayImage from "../../images/giphy.gif";
import "./_shipment.scss";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [happay, setHappay] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();
  //handle order shipment
  const onSubmit = (data) => {
    const saveCart = getDatabaseCart();
    const orderInfo = {
      userInfo: data,
      cartInfo: saveCart,
      orderTime: new Date(),
    };
    fetch("https://dry-mountain-11982.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderInfo),
    }).then((res) => {
      if (res) {
        processOrder();
        setHappay(true);
        alert("order is successfully");
      }
    });
  };

  return (
    <>
      <h1 className="ml-5">this is a Shipment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="shipment__form ml-5">
        <input
          name="name"
          ref={register({ required: true })}
          defaultValue={loggedInUser.name}
          placeholder="Name"
        />
        {errors.email && (
          <span className="text-danger ml-3">Name is required</span>
        )}

        <input
          name="email"
          ref={register({ required: true })}
          defaultValue={loggedInUser.email}
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-danger ml-3">Emails is required</span>
        )}

        <input
          name="phone"
          type="number"
          ref={register({ required: true })}
          placeholder="Phone"
        />
        {errors.phone && (
          <span className="text-danger ml-3">Phone is required</span>
        )}

        <input
          name="address"
          ref={register({ required: true })}
          placeholder="Address"
        />
        {errors.address && (
          <span className="text-danger ml-3">Address is required</span>
        )}

        <input type="submit" className="bg-warning" value="checkout" />
      </form>
      {happay && <img src={happayImage} alt="" />}
    </>
  );
};

export default Shipment;
