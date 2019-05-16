import React from 'react'
import uuidv1 from 'uuid/v1'
import { Field, TextInput, Button, DropDown, Text, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow, Label } from './ModalWrapper'

const year = new Date().getFullYear()
const years = Array.apply(0, Array(74)).map((_x, index) => year - index)
const yearsEnd = Array.apply(0, Array(74)).map((_x, index) => year - index + 5)

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
  let indexStartYear, indexEndYear

  if (startDate === '') indexStartYear = 0
  else {
    const startYear = new Date(startDate).getFullYear()
    indexStartYear = years.indexOf(startYear)
  }

  if (endDate === '') indexEndYear = years.indexOf(year)
  else {
    const endYear = new Date(endDate).getFullYear()
    indexEndYear = yearsEnd.indexOf(endYear)
  }

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

      <TwoColumnsRow>
        <div>
          <Label>Start Year</Label>
          <DropDown
            wide
            items={years}
            active={indexStartYear}
            onChange={index =>
              onChange(
                new Date(years[index] + '-02-01').getTime(),
                'educationHistory',
                educationHistoryId,
                'startDate'
              )
            }
          />
        </div>
        <div>
          <Label>End Year</Label>
          <DropDown
            wide
            items={yearsEnd}
            active={indexEndYear}
            onChange={index =>
              onChange(
                new Date(yearsEnd[index] + '-02-01').getTime(),
                'educationHistory',
                educationHistoryId,
                'endDate'
              )
            }
          />
          <Text.Block size="xsmall" color={theme.textTertiary}>
            Expected end year if you are in progress.
          </Text.Block>
        </div>
      </TwoColumnsRow>

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
