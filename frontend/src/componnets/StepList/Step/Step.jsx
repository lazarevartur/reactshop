import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { capitalaze, normalazeUrl } from '../../../utils/util'

const Step = ({step, ...stepType}) => {
  const {current, prevStep} = stepType
  return (
    <Nav.Item>
      <LinkContainer to={normalazeUrl(step)}>
        <Nav.Link className={`${current ? 'font-weight-bold': ''}`}
                  disabled={!(current || prevStep) }
        >{ capitalaze(step) }</Nav.Link>
      </LinkContainer>
    </Nav.Item>
  )
}

export default Step
