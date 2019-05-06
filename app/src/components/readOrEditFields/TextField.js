import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@aragon/ui'

const TextField = ({ value, placeholder, size }) => (
  <Fragment>
    {value ? (
      <Text size={size}>{value}</Text>
    ) : (
      <Text size={size} color="grey">
        {placeholder}
      </Text>
    )}
  </Fragment>
)

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

export default TextField
