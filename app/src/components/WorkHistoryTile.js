import React from 'react'
import PropTypes from 'prop-types'

import { Text, Card } from '@aragon/ui'
import { SmallMargin, EditIcon, AlignRight } from './styled-components'
import { unixToCalendar } from '../utils'

const WorkHistoryTile = ({
  description,
  employer,
  endDate,
  jobTitle,
  openModal,
  startDate,
}) => {
  return (
    <div>
      <Card height="100%">
        <AlignRight tabindex="0" role="button" onClick={() => openModal()}>
          <EditIcon />
        </AlignRight>
        <Text size="large">{employer}</Text>
        <SmallMargin />
        <Text size="normal">{jobTitle}</Text>
        <SmallMargin />
        <Text size="small" color="grey">{`${unixToCalendar(
          startDate
        )} --- ${unixToCalendar(endDate)}`}</Text>
        <SmallMargin />
        <Text size="normal">{description}</Text>
      </Card>
    </div>
  )
}

WorkHistoryTile.propTypes = {
  employer: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default WorkHistoryTile
