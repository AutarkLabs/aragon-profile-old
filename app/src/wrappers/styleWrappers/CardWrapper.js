import React from 'react'
import PropTypes from 'prop-types'
import { Card, Text } from '@aragon/ui'

const CardWrapper = ({ children, title, addMore }) => (
  <div style={{ width: '100% ' }}>
    {title && (
      <Text style={{ padding: '0.5rem 0' }} size="large">
        {title}
      </Text>
    )}
    {addMore && (
      <Text
        style={{ paddingLeft: '1rem' }}
        size="small"
        onClick={() => addMore()}
      >
        Add more
      </Text>
    )}
    <Card width="100%">{children}</Card>
  </div>
)

CardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  addMore: PropTypes.func,
}

export default CardWrapper
