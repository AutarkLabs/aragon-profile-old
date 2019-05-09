import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'

import { BoxContext } from '../wrappers/box'
import { ModalContext } from '../wrappers/modal'
import { SmallMargin } from './styled-components'
import EducationHistoryTile from './EducationHistoryTile'
import { open } from '../stateManagers/modal'

const EducationPanel = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)
  const userLoaded = !!boxes[ethereumAddress]

  const educationHistory = userLoaded
    ? boxes[ethereumAddress].publicProfile.educationHistory
    : {}

  console.log(educationHistory)

  return (
    <CardWrapper
      title="Education"
      addMore={() => dispatchModal(open('educationHistory'))}
    >
      {educationHistory ? (
        Object.keys(educationHistory).map(id => (
          <Fragment key={id}>
            <EducationHistoryTile
              degree={educationHistory[id].degree}
              organization={educationHistory[id].organization}
              endDate={educationHistory[id].endDate}
              openModal={() => dispatchModal(open('educationHistory', id))}
              startDate={educationHistory[id].startDate}
            />
            <SmallMargin />
          </Fragment>
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>No education</div>
      )}
    </CardWrapper>
  )
}

EducationPanel.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default EducationPanel
