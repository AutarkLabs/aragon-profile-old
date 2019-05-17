import React from 'react'
import { Button, TextInput } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow } from './ModalWrapper'
import { Label } from '../styled-components'

const BasicInformation = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
}) => {
  return (
    <ModalWrapper title="Edit Basic Information1">
      <TwoColumnsRow>
        <div>
          <Label>Name</Label>
          <TextInput
            wide
            onChange={e => onChange(e.target.value, 'name')}
            value={getFormValue('name')}
          />
        </div>
        <div>
          <Label>Location</Label>
          <TextInput
            wide
            onChange={e => onChange(e.target.value, 'location')}
            value={getFormValue('location')}
          />
        </div>
      </TwoColumnsRow>

      <div>
        <Label>Bio</Label>
        <TextInput.Multiline
          style={{ height: '80px' }}
          wide
          value={getFormValue('description')}
          onChange={e => onChange(e.target.value, 'description')}
        />
      </div>
      <div>
        <Label>Website</Label>
        <TextInput
          wide
          value={getFormValue('website')}
          onChange={e => onChange(e.target.value, 'website')}
          type="url"
        />
      </div>

      <Button mode="strong" wide onClick={() => saveProfile(ethereumAddress)}>
        Save
      </Button>
    </ModalWrapper>
  )
}

BasicInformation.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
}

export default BasicInformation
