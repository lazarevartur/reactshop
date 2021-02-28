import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Message from "../message/Message";

const OrderSummary = ({
  totalPriceItems,
  shippingPrice,
  tax,
  totalPrice,
  error,
  CustomButton,
  isDisabled,
  onClick,
  isHideButton,
}) => {
  return (
    <Card>
      <ListGroup variant={"flush"}>
        <ListGroup.Item>
          <h2>ORDER SUMMARY</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${totalPriceItems}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${shippingPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>${tax}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${totalPrice}</Col>
          </Row>
        </ListGroup.Item>
        {!isHideButton ? (
          <ListGroup.Item>
            {CustomButton ? (
              CustomButton
            ) : (
              <Button
                type={"button"}
                className="btn btn-block"
                disabled={isDisabled}
                onClick={onClick}
              >
                Place Order
              </Button>
            )}
          </ListGroup.Item>
        ) : null}

        {error && <Message>{error}</Message>}
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
OrderSummary.defaultProps = {
  isHideButton: false,
};
