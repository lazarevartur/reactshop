import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getDetailProduct } from '../../../redux/action/productListAction'
import Rating from '../../cardItem/rating/Rating'
import Loader from '../../loader/Loader'

const ProductPage = ({ match }) => {
  const dispatch = useDispatch()
  const { product, loading } = useSelector((state) => state.productDetail)

  React.useEffect(() => {
    dispatch(getDetailProduct(match.params.id))
  }, [dispatch, match])

  if (loading) return <Loader />
  const isStock = product.countInStock > 0
  return (
    <>
      <Link className="btn btn light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant={'flush'}>
            <ListGroup.Item>{product.name}</ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price}</strong>
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
