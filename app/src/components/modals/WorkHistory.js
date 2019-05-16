import React from 'react'
import uuidv1 from 'uuid/v1'
import { Button, DropDown, TextInput, Checkbox } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ModalWrapper, TwoColumnsRow, Label } from './ModalWrapper'

const currentYear = new Date().getFullYear()
const years = Array.apply(0, Array(74)).map((_x, index) => currentYear - index)

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

class WorkHistory extends React.Component {
  state = {
    indexStartYear: 0,
    indexStartMonth: 0,
    indexEndYear: 0,
    indexEndMonth: 0,
    currentJob: false,
  }

  componentDidMount = () => {
    const { getFormValue, workHistoryId } = this.props
    let index

    const newState = {}

    const startDate = getFormValue('workHistory', workHistoryId, 'startDate')
    const endDate = getFormValue('workHistory', workHistoryId, 'endDate')

    if (startDate === '') {
      newState.indexStartYear = years.indexOf(currentYear)
    } else {
      const startYear = new Date(startDate).getFullYear()
      // eslint-disable-next-line no-undef
      newState.indexStartYear =
        (index = years.indexOf(startYear)) === -1 ? 0 : index
      newState.indexStartMonth = new Date(startDate).getMonth()
    }

    if (endDate === '0') {
      newState.currentJob = true
    } else if (endDate === '') {
      newState.indexEndYear = years.indexOf(currentYear)
    } else {
      const endYear = new Date(endDate).getFullYear()
      // eslint-disable-next-line no-undef
      newState.indexEndYear =
        (index = years.indexOf(endYear)) === -1 ? 0 : index
      newState.indexEndMonth = new Date(endDate).getMonth()
    }
    this.setState(newState)
  }

  update3box = () => {
    const { ethereumAddress, saveProfile, onChange, workHistoryId } = this.props

    let timeStamp = new Date(
      years[this.state.indexStartYear] +
        '-' +
        months[this.state.indexStartMonth] +
        '-03'
    ).getTime()

    onChange(timeStamp, 'workHistory', workHistoryId, 'startDate')

    if (this.state.currentJob) {
      timeStamp = '0'
    } else {
      timeStamp = new Date(
        years[this.state.indexEndYear] +
          '-' +
          months[this.state.indexEndMonth] +
          '-03'
      ).getTime()
    }

    onChange(timeStamp, 'workHistory', workHistoryId, 'endDate')

    saveProfile(ethereumAddress)
  }

  render() {
    const { getFormValue, onChange, workHistoryId } = this.props

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
                onChange(
                  e.target.value,
                  'workHistory',
                  workHistoryId,
                  'jobTitle'
                )
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
              active={this.state.indexStartMonth}
              onChange={index => this.setState({ indexStartMonth: index })}
            />
          </div>
          <div style={{ width: '48%' }}>
            <DropDown
              wide
              items={years}
              active={this.state.indexStartYear}
              onChange={index => this.setState({ indexStartYear: index })}
            />
          </div>
        </DateDropDowns>

        <Label style={{ margin: 0 }}>End Date</Label>
        <div style={{ display: 'flex', height: '40px' }}>
          {!this.state.currentJob && (
            <DateDropDowns>
              <div style={{ width: '48%' }}>
                <DropDown
                  wide
                  items={months}
                  active={this.state.indexEndMonth}
                  onChange={index => this.setState({ indexEndMonth: index })}
                />
              </div>
              <div style={{ width: '48%' }}>
                <DropDown
                  wide
                  items={years}
                  active={this.state.indexEndYear}
                  onChange={index => this.setState({ indexEndYear: index })}
                />
              </div>
            </DateDropDowns>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={this.state.currentJob}
              onChange={() => {
                this.setState(currentState => {
                  return {
                    currentJob: !currentState.currentJob,
                  }
                })
              }}
            />
            I work here presently
          </div>
        </div>

        <Button wide mode="strong" onClick={() => this.update3box()}>
          Save
        </Button>
      </ModalWrapper>
    )
  }
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
