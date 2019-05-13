import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@aragon/ui'

import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../../stateManagers/box'
import { close } from '../../stateManagers/modal'
import { FullWidthButton } from '../styled-components'
import WorkHistoryModal from './WorkHistory'
import BasicInformationModal from './BasicInformation'
import EducationHistoryModal from './EducationHistory'

const UserInfoModal = ({ ethereumAddress }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const { modal, dispatchModal } = useContext(ModalContext)

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
      dispatch(close())
    } catch (error) {
      dispatch(saveProfileError(ethereumAddress, error))
    }
  }

  return (
    <Modal visible={userLoaded && !!modal.type}>
      {userLoaded && modal.type === 'basicInformation' && (
        <BasicInformationModal
          ethereumAddress={ethereumAddress}
          getFormValue={getFormValue}
          onChange={onChange}
          saveProfile={saveProfile}
        />
      )}

      {userLoaded && modal.type === 'educationHistory' && (
        <EducationHistoryModal
          educationHistoryId={modal.id}
          ethereumAddress={ethereumAddress}
          getFormValue={getFormValue}
          onChange={onChange}
          saveProfile={saveProfile}
        />
      )}
      {userLoaded && modal.type === 'workHistory' && (
        <WorkHistoryModal
          ethereumAddress={ethereumAddress}
          getFormValue={getFormValue}
          onChange={onChange}
          saveProfile={saveProfile}
          workHistoryId={modal.id}
        />
      )}
      <FullWidthButton onClick={() => dispatchModal(close())}>
        Close modal
      </FullWidthButton>
    </Modal>
  )
}

UserInfoModal.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export { default as RemoveItem } from './RemoveItem'
export default UserInfoModal
