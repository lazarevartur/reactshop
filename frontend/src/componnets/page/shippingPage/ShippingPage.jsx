import React, { useEffect, useState } from "react";
import { FormContainer, FormInput } from "../../index";
import { Button, Form } from "react-bootstrap";
import {
  cartChangeCheckOutPage,
  cartSaveAddress,
} from "../../../redux/action/cartAction";
import { useDispatch, useSelector } from "react-redux";
import StepList from "../../StepList/StepList";

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, checkoutPage } = cart.checkout;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostalCode] = useState(shippingAddress.postCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      address,
      city,
      postCode,
      country,
    };
    dispatch(cartSaveAddress(data));
    dispatch(cartChangeCheckOutPage(checkoutPage + 1));
    history.push("/payment");
  };
  useEffect(() => {
    dispatch(cartChangeCheckOutPage(1));
  }, []);
  return (
    <FormContainer>
      <StepList current={checkoutPage} />
      <h1>Shipping</h1>
      <Form onSubmit={formHandler}>
        <FormInput
          name="Address"
          value={address}
          placeholder="Enter your Address"
          handler={(e) => setAddress(e.target.value)}
        />
        <FormInput
          name="City"
          value={city}
          placeholder="City"
          handler={(e) => setCity(e.target.value)}
        />
        <FormInput
          name="Country"
          value={country}
          placeholder="Country"
          handler={(e) => setCountry(e.target.value)}
        />
        <FormInput
          name="Post Code"
          value={postCode}
          placeholder="Postal Code"
          handler={(e) => setPostalCode(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
