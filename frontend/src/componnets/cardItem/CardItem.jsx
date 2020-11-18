import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './rating/Rating'
const CardItem = ({ _id, image, name, rating, numReviews, price }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${_id}`}>
        <Card.Img variant="top" src={image} />
      </a>

      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as="div">{name}</Card.Title>
        </a>
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
