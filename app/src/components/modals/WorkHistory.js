import React from 'react'
import uuidv1 from 'uuid/v1'
import { Button, TextInput } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow } from './ModalWrapper'
import { useDate } from '../../hooks'
import { years } from '../../utils'
import DateDropdowns from '../DateDropdowns'
import { Label } from '../styled-components'

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
  } = useDate(startDate, endDate, years, onChange, 'workHistory', workHistoryId)

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

      <DateDropdowns
        current={current}
        dispatchDateChange={dispatchDateChange}
        indexStartMonth={indexStartMonth}
        indexStartYear={indexStartYear}
        indexEndMonth={indexEndMonth}
        indexEndYear={indexEndYear}
        type="workHistory"
      />

      <Button wide mode="strong" onClick={() => saveProfile(ethereumAddress)}>
        Save
      </Button>
    </ModalWrapper>
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
