import React from 'react'
import { Step } from './Step'
import { Nav } from 'react-bootstrap'

const StepList = ({steps, current}) => {
  const onDisplay = (() => {
    if (current > steps.length + 1 || current <= 0 || !Array.isArray(steps)) {
      return 'Error StepList'
    }
    return steps.map((step, i) => {
      let currentStep = i + 1 === current
      let prevStep = i + 1 < current
      return <Step
        key={ step }
        step={ step }
        current={ currentStep }
        prevStep={ prevStep }
      />
    })
  })()
  return (
      <Nav className='justify-content-center mb-2'>
        { onDisplay }
      </Nav>
  )
}

export default StepList

StepList.defaultProps = {
  steps: [
    'shipping',
    'payment',
    'place order'
  ]
}