import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Text } from '@aragon/ui'
import { ModalWrapper } from './ModalWrapper'
import { ModalContext } from '../../wrappers/modal'
import { close } from '../../stateManagers/modal'

const RemoveItem = ({ ethereumAddress, item, itemType, onRemove }) => {
  const { dispatchModal } = useContext(ModalContext)
  let title
  if (itemType === 'workHistory') title = 'Delete work history record'
  else if (itemType === 'educationHistory')
    title = 'Delete education history record'
  else title = 'Delete data'

  return (
    <ModalWrapper title={title}>
      <Text size="large" style={{ margin: '1.5rem 0 2rem 0' }}>
        Are you sure you want to delete it?
      </Text>
      <ButtonsRow>
        <Button compact mode="outline" onClick={() => dispatchModal(close())}>
          Cancel
        </Button>
        <Button
          compact
          mode="strong"
          style={{ background: '#FB7979' }}
          onClick={onRemove}
        >
          Delete
        </Button>
      </ButtonsRow>
    </ModalWrapper>
  )
}

const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  > * {
    margin-left: 1rem;
    width: 10rem;
  }
`

RemoveItem.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  item: PropTypes.object,
  itemType: PropTypes.string.isRequired,
}

export default RemoveItem