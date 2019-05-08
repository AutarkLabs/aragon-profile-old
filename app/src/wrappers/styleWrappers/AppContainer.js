import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useAragonApi } from '@aragon/api-react'
import { AppView, AppBar } from '@aragon/ui'

import AuthButton from '../../components/AuthButton'
import UserInfoModal from '../../components/modals'

const AppContainer = ({ children }) => {
  const { connectedAccount } = useAragonApi()
  return (
    <AppView
      appBar={
        <AppBar
          title="Profile"
          endContent={<AuthButton connectedAccount={connectedAccount} />}
        />
      }
      padding={0}
    >
      <Fragment>
        <UserInfoModal ethereumAddress={connectedAccount} />
        {children}
      </Fragment>
    </AppView>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContainer
