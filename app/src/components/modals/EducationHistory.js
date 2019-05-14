import React from 'react'
import uuidv1 from 'uuid/v1'
import { Field, TextInput, Button, DropDown, Text, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow, Label } from './ModalWrapper'

const year = new Date().getFullYear() + 5
const years = Array.apply(0, Array(32)).map((_x, index) => year - index + '')

const EducationHistory = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  educationHistoryId,
}) => {
  const startYear = getFormValue(
    'educationHistory',
    educationHistoryId,
    'startYear'
  )
  const indexStartYear =
    years.indexOf(startYear) === -1 ? 5 : years.indexOf(startYear)

  const endYear = getFormValue(
    'educationHistory',
    educationHistoryId,
    'endYear'
  )
  const indexEndYear =
    years.indexOf(endYear) === -1 ? 5 : years.indexOf(endYear)

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
              'field'
            )}
            onChange={e =>
              onChange(
                e.target.value,
                'educationHistory',
                educationHistoryId,
                'field'
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
                years[index],
                'educationHistory',
                educationHistoryId,
                'startYear'
              )
            }
          />
        </div>
        <div>
          <Label>End Year</Label>
          <DropDown
            wide
            items={years}
            active={indexEndYear}
            onChange={index =>
              onChange(
                years[index],
                'educationHistory',
                educationHistoryId,
                'endYear'
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
