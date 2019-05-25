import _ from 'lodash'
import { image } from '../../../modules/things'
import { reformatNestedFields } from '../../utils'

export const initialState = {}

export const fetchingPublicProfile = () => ({
  loadingPublicProf: true,
  loadedPublicProf: false,
  loadedPublicProfSuccess: false,
  unlockingProf: false,
  unlockedProf: false,
  unlockedProfSuccess: false,
  savingProfile: false,
  savedProfile: false,
  savedProfileSucess: false,
  removingItem: false,
  removedItem: false,
  removedItemSuccess: false,
  unlockedBox: {},
  publicProfile: {},
  forms: {
    name: '',
    job: '',
    workPlace: '',
    location: '',
    school: '',
    website: '',
    description: '',
    workHistory: {},
    educationHistory: {},
  },
  changed: [],
  uploadingImage: false,
  uploadedImageSuccess: false,
  uploadedImage: false,
})

export const fetchedPublicProfileSuccess = (state, profile) => {
  const publicProfile = reformatNestedFields(profile)
  return {
    ...state,
    loadingPublicProf: false,
    loadedPublicProf: true,
    loadedPublicProfSuccess: true,
    publicProfile,
    forms: { ...state.forms, ...publicProfile },
    changed: [],
  }
}

export const fetchedPublicProfileErr = (state, error) => ({
  ...state,
  loadingPublicProf: false,
  loadedPublicProf: true,
  loadedPublicProfSuccess: true,
  error,
})

export const requestedProfUnlock = state => ({
  ...state,
  unlockingProf: true,
  unlockedProf: false,
  unlockedProfSuccess: false,
  unlockedBox: {},
})

export const profileUnlocked = (state, unlockedBox) => ({
  ...state,
  unlockingProf: false,
  unlockedProf: true,
  unlockedProfSuccess: true,
  editedProfile: false,
  unlockedBox,
})

export const profileUnlockFailed = (state, error) => ({
  ...state,
  unlockingProf: false,
  unlockedProf: true,
  unlockedProfSuccess: false,
  error,
})

const calculateChanged = (changed, field) => {
  if (!changed) return [field]

  if (!changed.includes(field)) return [...changed, field]
  return changed
}

export const editedField = (state, field, value, uniqueId, nestedField) => {
  const newFormVals = _.cloneDeep({ ...state.forms })
  if (!uniqueId) newFormVals[field] = value
  else {
    let newNestedField = {
      ...newFormVals[field][uniqueId],
      [nestedField]: value,
    }
    if (!value) delete newNestedField[nestedField]

    newFormVals[field][uniqueId] = newNestedField
  }

  return {
    ...state,
    forms: newFormVals,
    changed: calculateChanged(state.changed, field),
  }
}

export const uploadingImage = state => ({
  ...state,
  uploadingImage: true,
  uploadedImageSuccess: false,
  uploadedImage: false,
})

export const uploadedImage = (state, imageTag, imageContentHash) => {
  const newFormVals = _.cloneDeep({ ...state.forms })
  newFormVals[imageTag] = image(imageContentHash)
  const newState = {
    ...state,
    uploadingImage: false,
    uploadedImageSuccess: true,
    uploadedImage: true,
    forms: newFormVals,
    changed: calculateChanged(state.changed, imageTag),
  }
  return newState
}

export const uploadedImageError = (state, error) => ({
  ...state,
  uploadingImage: false,
  uploadedImageSuccess: false,
  uploadedImage: true,
  image_error: error,
})

export const requestedSaveProfile = state => ({
  ...state,
  savingProfile: true,
  savedProfile: false,
  savedProfileSucess: false,
})

export const requestedSaveProfileSuccess = (state, profile) => ({
  ...state,
  savingProfile: false,
  savedProfile: true,
  savedProfileSucess: true,
  publicProfile: {
    ...state.publicProfile,
    ...profile,
  },
  changed: [],
})

export const requestedSaveProfileError = (state, error) => ({
  ...state,
  savingProfile: false,
  savedProfile: true,
  savedProfileSucess: false,
  error,
})

export const requestedProfileItemRemove = state => ({
  ...state,
  removingItem: true,
  removedItem: false,
  removedItemSuccess: false,
})

export const requestedProfileItemRemoveSuccess = (state, profile) => {
  const publicProfile = reformatNestedFields(profile)
  return {
    ...state,
    removingItem: false,
    removedItem: true,
    removedItemSuccess: true,
    publicProfile,
    forms: { ...state.forms, ...publicProfile },
  }
}

export const requestedProfileItemRemoveError = (state, error) => ({
  ...state,
  removingItem: false,
  removedItem: true,
  removedItemSuccess: false,
  error,
})
