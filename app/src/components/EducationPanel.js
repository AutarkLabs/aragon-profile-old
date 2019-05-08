import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@aragon/ui'
import CardWrapper from '../wrappers/styleWrappers/CardWrapper'

import { BoxContext } from '../wrappers/box'

import { BasicInformation } from './modals'

const addMore = () => console.log('add more education')

const EducationPanel = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)

  const userLoaded = !!boxes[ethereumAddress]

  return (
    <CardWrapper title="Education" addMore={addMore}>
      <Text>education</Text>
    </CardWrapper>
  )
}

export default EducationPanel
