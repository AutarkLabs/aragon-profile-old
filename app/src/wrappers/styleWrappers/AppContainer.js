import React from 'react'
import PropTypes from 'prop-types'
import { useAragonApi } from '@aragon/api-react'
import { AppView, AppBar } from '@aragon/ui'
import logoBackground from '../../assets/logo-background.svg'

import AuthButton from '../../components/AuthButton'

const style = {
  backgroundColor: '#F7FBFD',
  backgroundImage: `url(${logoBackground})`,
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
}

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
      style={style}
    >
      {children}
    </AppView>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContainer
