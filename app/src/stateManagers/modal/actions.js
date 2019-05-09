import { OPENED_MODAL, CLOSED_MODAL } from './actionTypes'

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
