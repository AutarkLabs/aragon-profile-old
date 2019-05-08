import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@aragon/ui'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'

import { BoxContext } from '../wrappers/box'

import { openModal } from '../stateManagers/box'

const EducationPanel = ({ ethereumAddress }) => {
  const { dispatch } = useContext(BoxContext)

  return (
    <CardWrapper
      title="Education"
      addMore={() => dispatch(openModal(ethereumAddress, 'educationHistory'))}
    >
      <Text>education</Text>
    </CardWrapper>
  )
}

EducationPanel.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default EducationPanel
