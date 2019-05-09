import React from 'react'
import PropTypes from 'prop-types'
import { Card, Text } from '@aragon/ui'
import styled from 'styled-components'

const CardWrapper = ({ children, title, addMore, addSeparators = false }) => (
  <div style={{ width: '100%' }}>
    {title && (
      <Text style={{ padding: '0.5rem 0' }} size="xlarge">
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
    {children && (
      <StyledCard addSeparators={addSeparators}>{children}</StyledCard>
    )}
  </div>
)

CardWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  addMore: PropTypes.func,
  addSeparators: PropTypes.bool,
}

const StyledCard = styled(Card).attrs({ width: '100%', height: 'auto' })`
  padding: 1.2rem;
  > :not(:last-child) {
    margin-bottom: 1rem;
    border-bottom: ${({addSeparators}) => addSeparators ? '1px solid #EEE' : '0'};
  }
`

export default CardWrapper
