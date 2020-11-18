import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
  const stars = new Array(5).fill('').map((_, index) => {
    let i = index + 1
    return (
      <span key={value + i}>
        <i
          style={{ color }}
          className={
            value >= i
              ? 'fas fa-star'
              : value >= i - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    )
  })
  const desc = <span className="mx-1">{text}</span>
  return (
    <div className="rating">
      {stars}
      {text && desc}
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
