import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getDetailProduct } from '../../../redux/action/productListAction'
import Rating from '../../cardItem/rating/Rating'
import Loader from '../../loader/Loader'
import { cartAddItem } from '../../../redux/action/cartAction';

const ProductPage = ({match, history}) => {
  const [qty, setQty] = React.useState(1)
  const dispatch = useDispatch()
  const {product, loading} = useSelector((state) => state.productDetail)

  React.useEffect(() => {
    dispatch(getDetailProduct(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    // редирект на корзину. Устанавливаем в url id товара и его колово
    dispatch(cartAddItem(product._id, qty))
    history.push(`/cart/${product._id}?qty=${qty}`)
  }

  if (loading) return <Loader/>
  const isStock = product.countInStock > 0
  return (
    <>
      <Link className="btn btn light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={ 6 }>
          <Image src={ product.image } alt={ product.name } fluid/>
        </Col>
        <Col md={ 3 }>
          <ListGroup variant={ 'flush' }>
            <ListGroup.Item>{ product.name }</ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={ product.rating }
                text={ `${ product.numReviews } Reviews` }
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: { product.description }</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={ 3 }>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{ product.price }</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{ isStock ? 'In Stock' : 'Out of Stock' }</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              { isStock &&
              <ListGroup.Item>
                <Row>
                  <Col>
                    Count
                  </Col>
                  <Col>
                    <Form.Control as="select" value={ qty } onChange={(e) => setQty(+e.target.value) }>
                      { [...Array(product.countInStock).keys()].map((x) => {
                        return <option key={x+1} value={x+1}>{x + 1 }</option>
                      })}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
              }
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={addToCartHandler}
                      disabled={ !isStock }
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
