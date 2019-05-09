import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Text, theme } from '@aragon/ui'
import { IconPencil, IconTrash } from '../assets/'
import { unixToEducationDate } from '../utils'

const EducationHistoryTile = ({ educationHistoryData, openModal }) => (
  <SingleEducationItem>
    <Details>
      <Text.Block size="large" style={{ fontWeight: '700' }}>
        {educationHistoryData.organization}
      </Text.Block>
      <Text.Block size="normal" style={{ fontWeight: '600' }}>
        {educationHistoryData.degree}
      </Text.Block>
      <Text.Block size="xsmall" style={{ fontColor: theme.textTertiary }}>
        {unixToEducationDate(educationHistoryData.startDate)}
        {' - '}
        {educationHistoryData.endDate
          ? unixToEducationDate(educationHistoryData.endDate)
          : 'Present'}
      </Text.Block>
    </Details>
    <Icons>
      <IconPencil width="16px" onClick={() => openModal()} />
      <IconTrash width="16px" onClick={() => openModal()} />
    </Icons>
  </SingleEducationItem>
)
const SingleEducationItem = styled.div`
  display: flex;
  > * {
    margin-bottom: 0.2rem;
  }
`
const Icons = styled.div`
  display: inline-flex;
  width: auto;
  flex-direction: column;
  visibility: hidden;
  > * {
    margin: 0 0 0.6rem 0.6rem;
  }
  ${SingleEducationItem}:hover & {
    visibility: visible;
  }
}
`
const Details = styled.div`
  width: 100%;
  > * {
    margin-bottom: 0.5rem;
  }
`

EducationHistoryTile.propTypes = {
  educationHistoryData: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default EducationHistoryTile
