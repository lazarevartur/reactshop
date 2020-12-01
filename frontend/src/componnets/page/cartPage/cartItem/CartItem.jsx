import React from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cartAddItem, cartRemoveItem } from '../../../../redux/action/cartAction';
import { useDispatch } from 'react-redux';

const CartItem = ({_id,name,image,price, countInStock, qty}) => {
const dispatch = useDispatch()

  const deleteItemHandler = (_id) => {
    dispatch(cartRemoveItem(_id))
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Link to={`/product/${_id}`}><Image src={image} alt={name} fluid /></Link>
        </Col>
        <Col md={3}>
          <Link to={`/product/${_id}`}>{name}</Link>
        </Col>
        <Col md={2}>
          ${price}
        </Col>
        <Col md={2}>
          <Form.Control 
            as="select" 
            value={ qty } 
            onChange={(e) => dispatch(cartAddItem(_id, +e.target.value)) }>
            { [...Array(countInStock).keys()].map((x) => {
              return <option key={x+1} value={x+1}>{x + 1 }</option>
            })}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button 
            type={'button'} 
            variant={'light'}
            onClick={() => deleteItemHandler(_id)}
          >
            <i className='fas fa-trash'/></Button>
        </Col>

      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
