import React from 'react'
import { useAragonApi } from '@aragon/api-react'
import { Main } from '@aragon/ui'
import styled from 'styled-components'

import { BoxWrapper } from './wrappers/box'
import AppContainer from './wrappers/styleWrappers/AppContainer'
import LoadAndErrorWrapper from './wrappers/loadAndErrorWrapper'
import Profile from './components/Profile'
import { ModalWrapper } from './wrappers/modal'
import { DragWrapper } from './wrappers/drag'

function App() {
  const { connectedAccount } = useAragonApi()

  return (
    <Main>
      <BoxWrapper>
        <ModalWrapper ethereumAddress={connectedAccount}>
          <DragWrapper>
            <AppContainer>
              <BaseLayout>
                <LoadAndErrorWrapper ethereumAddress={connectedAccount}>
                  <Profile ethereumAddress={connectedAccount} />
                </LoadAndErrorWrapper>
              </BaseLayout>
            </AppContainer>
          </DragWrapper>
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
