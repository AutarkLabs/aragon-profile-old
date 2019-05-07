import React, { Fragment, useState, useContext } from 'react'
import uuidv1 from 'uuid/v1'
import { Modal, Text, Button } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BoxContext } from '../../wrappers/box'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../../stateManagers/box'
import {
  SmallMargin,
  FullWidthButton,
  FullWidthTextInput,
} from '../styled-components'
import { DatePicker } from '../readOrEditFields'

const WorkHistory = ({ ethereumAddress, workHistoryId }) => {
  const [opened, setOpened] = useState(false)
  const { boxes, dispatch } = useContext(BoxContext)

  const userLoaded = !!boxes[ethereumAddress]

  const onChange = (value, field, uniqueId, nestedField) => {
    dispatch(editField(ethereumAddress, field, value, uniqueId, nestedField))
  }

  const getFormValue = (field, uniqueId, nestedField) => {
    if (!userLoaded) return ''
    if (!uniqueId) return boxes[ethereumAddress].forms[field]
    return (
      boxes[ethereumAddress].forms[field][uniqueId] &&
      boxes[ethereumAddress].forms[field][uniqueId][nestedField]
    )
  }

  const saveProfile = async connectedAccount => {
    dispatch(savingProfile(connectedAccount))

    try {
      const { changed, forms, unlockedBox } = boxes[connectedAccount]
      const changedValues = changed.map(field => forms[field])
      await unlockedBox.setPublicFields(changed, changedValues)
      dispatch(savedProfile(connectedAccount, forms))
      setOpened(false)
    } catch (error) {
      dispatch(saveProfileError(connectedAccount, error))
    }
  }

  return (
    <Fragment>
      <div>
        <Button onClick={() => setOpened(!opened)}>Add another (work)</Button>
      </div>
      <Modal visible={opened}>
        <Text>Add Work History</Text>
        <SmallMargin />
        <FullWidthTextInput
          value={getFormValue('workHistory', workHistoryId, 'employer')}
          placeholder={'Employer'}
          onChange={e =>
            onChange(e.target.value, 'workHistory', workHistoryId, 'employer')
          }
          type="text"
          size="normal"
        />
        <SmallMargin />
        <FullWidthTextInput
          value={getFormValue('workHistory', workHistoryId, 'jobTitle')}
          placeholder={'Job Title'}
          onChange={e =>
            onChange(e.target.value, 'workHistory', workHistoryId, 'jobTitle')
          }
          type="text"
          size="normal"
        />
        <SmallMargin />
        <DatePicker
          value={getFormValue('workHistory', workHistoryId, 'startDate')}
          onChange={unixTime =>
            onChange(unixTime, 'workHistory', workHistoryId, 'startDate')
          }
          label="Start date"
        />
        <DatePicker
          value={getFormValue('workHistory', workHistoryId, 'endDate')}
          onChange={unixTime =>
            onChange(unixTime, 'workHistory', workHistoryId, 'endDate')
          }
          label="End date"
        />
        <FullWidthButton onClick={() => setOpened(false)}>
          Close modal
        </FullWidthButton>
      </Modal>
    </Fragment>
  )
}

WorkHistory.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

WorkHistory.defaultProps = {
  workHistoryId: uuidv1(),
}

export default WorkHistory
