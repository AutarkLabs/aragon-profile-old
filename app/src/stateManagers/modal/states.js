export const initialState = { type: null, id: null, itemType: null }

export const openedModal = (state, type, id) => ({
  ...state,
  type,
  id,
})

export const closedModal = state => ({
  ...state,
  type: null,
  id: null,
  itemType: null,
})

export const removeItem = (state, id, itemType) => ({
  ...state,
  type: 'removeItem',
  itemType,
  id,
})

export const startDrag = state => ({
  ...state,
  drag: true,
})
