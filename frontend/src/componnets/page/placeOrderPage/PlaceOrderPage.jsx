import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartChangeCheckOutPage,
  cartReset,
} from "../../../redux/action/cartAction";
import StepList from "../../StepList/StepList";
import { Message } from "../../index";
import { Col, ListGroup, Row } from "react-bootstrap";
import { OrderItems } from "../../orderItems";
import { createOrder } from "../../../redux/action/orderAction";
import { OrderSummary } from "../../orderSummary";

const PlaceOrderPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { success, error, order } = useSelector((state) => state.orderCreate);
  const { cartItems } = cart;
  const { checkoutPage, paymentMethod, shippingAddress } = cart.checkout;
  const isEmptyCart = cartItems.length === 0;
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState({});

  useEffect(() => {
    dispatch(cartChangeCheckOutPage(3));
    return () => {
      dispatch(cartReset());
    };
  }, []);
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success]);

  const totalPriceItems = +cartItems
    .reduce((sum, product) => {
      return sum + product.price * product.qty;
    }, 0)
    .toFixed(2);
  const shippingPrice = totalPriceItems > 100 ? 0 : 100;
  const tax = +(totalPriceItems * 0.2).toFixed(2);
  const totalPrice = +(totalPriceItems + shippingPrice + tax).toFixed(2);
  useEffect(() => {
    setNewOrder((state) => {
      return {
        ...state,
        totalPriceItems,
        shippingPrice,
        tax,
        totalPrice,
      };
    });
  }, []);
  const handlerForm = () => {
    const order = {
      ...newOrder,
      paymentMethod,
      shippingAddress,
      orderItems: cart.cartItems,
    };
    dispatch(createOrder(order));
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6}>
          <StepList current={checkoutPage} />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                Address: {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>Method: {paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {isEmptyCart ? (
                <Message variant="info"> You cart is empty </Message>
              ) : (
                <ListGroup variant={"flush"}>
                  {cartItems.map((product) => (
                    <OrderItems key={product._id} {...product} {...dispatch} />
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummary
            {...newOrder}
            isDisabled={isEmptyCart}
            error={error}
            onClick={handlerForm}
          />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
