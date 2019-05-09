import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { BoxContext } from '../wrappers/box'
import { ModalContext } from '../wrappers/modal'
import EducationHistoryTile from './EducationHistoryTile'
import { open } from '../stateManagers/modal'

const EducationPanel = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)
  const userLoaded = !!boxes[ethereumAddress]

  const educationHistory = userLoaded
    ? boxes[ethereumAddress].publicProfile.educationHistory
    : {}

  return (
    <CardWrapper
      title="Education"
      addMore={() => dispatchModal(open('educationHistory'))}
      addSeparators
    >
      {educationHistory ? (
        Object.keys(educationHistory).map(id => (
          <EducationHistoryTile
            key={id}
            educationHistoryData={educationHistory[id]}
            openModal={() => dispatchModal(open('educationHistory', id))}
          />
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
