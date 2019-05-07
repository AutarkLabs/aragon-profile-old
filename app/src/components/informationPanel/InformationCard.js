import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from '@aragon/ui'

import { BoxContext } from '../../wrappers/box'
import { TextField, SafeLink } from '../readOrEditFields'
import { BasicInformation } from '../modals'

const InformationCard = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)

  const userLoaded = !!boxes[ethereumAddress]

  const getValue = field => {
    if (!userLoaded) return ''
    return boxes[ethereumAddress].publicProfile[field] || ''
  }

  return (
    <Fragment>
      <Card width="350px" height="500px">
        <BasicInformation ethereumAddress={ethereumAddress} />
        <AlignItemsCenter>
          <TextField
            value={getValue('name')}
            placeholder={'Name'}
            size="xxlarge"
          />
          <SmallMargin />
          <TextField
            value={getValue('job')}
            placeholder={'Job'}
            size="normal"
          />
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
      </Card>
    </Fragment>
  )
}

InformationCard.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

const AlignItemsCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`

const SmallMargin = styled.div`
  margin-top: 10px;
`

export default InformationCard
