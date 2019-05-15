import React from 'react'
import uuidv1 from 'uuid/v1'
import { Button, DropDown, TextInput, Checkbox } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ModalWrapper, TwoColumnsRow, Label } from './ModalWrapper'

const currentYear = new Date().getFullYear()
const years = Array.apply(0, Array(32)).map((_x, index) => currentYear - index)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WorkHistory = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
  workHistoryId,
}) => {
  let startYear = getFormValue('workHistory', workHistoryId, 'startYear')
  if (startYear === undefined) startYear = currentYear
  const indexStartYear =
    years.indexOf(startYear) === -1 ? 0 : years.indexOf(startYear)

  const startMonth = getFormValue('workHistory', workHistoryId, 'startMonth')
  const indexStartMonth =
    months.indexOf(startMonth) === -1 ? 0 : months.indexOf(startMonth)

  let endYear = getFormValue('workHistory', workHistoryId, 'endYear')
  // endYear is also used to mark "I still work here" (no End Date)
  if (endYear === undefined) endYear = currentYear
  const indexEndYear =
    years.indexOf(endYear) === -1 ? 0 : years.indexOf(endYear)

  const endMonth = getFormValue('workHistory', workHistoryId, 'endMonth')
  const indexEndMonth =
    months.indexOf(endMonth) === -1 ? 0 : months.indexOf(endMonth)

  return (
    <ModalWrapper title="Add Work">
      <TwoColumnsRow>
        <div>
          <Label>Company or Project</Label>
          <TextInput
            wide
            value={getFormValue('workHistory', workHistoryId, 'workPlace')}
            onChange={e =>
              onChange(
                e.target.value,
                'workHistory',
                workHistoryId,
                'workPlace'
              )
            }
          />
        </div>
        <div>
          <Label>Job Title or Role</Label>
          <TextInput
            wide
            value={getFormValue('workHistory', workHistoryId, 'jobTitle')}
            onChange={e =>
              onChange(e.target.value, 'workHistory', workHistoryId, 'jobTitle')
            }
          />
        </div>
      </TwoColumnsRow>

      <div>
        <Label>Description</Label>
        <TextInput.Multiline
          style={{ height: '80px' }}
          wide
          value={getFormValue('workHistory', workHistoryId, 'description')}
          onChange={e =>
            onChange(
              e.target.value,
              'workHistory',
              workHistoryId,
              'description'
            )
          }
        />
      </div>

      <Label style={{ margin: 0 }}>Start Date</Label>
      <DateDropDowns>
        <div style={{ width: '48%' }}>
          <DropDown
            wide
            items={months}
            active={indexStartMonth}
            onChange={index =>
              onChange(
                months[index],
                'workHistory',
                workHistoryId,
                'startMonth'
              )
            }
          />
        </div>
        <div style={{ width: '48%' }}>
          <DropDown
            wide
            items={years}
            active={indexStartYear}
            onChange={index =>
              onChange(years[index], 'workHistory', workHistoryId, 'startYear')
            }
          />
        </div>
      </DateDropDowns>

      <Label style={{ margin: 0 }}>End Date</Label>
      <div style={{ display: 'flex', height: '40px' }}>
        {!!endYear && (
          <DateDropDowns>
            <div style={{ width: '48%' }}>
              <DropDown
                wide
                items={months}
                active={indexEndMonth}
                onChange={index =>
                  onChange(
                    months[index],
                    'workHistory',
                    workHistoryId,
                    'endMonth'
                  )
                }
              />
            </div>
            <div style={{ width: '48%' }}>
              <DropDown
                wide
                items={years}
                active={indexEndYear}
                onChange={index =>
                  onChange(
                    years[index],
                    'workHistory',
                    workHistoryId,
                    'endYear'
                  )
                }
              />
            </div>
          </DateDropDowns>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={endYear === 0}
            onChange={() => {
              onChange(
                endYear === 0 ? currentYear : 0,
                'workHistory',
                workHistoryId,
                'endYear'
              )
            }}
          />
          I work here presently
        </div>
      </div>

      <Button wide mode="strong" onClick={() => saveProfile(ethereumAddress)}>
        Save
      </Button>
    </ModalWrapper>
  )
}

const DateDropDowns = styled.div`
  width: 60%;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
`

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
