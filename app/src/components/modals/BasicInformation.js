import React, { Fragment, useState, useContext } from 'react'
import { Modal, Button, Text, TextInput } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { BoxContext } from '../../wrappers/box'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../../stateManagers/box'
import { EditTextArea } from '../readOrEditFields'

import editImage from '../../assets/pencil-black-tool-interface-symbol.png'

const BasicInformation = ({ ethereumAddress }) => {
  const [opened, setOpened] = useState(false)
  const { boxes, dispatch } = useContext(BoxContext)

  const userLoaded = !!boxes[ethereumAddress]

  const onChange = (value, field) => {
    dispatch(editField(ethereumAddress, field, value))
  }

  const getFormValue = field => {
    if (!userLoaded) return ''
    return boxes[ethereumAddress].forms[field] || ''
  }

  const saveProfile = async connectedAccount => {
    dispatch(savingProfile(connectedAccount))

    try {
      const { changed, forms, unlockedBox } = boxes[connectedAccount]
      const changedValues = changed.map(field => forms[field])
      await unlockedBox.setPublicFields(changed, changedValues)
      dispatch(savedProfile(connectedAccount, forms))
      setOpened(false)
    } catch (error) {
      dispatch(saveProfileError(connectedAccount, error))
    }
  }

  return (
    <Fragment>
      <AlignRight
        tabindex="0"
        role="button"
        aria-pressed={opened}
        onClick={() => setOpened(!opened)}
      >
        <EditIcon />
      </AlignRight>
      <Modal visible={opened}>
        <Text>Edit Basic Information</Text>
        <SmallMargin />
        <FlexDirectionRow>
          <FlexGrowTextInput
            type={'text'}
            disabled={!userLoaded}
            onChange={e => onChange(e.target.value, 'name')}
            value={getFormValue('name')}
            placeholder={'Name'}
          />
          <SmallMargin />
          <FlexGrowTextInput
            type="text"
            disabled={!userLoaded}
            onChange={e => onChange(e.target.value, 'location')}
            value={getFormValue('location')}
            placeholder={'Location'}
          />
        </FlexDirectionRow>
        <SmallMargin />
        <EditTextArea
          value={getFormValue('description')}
          placeholder={'Bio'}
          onChange={e => onChange(e.target.value, 'description')}
          type="text"
          disabled={!userLoaded}
          size="normal"
        />
        <SmallMargin />
        <FullWidthTextInput
          value={getFormValue('website')}
          placeholder={'Website'}
          onChange={e => onChange(e.target.value, 'website')}
          type="url"
          size="normal"
        />
        <SmallMargin />
        <FullWidthButton
          mode="strong"
          onClick={() => saveProfile(ethereumAddress)}
        >
          Save
        </FullWidthButton>
        <SmallMargin />
        <FullWidthButton onClick={() => setOpened(false)}>
          Close modal
        </FullWidthButton>
      </Modal>
    </Fragment>
  )
}

BasicInformation.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

export default BasicInformation

const AlignRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
`

const EditIcon = styled.img.attrs({ src: editImage })`
  width: 25px;
`

const SmallMargin = styled.div`
  margin-top: 10px;
`

const FlexDirectionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const FullWidthButton = styled(Button)`
  width: 100%;
`

const FullWidthTextInput = styled(TextInput)`
  width: 100%;
`

const FlexGrowTextInput = styled(TextInput)`
  flex-grow: 1;
`
