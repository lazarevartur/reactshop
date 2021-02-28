import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, resetOrders } from "../../redux/action/orderAction";
import { Loader, Message } from "../index";

const Orders = () => {
  const dispatch = useDispatch();
  //TODO обработать ошибку
  const { orders, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>DETAILS</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loader as={"tr"} />
        ) : error ? (
          error && <Message variant="danger">{error}</Message>
        ) : (
          orders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDeliverd ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button size="sm">DETAILS</Button>
                  </LinkContainer>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

Orders.defaultProps = {};

export default Orders;
