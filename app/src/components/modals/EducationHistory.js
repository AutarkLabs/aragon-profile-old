import React from 'react'
import uuidv1 from 'uuid/v1'
import { Field, TextInput, Button, DropDown, Text } from '@aragon/ui'
import PropTypes from 'prop-types'
import ModalWrapper from './ModalWrapper'
import styled from 'styled-components'

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
        <Field label="Degree">
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
        </Field>
        <Field label="Field of Study">
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
        </Field>
      </TwoColumnsRow>

      <TwoColumnsRow
        style={{
          display: 'flex ',
          justifyContent: 'space-between',
          alignContent: 'stretch',
        }}
      >
        <div>
          <Field label="Start Year">
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
          </Field>
        </div>
        <div>
          <Field label="End Year">
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
            <Text.Block size="xsmall">
              Expected end year if you are in progress.
            </Text.Block>
          </Field>
        </div>
      </TwoColumnsRow>

      <Button wide mode="strong" onClick={() => saveProfile(ethereumAddress)}>
        Save
      </Button>
    </ModalWrapper>
  )
}

const TwoColumnsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: stretch;
  > * {
    width: 48%;
  }
`

/*
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
value={getFormValue('educationHistory', educationHistoryId, 'endDateM')}
onChange={unixTime =>
  onChange(unixTime, 'educationHistory', educationHistoryId, 'endDate')
}
label="End date"
/>
*/
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
