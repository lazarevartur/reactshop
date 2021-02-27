import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Message } from "../../index";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { OrderItems } from "../../orderItems";
import { OrderSummary } from "../../orderSummary";
import {
  getDetailOrder,
  resetDetailOrder,
  resetCreateOrder,
} from "../../../redux/action/orderAction";

const OrderPage = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailOrder(match.params.id));
    return () => {
      dispatch(resetDetailOrder());
      dispatch(resetCreateOrder());
    };
  }, []);
  const orderDetail = useSelector((state) => state.orderDetail);
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
  } = orderDetail.order;
  let totalPriceItems = 0;
  if (orderItems) {
    totalPriceItems = +orderItems
      .reduce((sum, product) => {
        return sum + product.price * product.qty;
      }, 0)
      .toFixed(2);
  }

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
                  <Message variant={"success"}>Paid</Message>
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
            <OrderSummary
              tax={tax}
              shippingPrice={shippingPrice}
              totalPrice={totalPrice}
              totalPriceItems={totalPriceItems}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderPage;
