import React, { Fragment } from 'react'
import uuidv1 from 'uuid/v1'
import { Text } from '@aragon/ui'
import PropTypes from 'prop-types'

import {
  SmallMargin,
  FullWidthButton,
  FullWidthTextInput,
} from '../styled-components'
import { DatePicker } from '../readOrEditFields'

const EducationHistory = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  educationHistoryId,
}) => {
  return (
    <Fragment>
      <Text>Add Education History</Text>
      <SmallMargin />
      <FullWidthTextInput
        value={getFormValue(
          'educationHistory',
          educationHistoryId,
          'organization'
        )}
        placeholder={'Organization'}
        onChange={e =>
          onChange(
            e.target.value,
            'educationHistory',
            educationHistoryId,
            'organization'
          )
        }
        type="text"
        size="normal"
      />
      <SmallMargin />
      <FullWidthTextInput
        value={getFormValue('educationHistory', educationHistoryId, 'degree')}
        placeholder={'Degree'}
        onChange={e =>
          onChange(
            e.target.value,
            'educationHistory',
            educationHistoryId,
            'degree'
          )
        }
        type="text"
        size="normal"
      />
      <SmallMargin />
      <DatePicker
        value={getFormValue(
          'educationHistory',
          educationHistoryId,
          'startDate'
        )}
        onChange={unixTime =>
          onChange(
            unixTime,
            'educationHistory',
            educationHistoryId,
            'startDate'
          )
        }
        label="Start date"
      />
      <SmallMargin />
      <DatePicker
        value={getFormValue('educationHistory', educationHistoryId, 'endDate')}
        onChange={unixTime =>
          onChange(unixTime, 'educationHistory', educationHistoryId, 'endDate')
        }
        label="End date"
      />
      <FullWidthButton onClick={() => saveProfile(ethereumAddress)}>
        Save
      </FullWidthButton>
      <SmallMargin />
    </Fragment>
  )
}

EducationHistory.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
}

EducationHistory.defaultProps = {
  educationHistoryId: uuidv1(),
}

export default EducationHistory
