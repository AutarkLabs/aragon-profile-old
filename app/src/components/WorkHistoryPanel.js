import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { BoxContext } from '../wrappers/box'
import { ModalContext } from '../wrappers/modal'
import WorkHistoryTile from './WorkHistoryTile'
import { open, removeItem } from '../stateManagers/modal'

const WorkHistoryPanel = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  const userLoaded = !!boxes[ethereumAddress]

  const workHistory = userLoaded
    ? boxes[ethereumAddress].publicProfile.workHistory
    : {}

  return (
    <CardWrapper
      title="Work history"
      addMore={() => dispatchModal(open('workHistory'))}
      addSeparators
    >
      {workHistory ? (
        Object.keys(workHistory).map(id => (
          <WorkHistoryTile
            key={id}
            workHistoryData={workHistory[id]}
            openModal={() => dispatchModal(open('workHistory', id))}
            removeItem={() => dispatchModal(removeItem(id, 'workHistory'))}
          />
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>No work history</div>
      )}
    </CardWrapper>
  )
}

WorkHistoryPanel.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default WorkHistoryPanel
