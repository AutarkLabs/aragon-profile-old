import React from 'react'
import PropTypes from 'prop-types'

import { Text, Card } from '@aragon/ui'
import { SmallMargin } from './styled-components'
import { unixToCalendar } from '../utils'

const WorkHistoryTile = ({
  ethereumAddress,
  id,
  employer,
  jobTitle,
  description,
  startDate,
  endDate,
}) => {
  return (
    <div>
      <Card width="700px" height="100%">
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
  ethereumAddress: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  employer: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
}

export default WorkHistoryTile
