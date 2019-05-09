import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CardWrapper from '../../wrappers/styleWrappers/CardWrapper'

import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import { open } from '../../stateManagers/modal'
import { TextField, SafeLink } from '../readOrEditFields'
import { EditIcon, AlignRight } from '../styled-components'

const InformationCard = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  const userLoaded = !!boxes[ethereumAddress]

  const getValue = field => {
    if (!userLoaded) return ''
    return boxes[ethereumAddress].publicProfile[field] || ''
  }

  return (
    <CardWrapper>
      <AlignRight
        tabindex="0"
        role="button"
        onClick={() => dispatchModal(open('basicInformation'))}
      >
        <EditIcon />
      </AlignRight>
      <AlignItemsCenter>
        <TextField
          value={getValue('name')}
          placeholder={'Name'}
          size="xxlarge"
        />
        <SmallMargin />
        <TextField value={getValue('job')} placeholder={'Job'} size="normal" />
        <SmallMargin />
        <TextField
          value={getValue('employer')}
          placeholder={'Employer'}
          size="normal"
        />
        <SmallMargin />
        <TextField
          value={getValue('location')}
          placeholder={'Location'}
          size="normal"
        />
        <SmallMargin />
        <SafeLink
          value={getValue('website')}
          placeholder={'Website'}
          size="normal"
        />
        <SmallMargin />
        <TextField
          value={getValue('school')}
          placeholder={'Education'}
          size="normal"
        />
        <SmallMargin />
        <TextField
          value={getValue('description')}
          placeholder={'Description'}
          size="normal"
        />
      </AlignItemsCenter>
    </CardWrapper>
  )
}

InformationCard.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

const AlignItemsCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`

const SmallMargin = styled.div`
  margin-top: 0.6rem;
`

export default InformationCard
