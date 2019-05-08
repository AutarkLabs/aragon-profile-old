import React, { Fragment, useContext } from 'react'

import { BoxContext } from '../wrappers/box'
import WorkHistoryTile from './WorkHistoryTile'
import { SmallMargin } from './styled-components'

const WorkHistoryPanel = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const userLoaded = !!boxes[ethereumAddress]

  const workHistory = userLoaded
    ? boxes[ethereumAddress].publicProfile.workHistory
    : {}

  return (
    <div>
      {Object.keys(workHistory).map(id => {
        return (
          <Fragment>
            <WorkHistoryTile
              key={id}
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
    </div>
  )
}

export default WorkHistoryPanel
