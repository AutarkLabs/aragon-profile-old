import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Text, theme } from '@aragon/ui'
import { IconPencil, IconTrash } from '../assets/'

const WorkHistoryTile = ({ workHistoryData, openModal }) => {
  let startDate
  if (workHistoryData.startYear) {
    if (workHistoryData.startMonth) {
      startDate = workHistoryData.startMonth + ' ' + workHistoryData.startYear
    } else startDate = workHistoryData.startYear
  } else startDate = '?'

  let endDate
  if (workHistoryData.endYear) {
    if (workHistoryData.endMonth) {
      endDate = workHistoryData.endMonth + ' ' + workHistoryData.endYear
    } else endDate = workHistoryData.endYear
  } else if (workHistoryData.endYear === 0) {
    endDate = 'Present'
  } else endDate = '?'

  return (
    <SingleWorkItem>
      <Details>
        <Text.Block size="large" style={{ fontWeight: '700' }}>
          {workHistoryData.workPlace}
        </Text.Block>
        <Text.Block size="normal" style={{ fontWeight: '600' }}>
          {workHistoryData.jobTitle}
          <Text
            size="xsmall"
            color={theme.textTertiary}
            style={{ marginLeft: '1rem' }}
          >
            {startDate}
            {' - '}
            {endDate}
          </Text>
        </Text.Block>
        <Text.Block size="normal">{workHistoryData.description}</Text.Block>
      </Details>
      <Icons>
        <IconPencil width="16px" onClick={() => openModal()} />
        <IconTrash width="16px" onClick={() => openModal()} />
      </Icons>
    </SingleWorkItem>
  )
}

const SingleWorkItem = styled.div`
  display: flex;
  > :not(:last-child) {
    margin-bottom: 0.4rem;
  }
`
const Icons = styled.div`
  display: inline-flex;
  width: auto;
  flex-direction: column;
  visibility: hidden;
  > * {
    margin: 0 0 0.6rem 0.6rem;
    cursor: pointer;
  }
  ${SingleWorkItem}:hover & {
    visibility: visible;
  }
}
`
const Details = styled.div`
  width: 100%;
  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

WorkHistoryTile.propTypes = {
  workHistoryData: PropTypes.shape({
    workPlace: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default WorkHistoryTile
