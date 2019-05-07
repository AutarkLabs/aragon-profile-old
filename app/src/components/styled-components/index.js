import styled from 'styled-components'
import { Button, TextInput } from '@aragon/ui'

import editImage from '../../assets/pencil-black-tool-interface-symbol.png'

export const AlignRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
`

export const EditIcon = styled.img.attrs({ src: editImage })`
  width: 25px;
`

export const SmallMargin = styled.div`
  margin-top: 10px;
`

export const FlexDirectionRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const FlexDirectionCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const FullWidthButton = styled(Button)`
  width: 100%;
`

export const FullWidthTextInput = styled(TextInput)`
  width: 100%;
`

export const FlexGrowTextInput = styled(TextInput)`
  flex-grow: 1;
`
