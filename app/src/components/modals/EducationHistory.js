import React from 'react'
import uuidv1 from 'uuid/v1'
import { Field, TextInput, Button } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow } from './ModalWrapper'
import { useDate } from '../../hooks'
import { years } from '../../utils'
import DateDropdowns from '../DateDropdowns'
import { Label } from '../styled-components'

const EducationHistory = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  educationHistoryId,
}) => {
  const startDate = getFormValue(
    'educationHistory',
    educationHistoryId,
    'startDate'
  )
  const endDate = getFormValue(
    'educationHistory',
    educationHistoryId,
    'endDate'
  )

  const {
    indexStartYear,
    indexStartMonth,
    indexEndYear,
    indexEndMonth,
    current,
    dispatchDateChange,
  } = useDate(
    startDate,
    endDate,
    years,
    onChange,
    'educationHistory',
    educationHistoryId
  )

  return (
    <ModalWrapper title="Add Education">
      <Field label="School">
        <TextInput
          wide
          value={getFormValue(
            'educationHistory',
            educationHistoryId,
            'organization'
          )}
          onChange={e =>
            onChange(
              e.target.value,
              'educationHistory',
              educationHistoryId,
              'organization'
            )
          }
        />
      </Field>

      <TwoColumnsRow>
        <div>
          <Label>Degree</Label>
          <TextInput
            wide
            value={getFormValue(
              'educationHistory',
              educationHistoryId,
              'degree'
            )}
            onChange={e =>
              onChange(
                e.target.value,
                'educationHistory',
                educationHistoryId,
                'degree'
              )
            }
          />
        </div>
        <div>
          <Label>Field of Study</Label>
          <TextInput
            wide
            value={getFormValue(
              'educationHistory',
              educationHistoryId,
              'fieldOfStudy'
            )}
            onChange={e =>
              onChange(
                e.target.value,
                'educationHistory',
                educationHistoryId,
                'fieldOfStudy'
              )
            }
          />
        </div>
      </TwoColumnsRow>

      <DateDropdowns
        current={current}
        dispatchDateChange={dispatchDateChange}
        indexStartMonth={indexStartMonth}
        indexStartYear={indexStartYear}
        indexEndMonth={indexEndMonth}
        indexEndYear={indexEndYear}
        type="educationHistory"
      />

      <Button wide mode="strong" onClick={() => saveProfile(ethereumAddress)}>
        Save
      </Button>
    </ModalWrapper>
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
