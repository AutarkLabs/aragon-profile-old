import React from 'react'
import uuidv1 from 'uuid/v1'
import { Button, DropDown, TextInput, Checkbox } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ModalWrapper, TwoColumnsRow, Label } from './ModalWrapper'
import { useDate } from '../../hooks'
import { years, months } from '../../utils'

const WorkHistory = ({
  getFormValue,
  onChange,
  workHistoryId,
  ethereumAddress,
  saveProfile,
}) => {
  const startDate = getFormValue('workHistory', workHistoryId, 'startDate')
  const endDate = getFormValue('workHistory', workHistoryId, 'endDate')

  const {
    indexStartYear,
    indexStartMonth,
    indexEndYear,
    indexEndMonth,
    current,
    dispatchDateChange,
  } = useDate(startDate, endDate, years, onChange, workHistoryId)

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
              dispatchDateChange({ type: 'setIndexStartMonth', index })
            }
          />
        </div>
        <div style={{ width: '48%' }}>
          <DropDown
            wide
            items={years}
            active={indexStartYear}
            onChange={index =>
              dispatchDateChange({ type: 'setIndexStartYear', index })
            }
          />
        </div>
      </DateDropDowns>

      <Label style={{ margin: 0 }}>End Date</Label>
      <div style={{ display: 'flex', height: '40px' }}>
        {!current && (
          <DateDropDowns>
            <div style={{ width: '48%' }}>
              <DropDown
                wide
                items={months}
                active={indexEndMonth}
                onChange={index =>
                  dispatchDateChange({ type: 'setIndexEndMonth', index })
                }
              />
            </div>
            <div style={{ width: '48%' }}>
              <DropDown
                wide
                items={years}
                active={indexEndYear}
                onChange={index =>
                  dispatchDateChange({ type: 'setIndexEndYear', index })
                }
              />
            </div>
          </DateDropDowns>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={current}
            onChange={index =>
              dispatchDateChange({ type: 'setCurrent', index })
            }
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
