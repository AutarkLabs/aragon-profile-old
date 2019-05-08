import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { BoxContext } from '../../wrappers/box'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../../stateManagers/box'
import WorkHistoryModal from './WorkHistory'
import BasicInformationModal from './BasicInformation'
import EducationHistoryModal from './EducationHistory'

const ModalBase = ({ ethereumAddress, type }) => {
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
      const calculateChanged = field => {
        if (field === 'workHistory' || field === 'educationHistory') {
          return Object.keys(forms[field]).map(id => forms[field][id])
        }
        return forms[field]
      }

      const changedValues = changed.map(calculateChanged)
      await unlockedBox.setPublicFields(changed, changedValues)
      dispatch(savedProfile(connectedAccount, forms))
      setOpened(false)
    } catch (error) {
      dispatch(saveProfileError(connectedAccount, error))
    }
  }

  if (type === 'workHistory')
    return (
      <WorkHistoryModal
        ethereumAddress={ethereumAddress}
        getFormValue={getFormValue}
        onChange={onChange}
        opened={opened}
        saveProfile={saveProfile}
        setOpened={setOpened}
        userLoaded={userLoaded}
      />
    )
  if (type === 'basicInformation')
    return (
      <BasicInformationModal
        ethereumAddress={ethereumAddress}
        getFormValue={getFormValue}
        onChange={onChange}
        opened={opened}
        saveProfile={saveProfile}
        setOpened={setOpened}
        userLoaded={userLoaded}
      />
    )
  if (type === 'educationHistory')
    return (
      <EducationHistoryModal
        ethereumAddress={ethereumAddress}
        getFormValue={getFormValue}
        onChange={onChange}
        opened={opened}
        saveProfile={saveProfile}
        setOpened={setOpened}
        userLoaded={userLoaded}
      />
    )
}

ModalBase.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export const BasicInformation = ({ ethereumAddress }) => (
  <ModalBase type="basicInformation" ethereumAddress={ethereumAddress} />
)

export const WorkHistory = ({ ethereumAddress }) => (
  <ModalBase type="workHistory" ethereumAddress={ethereumAddress} />
)

export const EducationHistory = ({ ethereumAddress }) => (
  <ModalBase type="educationHistory" ethereumAddress={ethereumAddress} />
)
