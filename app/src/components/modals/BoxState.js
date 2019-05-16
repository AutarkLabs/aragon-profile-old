import React from 'react'
import PropTypes from 'prop-types'
import { Text, IconCheck, IconAttention, IconError } from '@aragon/ui'
import styled from 'styled-components'

import { FlexDirectionRow, FlexDirectionCol } from '../styled-components'
import { ModalWrapper } from './ModalWrapper'

const UnlockingProfStatus = ({
  unlockingProf,
  unlockedProf,
  unlockedProfSuccess,
}) => {
  let Icon
  let text
  if (unlockingProf) {
    Icon = IconAttention
    text = 'Waiting for signature...'
  }
  if (unlockedProfSuccess) {
    Icon = IconCheck
    text = 'Message signed!'
  }
  if (unlockedProf) {
    Icon = IconError
    text = 'Error signing message'
  }

  return (
    <AlignColCenter>
      <Text smallcaps>Grant Aragon Access to your 3Box</Text>
      <Icon width="100px" height="100px" />
      <Text>{text}</Text>
    </AlignColCenter>
  )
}

const BoxState = ({
  messageSigning: {
    unlockingProf,
    unlockedProf,
    unlockedProfSuccess,
    creatingProf,
    createdProf,
    createdProfSuccess,
  },
}) => {
  console.log(
    unlockingProf,
    unlockedProf,
    unlockedProfSuccess,
    creatingProf,
    createdProf,
    createdProfSuccess
  )

  return (
    <ModalWrapper title="3BOX">
      <Text size="large" style={{ margin: '1.5rem 0 2rem 0' }}>
        Your wallet should open and you need to sign [two] messages after
        another to create your profile and save your updates.
      </Text>
      <FlexDirectionRow>
        <UnlockingProfStatus
          unlockingProf={unlockingProf}
          unlockedProf={unlockedProf}
          unlockedProfSuccess={unlockedProfSuccess}
        />
      </FlexDirectionRow>
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

const AlignColCenter = styled(FlexDirectionCol)`
  align-items: center;
`

export default BoxState
