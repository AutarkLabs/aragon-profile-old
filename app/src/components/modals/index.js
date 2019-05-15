import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'

import { Profile } from '../../../modules/3box-aragon'
import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
  removingItem,
  removedItem,
  removedItemError,
  requestedProfileUnlock,
  profileUnlockSuccess,
  profileUnlockFailure,
} from '../../stateManagers/box'
import { close } from '../../stateManagers/modal'
import WorkHistoryModal from './WorkHistory'
import BasicInformationModal from './BasicInformation'
import EducationHistoryModal from './EducationHistory'
import RemoveItem from './RemoveItem'

const UserInfoModal = ({ ethereumAddress }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const { modal, dispatchModal } = useContext(ModalContext)
  const { api } = useAragonApi()

  const userLoaded = !!boxes[ethereumAddress]

  const onChange = (value, field, uniqueId, nestedField) => {
    dispatch(editField(ethereumAddress, field, value, uniqueId, nestedField))
  }

  const getFormValue = (field, uniqueId, nestedField) => {
    if (!userLoaded) return ''
    if (!uniqueId) return boxes[ethereumAddress].forms[field]
    if (!nestedField) return boxes[ethereumAddress].forms[field][uniqueId]
    return (
      boxes[ethereumAddress].forms[field][uniqueId] &&
      boxes[ethereumAddress].forms[field][uniqueId][nestedField]
    )
  }

  const unlockProfile = async () => {
    dispatch(requestedProfileUnlock(ethereumAddress))
    try {
      const profile = new Profile(ethereumAddress, api)
      await profile.unlock()
      dispatch(profileUnlockSuccess(ethereumAddress, profile))
      return true
    } catch (error) {
      dispatch(profileUnlockFailure(ethereumAddress, error))
      return false
    }
  }

  const profileExists = ({
    publicProfile,
    loadedPublicProf,
    loadedPublicProfSuccess,
  }) => {
    if (loadedPublicProfSuccess) return Object.keys(publicProfile).length > 0
    if (loadedPublicProf) throw new Error('error loading profile')
  }

  const unlockBoxIfRequired = ({ unlockedProf, unlockedProfSuccess }) => {
    if (unlockedProfSuccess) return true
    if (unlockedProf) throw new Error('error unlocking box')

    return unlockProfile()
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
      // let  = !profileExists(boxes[ethereumAddress])
      const hasUnlockedBox = await !unlockBoxIfRequired(boxes[ethereumAddress])

      if (hasUnlockedBox) {
        // await unlockedBox.setPublicFields(changed, changedValues)
        dispatch(savedProfile(ethereumAddress, forms))
        dispatchModal(close())
      } else {
        dispatch(saveProfileError(ethereumAddress, 'error unlocking profile'))
      }
    } catch (error) {
      dispatch(saveProfileError(ethereumAddress, error))
    }
  }

  const props = {
    ethereumAddress,
    getFormValue,
    onChange,
    saveProfile,
  }

  if (!userLoaded) return null

  const removeItem = async () => {
    dispatch(removingItem(ethereumAddress))
    try {
      const { unlockedBox, forms } = boxes[ethereumAddress]
      const { itemType, id } = modal
      delete forms[itemType][id]
      const newBoxVals = Object.keys(forms[itemType]).map(
        id => forms[itemType][id]
      )
      await unlockedBox.setPublicFields([itemType], [newBoxVals])
      dispatch(removedItem(ethereumAddress))
    } catch (err) {
      dispatch(removedItemError(err))
    }
  }

  return (
    <Modal visible={!!modal.type} padding="0">
      {modal.type === 'basicInformation' && (
        <BasicInformationModal {...props} />
      )}

      {modal.type === 'educationHistory' && (
        <EducationHistoryModal educationHistoryId={modal.id} {...props} />
      )}

      {modal.type === 'workHistory' && (
        <WorkHistoryModal workHistoryId={modal.id} {...props} />
      )}
      {modal.type === 'removeItem' && (
        <RemoveItem
          item={getFormValue(modal.itemType, modal.id)}
          itemType={modal.itemType}
          ethereumAddress={ethereumAddress}
          onRemove={removeItem}
        />
      )}
    </Modal>
  )
}

UserInfoModal.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default UserInfoModal
