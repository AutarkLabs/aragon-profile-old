import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@aragon/ui'

import { BoxContext } from '../../wrappers/box'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
  closeModal,
} from '../../stateManagers/box'
import { FullWidthButton } from '../styled-components'
import WorkHistoryModal from './WorkHistory'
import BasicInformationModal from './BasicInformation'
import EducationHistoryModal from './EducationHistory'

const UserInfoModal = ({ ethereumAddress }) => {
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

  const saveProfile = async ethereumAddress => {
    dispatch(savingProfile(ethereumAddress))

    try {
      const { changed, forms, unlockedBox } = boxes[ethereumAddress]
      const calculateChanged = field => {
        if (field === 'workHistory' || field === 'educationHistory') {
          return Object.keys(forms[field]).map(id => forms[field][id])
        }
        return forms[field]
      }

      const changedValues = changed.map(calculateChanged)
      await unlockedBox.setPublicFields(changed, changedValues)
      dispatch(savedProfile(ethereumAddress, forms))
      dispatch(closeModal(ethereumAddress))
    } catch (error) {
      dispatch(saveProfileError(ethereumAddress, error))
    }
  }

  return (
    <Modal visible={userLoaded && !!boxes[ethereumAddress].openedModal.type}>
      {userLoaded &&
        boxes[ethereumAddress].openedModal.type === 'basicInformation' && (
          <BasicInformationModal
            ethereumAddress={ethereumAddress}
            getFormValue={getFormValue}
            onChange={onChange}
            saveProfile={saveProfile}
          />
        )}

      {userLoaded &&
        boxes[ethereumAddress].openedModal.type === 'educationHistory' && (
          <EducationHistoryModal
            educationHistoryId={boxes[ethereumAddress].openedModal.id}
            ethereumAddress={ethereumAddress}
            getFormValue={getFormValue}
            onChange={onChange}
            saveProfile={saveProfile}
          />
        )}
      {userLoaded &&
        boxes[ethereumAddress].openedModal.type === 'workHistory' && (
          <WorkHistoryModal
            ethereumAddress={ethereumAddress}
            getFormValue={getFormValue}
            onChange={onChange}
            saveProfile={saveProfile}
            workHistoryId={boxes[ethereumAddress].openedModal.id}
          />
        )}
      <FullWidthButton onClick={() => dispatch(closeModal(ethereumAddress))}>
        Close modal
      </FullWidthButton>
    </Modal>
  )
}

export default UserInfoModal

UserInfoModal.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}
