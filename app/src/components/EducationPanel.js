import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'
import { BoxContext } from '../wrappers/box'
import EducationHistoryTile from './EducationHistoryTile'
import { openModal } from '../stateManagers/box'

const EducationPanel = ({ ethereumAddress }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const userLoaded = !!boxes[ethereumAddress]

  const educationHistory = userLoaded
    ? boxes[ethereumAddress].publicProfile.educationHistory
    : {}

  return (
    <CardWrapper
      title="Education"
      addMore={() => dispatch(openModal(ethereumAddress, 'educationHistory'))}
      addSeparators
    >
      {educationHistory ? (
        Object.keys(educationHistory).map(id => (
          <EducationHistoryTile
            key={id}
            educationHistoryData={educationHistory[id]}
            openModal={() =>
              dispatch(openModal(ethereumAddress, 'educationHistory', id))
            }
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
