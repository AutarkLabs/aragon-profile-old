import { image } from '../../../modules/things'

export const initialState = {}

export const fetchingPublicProfile = () => ({
  loadingPublicProf: true,
  loadedPublicProf: false,
  loadedPublicProfSuccess: false,
  unlockingProf: false,
  unlockedProf: false,
  unlockedProfSuccess: false,
  editingProfile: false,
  savingProfile: false,
  savedProfile: false,
  savedProfileSucess: false,
  unlockedBox: {},
  publicProfile: {},
  forms: {
    name: '',
    job: '',
    employer: '',
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

export const fetchedPublicProfileSuccess = (state, publicProfile) => {
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

export const requestProfileEdit = state => ({
  ...state,
  editingProfile: true,
})

const calculateChanged = (changed, field) => {
  if (!changed) return [field]

  if (!changed.includes(field)) return [...changed, field]
  return changed
}

export const editedField = (state, field, value, uniqueId, nestedField) => {
  const newFormVals = { ...state.forms }
  if (!uniqueId) newFormVals[field] = value
  else {
    const newNestedField = {
      ...newFormVals[field][uniqueId],
      [nestedField]: value,
    }
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

export const uploadedImage = (state, imageHash) => ({
  ...state,
  uploadingImage: false,
  uploadedImageSuccess: true,
  uploadedImage: true,
  forms: {
    ...state.forms,
    image: image(imageHash),
  },
  changed: calculateChanged(state.changed, 'image'),
})

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
  editingProfile: false,
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
  savedProfileSucess: true,
  editingProfile: false,
  error,
})
