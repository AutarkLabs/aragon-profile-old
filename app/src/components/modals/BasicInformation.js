import React, { Fragment, useState, useContext } from 'react'
import { Modal, Text } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  AlignRight,
  EditIcon,
  SmallMargin,
  FlexDirectionRow,
  FlexGrowTextInput,
  FullWidthButton,
  FullWidthTextInput,
} from '../styled-components'

import { BoxContext } from '../../wrappers/box'
import {
  editField,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../../stateManagers/box'
import { EditTextArea } from '../readOrEditFields'

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
        <SpaceAround>
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
        </SpaceAround>
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

const SpaceAround = styled(FlexDirectionRow)`
  justify-content: space-around;
`
