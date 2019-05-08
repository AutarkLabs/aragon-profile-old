import React from 'react'
import PropTypes from 'prop-types'

import { Text, Card } from '@aragon/ui'
import { SmallMargin, EditIcon, AlignRight } from './styled-components'
import { unixToCalendar } from '../utils'

const EducationHistoryTile = ({
  degree,
  organization,
  endDate,
  openModal,
  startDate,
}) => {
  return (
    <div>
      <Card height="100%">
        <AlignRight tabindex="0" role="button" onClick={() => openModal()}>
          <EditIcon />
        </AlignRight>
        <Text size="large">{organization}</Text>
        <SmallMargin />
        <Text size="normal">{degree}</Text>
        <SmallMargin />
        <Text size="small" color="grey">{`${unixToCalendar(
          startDate
        )} --- ${unixToCalendar(endDate)}`}</Text>
      </Card>
    </div>
  )
}

EducationHistoryTile.propTypes = {
  degree: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default EducationHistoryTile
