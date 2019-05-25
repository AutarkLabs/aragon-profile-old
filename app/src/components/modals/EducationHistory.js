import React, { useState } from 'react'
import { Field, TextInput, Button } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow, DisplayErrors } from './ModalWrapper'
import { useDate } from '../../hooks'
import { years } from '../../utils'
import DateDropdowns from '../DateDropdowns'
import { Label, TextInputWithValidation } from '../styled-components'
import validator from '../../utils/validation'

const validateOrganization = validator.compile({
  type: 'string',
  minLength: 1,
  maxLength: 64,
})

const EducationHistory = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  educationHistoryId,
  savingError,
}) => {
  const [validationErrors, setValidationErrors] = useState({})

  const validateAndSave = () => {
    const errors = {}
    if (
      !validateOrganization(
        getFormValue('educationHistory', educationHistoryId, 'organization')
      )
    )
      errors['organization'] = 'Please provide valid organization name'

    setValidationErrors(errors)
    if (!Object.keys(errors).length) saveProfile(ethereumAddress)
  }

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
      <DisplayErrors errors={{ ...validationErrors, ...savingError }} />
      <DisplayErrors errors={validationErrors} />
      <Field label="School">
        <TextInputWithValidation
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
          error={validationErrors['organization']}
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

      <Button wide mode="strong" onClick={() => validateAndSave()}>
        Save
      </Button>
    </ModalWrapper>
  )
}

EducationHistory.propTypes = {
  educationHistoryId: PropTypes.string.isRequired,
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
}

export default EducationHistory
