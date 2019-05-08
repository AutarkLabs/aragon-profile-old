import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'

import { BoxContext } from '../wrappers/box'
import { SmallMargin } from './styled-components'
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
    >
      {educationHistory ? (
        Object.keys(educationHistory).map(id => (
          <Fragment key={id}>
            <EducationHistoryTile
              degree={educationHistory[id].degree}
              organization={educationHistory[id].organization}
              endDate={educationHistory[id].endDate}
              openModal={() =>
                dispatch(openModal(ethereumAddress, 'educationHistory', id))
              }
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
