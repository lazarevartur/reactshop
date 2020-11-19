import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color, countStars, step }) => {
  const stars = new Array(countStars).fill('').map((_, index) => {
    let i = index + 1
    return (
      <span key={value + i}>
        <i
          style={{ color }}
          className={
            value >= i
              ? 'fas fa-star'
              : value >= i - step
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
  countStars: 5,
  step: 0.5,
  value: 0,
  text: 'Reviews',
}
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  countStars: PropTypes.number,
}

export default Rating
