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
  requestProfileCreateSuccess,
  requestProfileCreateError,
  profileUnlockSuccess,
  profileUnlockFailure,
} from '../../stateManagers/box'
import { close, openBoxState } from '../../stateManagers/modal'
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

  const delay = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })

  const unlockProfile = async () => {
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

  const createProfile = async unlockedBox => {
    try {
      await unlockedBox.createAccount()
      dispatch(requestProfileCreateSuccess(ethereumAddress))
    } catch (error) {
      dispatch(requestProfileCreateError(ethereumAddress, error))
    }
  }

  const hasProfile = () => {
    const { hasProfile } = new Profile(ethereumAddress, api)
    return hasProfile()
  }

  const unlockAndCreateBoxIfRequired = async box => {
    try {
      const profileExists = await hasProfile()
      // no signature required
      if (box.unlockedProfSuccess && profileExists) {
        return box.unlockedBox
      }

      // only create profile signature required
      if (box.unlockedProfSuccess) {
        dispatch(requestProfileCreate(ethereumAddress))
        dispatchModal(openBoxState(['create']))
        await createProfile(box.unlockedBox)
        return box.unlockedBox
      }

      // open box signature only
      if (!box.unlockedProfSuccess && profileExists) {
        dispatch(requestedProfileUnlock(ethereumAddress))
        dispatchModal(openBoxState(['unlock']))
        const unlockedBox = await unlockProfile()
        return unlockedBox
      }

      // both signatures
      dispatchModal(openBoxState(['unlock', 'create']))
      dispatch(requestedProfileUnlock(ethereumAddress))
      const unlockedBox = await unlockProfile()
      dispatch(requestProfileCreate(ethereumAddress))
      await createProfile(box.unlockedBox)
      return unlockedBox
    } catch (error) {
      dispatch(
        saveProfileError(
          ethereumAddress,
          `error unlocking or creating profile: ${error}`
        )
      )
      return null
    }
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
      const unlockedBox = await unlockAndCreateBoxIfRequired(
        boxes[ethereumAddress]
      )
      if (unlockedBox) {
        await unlockedBox.setPublicFields(changed, changedValues)
        dispatch(savedProfile(ethereumAddress, forms))
        await delay()
        dispatchModal(close())
        setKey(uuidv1())
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
        <BoxState
          messageSigning={boxes[ethereumAddress].messageSigning}
          signaturesRequired={modal.sigsRequired}
        />
      )}
    </Modal>
  )
}

UserInfoModal.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default UserInfoModal
