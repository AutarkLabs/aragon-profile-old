import React from 'react'
import PropTypes from 'prop-types'
import { Text, IconCheck, IconAttention, IconError } from '@aragon/ui'
import styled from 'styled-components'

import { FlexDirectionRow, FlexDirectionCol } from '../styled-components'
import { ModalWrapper } from './ModalWrapper'

const ProfileStatus = ({ awaitingSig, receivedSig, successfulSig, title }) => {
  let Icon
  let text
  if (awaitingSig) {
    Icon = IconAttention
    text = 'Waiting for signature...'
  }
  if (successfulSig) {
    Icon = IconCheck
    text = 'Message signed!'
  }
  if (receivedSig) {
    Icon = IconError
    text = 'Error signing message'
  }

  return (
    <AlignColCenter>
      <Text smallcaps>{title}</Text>
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
  return (
    <ModalWrapper title="3BOX">
      <Text size="large" style={{ margin: '1.5rem 0 2rem 0' }}>
        Your wallet should open and you need to sign [two] messages after
        another to create your profile and save your updates.
      </Text>
      <JustifyRowCenter>
        <ProfileStatus
          awaitingSig={unlockingProf}
          receivedSig={unlockedProf}
          successfulSig={unlockedProfSuccess}
          title="Grant aragon access to your 3box"
        />
        <ProfileStatus
          awaitingSig={creatingProf}
          receivedSig={createdProf}
          successfulSig={createdProfSuccess}
          title="Profile creation"
        />
      </JustifyRowCenter>
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

const JustifyRowCenter = styled(FlexDirectionRow)`
  justify-content: center;
`

export default BoxState
