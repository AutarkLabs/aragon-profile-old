import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@aragon/ui'

import { ModalWrapper } from './ModalWrapper'

const BoxState = ({ messageSigning }) => {
  console.log(messageSigning)
  return (
    <ModalWrapper title="3BOX">
      <Text size="large" style={{ margin: '1.5rem 0 2rem 0' }}>
        Your wallet should open and you need to sign [two] transactions after
        another to create your profile and save your updates.
      </Text>
    </ModalWrapper>
  )
}

BoxState.propTypes = {
  messageSigning: PropTypes.shape({
    unlockingProf: PropTypes.bool.isRequired,
    unlockedProf: PropTypes.bool.isRequired,
    unlockedProfSuccess: PropTypes.bool.isRequired,
    creatingProf: PropTypes.bool.isRequired,
    createdProf: PropTypes.bool.isRequired,
    createdProfSuccess: PropTypes.bool.isRequired,
  }).isRequired,
}

export default BoxState
