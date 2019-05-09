import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { BoxContext } from '../wrappers/box'
import WorkHistoryTile from './WorkHistoryTile'
import { openModal } from '../stateManagers/box'

const WorkHistoryPanel = ({ ethereumAddress }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const userLoaded = !!boxes[ethereumAddress]

  const workHistory = userLoaded
    ? boxes[ethereumAddress].publicProfile.workHistory
    : {}

  return (
    <CardWrapper
      title="Work history"
      addMore={() => dispatch(openModal(ethereumAddress, 'workHistory'))}
      addSeparators
    >
      {workHistory ? (
        Object.keys(workHistory).map(id => (
          <WorkHistoryTile
            key={id}
            workHistoryData={workHistory[id]}
            openModal={() =>
              dispatch(openModal(ethereumAddress, 'workHistory', id))
            }
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
