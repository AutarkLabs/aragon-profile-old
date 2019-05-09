export const initialState = { type: false, id: null }

export const openedModal = (state, type, id) => ({
  ...state,
  type,
  id,
})

export const closedModal = state => ({
  ...state,
  type: false,
  id: null,
})
