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
  requestProfileCreate,
  requestProfileCreateSuccess,
  requestProfileCreateError,
  profileOpenRequest,
  profileOpenSuccess,
  profileOpenFailure,
  profileSyncRequest,
  profileSyncSuccess,
  profileSyncFailure,
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
    let profile
    try {
      profile = new Profile(ethereumAddress, api)
      await profile.unlock()
      dispatch(profileOpenSuccess(ethereumAddress, profile))
    } catch (error) {
      dispatch(profileOpenFailure(ethereumAddress, error))
      return false
    }

    dispatch(profileSyncRequest(ethereumAddress, profile))
    try {
      await profile.sync()
      dispatch(profileSyncSuccess(ethereumAddress))
      return profile
    } catch (error) {
      dispatch(profileSyncFailure(ethereumAddress, error))
      return false
    }
  }

  const createProfile = async unlockedBox => {
    try {
      await unlockedBox.createProfile()
      dispatch(requestProfileCreateSuccess(ethereumAddress))
      return true
    } catch (error) {
      dispatch(requestProfileCreateError(ethereumAddress, error))
      return false
    }
  }

  const hasProfile = () => {
    const { hasProfile } = new Profile(ethereumAddress, api)
    return hasProfile()
  }

  const createProfSig = async unlockedBox => {
    dispatch(requestProfileCreate(ethereumAddress))
    dispatchModal(openBoxState(['create']))
    const created = await createProfile(unlockedBox)
    return created ? unlockedBox : null
  }

  const openBoxSig = async () => {
    dispatch(profileOpenRequest(ethereumAddress))
    dispatchModal(openBoxState(['unlock']))
    return unlockProfile()
  }

  const invokeBothSigs = async () => {
    dispatch(profileOpenRequest(ethereumAddress))
    dispatchModal(openBoxState(['unlock', 'create']))
    const unlockedBox = await unlockProfile()
    dispatch(requestProfileCreate(ethereumAddress))
    const created = await createProfile(unlockedBox)
    return created ? unlockedBox : null
  }

  const unlockAndCreateBoxIfRequired = async box => {
    try {
      const profileExists = await hasProfile()
      // no signature required, return the box
      if (box.unlockedProfSuccess && profileExists) return box.unlockedBox
      // only create profile signature required, return box once finished
      if (box.unlockedProfSuccess) return createProfSig(box.unlockedBox)
      // open box signature only, return box once finished
      if (!box.unlockedProfSuccess && profileExists) return openBoxSig()
      // both signatures, return box once finished
      return invokeBothSigs()
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
      // unlockAndCreateBoxIfRequired opens the signature modal, and handles errors
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

      if (itemType === 'image' || itemType === 'coverPhoto') {
        await unlockedBox.removePublicField(itemType)
      } else {
        delete forms[itemType][id]
        const newBoxVals = Object.keys(forms[itemType]).map(
          id => forms[itemType][id]
        )
        await unlockedBox.setPublicFields([itemType], [newBoxVals])
      }

      const updatedProfile = await unlockedBox.getPublic()

      dispatch(removedItem(ethereumAddress, updatedProfile))
      dispatchModal(close())
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
