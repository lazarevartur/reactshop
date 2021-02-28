import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Message } from "../../index";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { OrderItems } from "../../orderItems";
import { OrderSummary } from "../../orderSummary";
import {
  getDetailOrder,
  resetDetailOrder,
  resetCreateOrder,
  payOrder,
} from "../../../redux/action/orderAction";
import { PayPalButton } from "react-paypal-button-v2";

const OrderPage = ({ match }) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetail = useSelector((state) => state.orderDetail);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const {
    _id,
    isDeliverd,
    isPaid,
    orderItems,
    paymentMethod,
    shippingAddress,
    tax,
    totalPrice,
    shippingPrice,
    paidAt,
  } = orderDetail.order;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!Object.assign(orderDetail.order).length || successPay) {
      dispatch(getDetailOrder(match.params.id));
    }
    if (!isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    return () => {
      dispatch(resetDetailOrder());
      dispatch(resetCreateOrder());
    };
  }, [successPay]);

  let totalPriceItems = 0;
  if (orderItems) {
    totalPriceItems = +orderItems
      .reduce((sum, product) => {
        return sum + product.price * product.qty;
      }, 0)
      .toFixed(2);
  }

  const successHandler = (paymentResult) => {
    dispatch(payOrder(match.params.id, paymentResult));
  };
  const test = () => {
    console.log("ura");
  };

  return (
    <>
      {orderDetail.loading ? (
        <Loader />
      ) : (
        <Row>
          <Container>
            <h1>ORDER {_id}</h1>
          </Container>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>SHIPPING</h2>
                <p>Name: {orderDetail.order.user.name}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${orderDetail.order.user.email}>`}>
                    {orderDetail.order.user.email}
                  </a>
                </p>
                <p>
                  Address: {shippingAddress.address}, {shippingAddress.city}{" "}
                  {shippingAddress.postCode}, {shippingAddress.country}
                </p>
                {isDeliverd ? (
                  <Message variant={"success"}>Delivered</Message>
                ) : (
                  <Message variant={"danger"}>Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>PAYMENT METHOD</h2>
                <p>Method: {paymentMethod}</p>
                {isPaid ? (
                  <Message variant={"success"}>Paid {paidAt}</Message>
                ) : (
                  <Message variant={"danger"}>No Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>ORDER ITEMS</h2>
                <ListGroup variant={"flush"}>
                  {orderItems.map((product) => (
                    <OrderItems key={product._id} {...product} />
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            {!sdkReady ? (
              <Loader />
            ) : (
              <OrderSummary
                tax={tax}
                shippingPrice={shippingPrice}
                totalPrice={totalPrice}
                totalPriceItems={totalPriceItems}
                isHideButton={isPaid}
                CustomButton={
                  <PayPalButton
                    amount={totalPrice}
                    onSuccess={successHandler}
                    onApprove={test}
                  />
                }
              />
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderPage;
