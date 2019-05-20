import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@aragon/ui'
import { useAragonApi } from '@aragon/api-react'
import uuidv1 from 'uuid/v1'

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
  requestProfileCreate,
  profileUnlockSuccess,
  profileUnlockFailure,
} from '../../stateManagers/box'
import { close, open } from '../../stateManagers/modal'
import WorkHistoryModal from './WorkHistory'
import BasicInformationModal from './BasicInformation'
import EducationHistoryModal from './EducationHistory'
import RemoveItem from './RemoveItem'
import BoxState from './BoxState'

const UserInfoModal = ({ ethereumAddress }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const { modal, dispatchModal } = useContext(ModalContext)
  const { api } = useAragonApi()
  const [key, setKey] = useState(uuidv1())

  const userLoaded = !!boxes[ethereumAddress]

  const onChange = (value, field, uniqueId, nestedField) => {
    dispatch(editField(ethereumAddress, field, value, uniqueId, nestedField))
  }

  const getFormValue = (field, uniqueId, nestedField) => {
    let value
    if (!userLoaded) value = ''
    else if (!uniqueId) value = boxes[ethereumAddress].forms[field]
    else if (!nestedField) value = boxes[ethereumAddress].forms[field][uniqueId]
    else
      value =
        boxes[ethereumAddress].forms[field][uniqueId] &&
        boxes[ethereumAddress].forms[field][uniqueId][nestedField]

    return value || ''
  }

  const profileExists = ({
    publicProfile,
    loadedPublicProf,
    loadedPublicProfSuccess,
  }) => {
    if (loadedPublicProfSuccess) return Object.keys(publicProfile).length > 0
    if (loadedPublicProf) throw new Error('error loading profile')
  }

  const delay = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })

  const unlockProfile = async box => {
    const hasProfile = profileExists(box)
    dispatch(requestedProfileUnlock(ethereumAddress, hasProfile))
    try {
      const profile = new Profile(ethereumAddress, api)
      await profile.unlock()
      dispatch(profileUnlockSuccess(ethereumAddress, profile))
      return profile
    } catch (error) {
      dispatch(profileUnlockFailure(ethereumAddress, error))
      return false
    }
  }

  const unlockBoxIfRequired = async box => {
    if (box.unlockedProfSuccess) {
      if (!profileExists(box)) {
        dispatch(requestProfileCreate(ethereumAddress))
      }
      return box.unlockedBox
    }
    if (box.unlockedProf) throw new Error('error unlocking box')

    dispatchModal(open('3boxState'))
    const unlockedBox = await unlockProfile(box)
    return unlockedBox
  }

  const saveProfile = async ethereumAddress => {
    dispatch(savingProfile(ethereumAddress))

    try {
      const { changed, forms } = boxes[ethereumAddress]
      const calculateChanged = field => {
        if (field === 'workHistory' || field === 'educationHistory') {
          return Object.keys(forms[field]).map(id => forms[field][id])
        }
        return forms[field]
      }

      const changedValues = changed.map(calculateChanged)
      const unlockedBox = await unlockBoxIfRequired(boxes[ethereumAddress])
      if (unlockedBox) {
        await unlockedBox.setPublicFields(changed, changedValues)
        dispatch(savedProfile(ethereumAddress, forms))
        await delay()
        dispatchModal(close())
        setKey(uuidv1())
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
        <EducationHistoryModal
          educationHistoryId={modal.id || key}
          {...props}
        />
      )}

      {modal.type === 'workHistory' && (
        <WorkHistoryModal workHistoryId={modal.id || key} {...props} />
      )}
      {modal.type === 'removeItem' && (
        <RemoveItem itemType={modal.itemType} onRemove={removeItem} />
      )}
      {modal.type === '3boxState' && (
        <BoxState messageSigning={boxes[ethereumAddress].messageSigning} />
      )}
    </Modal>
  )
}

UserInfoModal.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default UserInfoModal
