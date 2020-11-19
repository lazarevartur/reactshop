import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './rating/Rating'
const CardItem = ({ _id, image, name, rating, numReviews, price }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img variant="top" src={image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div">{name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={rating} text={`${numReviews} Reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="h3">{price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardItem
