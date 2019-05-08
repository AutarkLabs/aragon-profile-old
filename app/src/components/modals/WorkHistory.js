import React, { Fragment } from 'react'
import uuidv1 from 'uuid/v1'
import { Text } from '@aragon/ui'
import PropTypes from 'prop-types'

import {
  SmallMargin,
  FullWidthButton,
  FullWidthTextInput,
} from '../styled-components'
import { DatePicker, EditTextArea } from '../readOrEditFields'

const WorkHistory = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  workHistoryId,
}) => {
  return (
    <Fragment>
      <Text>Add Work History</Text>
      <SmallMargin />
      <FullWidthTextInput
        value={getFormValue('workHistory', workHistoryId, 'employer')}
        placeholder={'Employer'}
        onChange={e =>
          onChange(e.target.value, 'workHistory', workHistoryId, 'employer')
        }
        type="text"
        size="normal"
      />
      <SmallMargin />
      <FullWidthTextInput
        value={getFormValue('workHistory', workHistoryId, 'jobTitle')}
        placeholder={'Job Title'}
        onChange={e =>
          onChange(e.target.value, 'workHistory', workHistoryId, 'jobTitle')
        }
        type="text"
        size="normal"
      />
      <SmallMargin />
      <EditTextArea
        value={getFormValue('workHistory', workHistoryId, 'description')}
        placeholder={'Description'}
        onChange={e =>
          onChange(e.target.value, 'workHistory', workHistoryId, 'description')
        }
        type="text"
        size="normal"
      />
      <SmallMargin />
      <DatePicker
        value={getFormValue('workHistory', workHistoryId, 'startDate')}
        onChange={unixTime =>
          onChange(unixTime, 'workHistory', workHistoryId, 'startDate')
        }
        label="Start date"
      />
      <SmallMargin />
      <DatePicker
        value={getFormValue('workHistory', workHistoryId, 'endDate')}
        onChange={unixTime =>
          onChange(unixTime, 'workHistory', workHistoryId, 'endDate')
        }
        label="End date"
      />
      <FullWidthButton onClick={() => saveProfile(ethereumAddress)}>
        Save
      </FullWidthButton>
    </Fragment>
  )
}

WorkHistory.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
}

WorkHistory.defaultProps = {
  workHistoryId: uuidv1(),
}

export default WorkHistory
