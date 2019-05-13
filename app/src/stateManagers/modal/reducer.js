import { OPENED_MODAL, CLOSED_MODAL, REMOVE_ITEM } from './actionTypes'

import { openedModal, closedModal, removeItem } from './states'

import { log } from '../../../utils'

const logStateUpdate = (action, prevState, nextState) => {
  log('ACTION: ', action, 'PREV STATE: ', prevState, 'NEXT STATE:', nextState)
}

const modalReducer = (prevState, action) => {
  switch (action.type) {
    case OPENED_MODAL: {
      const nextState = openedModal(
        { ...prevState },
        action.meta.type,
        action.meta.id
      )
      logStateUpdate(action, prevState, nextState)
      return nextState
    }
    case CLOSED_MODAL: {
      const nextState = closedModal({ ...prevState })
      logStateUpdate(action, prevState, nextState)
      return nextState
    }
    case REMOVE_ITEM: {
      const nextState = removeItem(
        { ...prevState },
        action.meta.id,
        action.meta.itemType
      )
      logStateUpdate(action, prevState, nextState)
      return nextState
    }
    default: {
      return prevState
    }
  }
}

export default modalReducer
