import React, { useState } from 'react'
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useServices from '../../../hooks/useServices'
import Rating from '../../cardItem/rating/Rating'

const ProductPage = ({ match }) => {
  const { getProduct } = useServices()
  const [item, setItem] = useState({})

  React.useEffect(() => {
    const fetch = async () => {
      const data = await getProduct(match.params.id)
      setItem(data)
    }
    fetch()
  }, [match, getProduct])
  const isStock = item.countInStock > 0
  return (
    <>
      <Link className="btn btn light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={item.image} alt={item.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant={'flush'}>
            <ListGroup.Item>{item.name}</ListGroup.Item>
            <ListGroup.Item>
              <Rating value={item.rating} text={`${item.numReviews} Reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Description: {item.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{item.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{isStock ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={!isStock}
                    >
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductPage
