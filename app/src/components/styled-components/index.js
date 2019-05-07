import styled from 'styled-components'
import { Button } from '@aragon/ui'

import { EditTextField } from '../readOrEditFields'
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

export const FullWidthTextInput = styled(EditTextField)`
  width: 100%;
`

export const FlexGrowTextInput = styled(EditTextField)`
  flex-grow: 1;
`
