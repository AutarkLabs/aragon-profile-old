import React, { Fragment, useContext } from 'react'

import { BoxContext } from '../wrappers/box'
import { ModalContext } from '../wrappers/modal'

import WorkHistoryTile from './WorkHistoryTile'
import { SmallMargin } from './styled-components'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'

import { open } from '../stateManagers/modal'

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
    >
      {workHistory ? (
        Object.keys(workHistory).map(id => (
          <Fragment key={id}>
            <WorkHistoryTile
              id={id}
              description={workHistory[id].description}
              employer={workHistory[id].employer}
              endDate={workHistory[id].endDate}
              ethereumAddress={ethereumAddress}
              jobTitle={workHistory[id].jobTitle}
              openModal={() => dispatchModal(open('workHistory', id))}
              startDate={workHistory[id].startDate}
            />
            <SmallMargin />
          </Fragment>
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>No work history</div>
      )}
    </CardWrapper>
  )
}

export default WorkHistoryPanel
