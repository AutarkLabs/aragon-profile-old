import { OPENED_MODAL, CLOSED_MODAL, REMOVE_ITEM } from './actionTypes'

export const open = (type, id) => ({
  type: OPENED_MODAL,
  meta: {
    type,
    id,
  },
})

export const close = () => ({
  type: CLOSED_MODAL,
})

export const removeItem = (id, itemType) => ({
  type: REMOVE_ITEM,
  meta: {
    id,
    itemType,
  },
})
