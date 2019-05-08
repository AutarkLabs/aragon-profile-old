import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@aragon/ui'
import CardWrapper from './CardWrapper'

import { BoxContext } from '../wrappers/box'
import { BasicInformation } from './modals'

const addMore = () => console.log('add more work')

const WorkHistoryPanel = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)

  const userLoaded = !!boxes[ethereumAddress]

  return (
    <CardWrapper title="Work History" addMore={addMore}>
      <Text>worked</Text>
    </CardWrapper>
  )
}

export default WorkHistoryPanel
