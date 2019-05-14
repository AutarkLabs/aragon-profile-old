import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@aragon/ui'

const RemoveItem = ({ ethereumAddress, item, onRemove }) => {
  return (
    <div>
      <Button onClick={onRemove}>remove</Button>
    </div>
  )
}

RemoveItem.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  item: PropTypes.object,
}

export default RemoveItem
