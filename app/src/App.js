import React, { useContext } from 'react'
import { useAragonApi } from '@aragon/api-react'
import { Main } from '@aragon/ui'
import styled from 'styled-components'

import { BoxWrapper } from './wrappers/box'
import AppContainer from './wrappers/styleWrappers/AppContainer'
import LoadAndErrorWrapper from './wrappers/loadAndErrorWrapper'
import Profile from './components/Profile'
import { ModalWrapper, ModalContext } from './wrappers/modal'
import { startDrag } from './stateManagers/modal'

function App() {
  const { connectedAccount } = useAragonApi()
  const { dispatchModal } = useContext(ModalContext)

  const handleStartDrag = e => {
    console.log('dragenter')
    e.stopPropagation()
    dispatchModal(startDrag())
  }

  window.addEventListener('dragenter', e => handleStartDrag(e))

  return (
    <Main>
      <BoxWrapper>
        <ModalWrapper ethereumAddress={connectedAccount}>
          <AppContainer>
            <BaseLayout>
              <LoadAndErrorWrapper ethereumAddress={connectedAccount}>
                <Profile ethereumAddress={connectedAccount} />
              </LoadAndErrorWrapper>
            </BaseLayout>
          </AppContainer>
        </ModalWrapper>
      </BoxWrapper>
    </Main>
  )
}

const BaseLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default App
