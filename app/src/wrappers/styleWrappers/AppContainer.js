import React from 'react'
import PropTypes from 'prop-types'
import { AppView, AppBar } from '@aragon/ui'

const AppContainer = ({ children }) => (
  <AppView appBar={<AppBar title="Profile" />} padding={0}>
    {children}
  </AppView>
)

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContainer
