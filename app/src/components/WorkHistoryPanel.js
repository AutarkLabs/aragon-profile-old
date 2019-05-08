import React, { Fragment, useContext } from 'react'

import { BoxContext } from '../wrappers/box'
import WorkHistoryTile from './WorkHistoryTile'
import { SmallMargin } from './styled-components'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'

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
    >
      {Object.keys(workHistory).map(id => {
        return (
          <Fragment key={id}>
            <WorkHistoryTile
              id={id}
              description={workHistory[id].description}
              employer={workHistory[id].employer}
              endDate={workHistory[id].endDate}
              ethereumAddress={ethereumAddress}
              jobTitle={workHistory[id].jobTitle}
              startDate={workHistory[id].startDate}
            />
            <SmallMargin />
          </Fragment>
        )
      })}
    </CardWrapper>
  )
}

export default WorkHistoryPanel
