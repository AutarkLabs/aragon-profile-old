import React, { useState } from 'react'
import { Button, Text, TextInput, theme } from '@aragon/ui'
import PropTypes from 'prop-types'
import { ModalWrapper, TwoColumnsRow } from './ModalWrapper'
import { Label } from '../styled-components'
import validator from '../../utils/validation'

const validateName = validator.compile({
  type: 'string',
  minLength: 1,
  maxLength: 32,
})

const validateWebsite = validator.compile({
  type: 'string',
  format: 'uri',
})

// validation does not force BasicInformation to refresh.
// need to trigger it manually...
const useForceUpdate = () => {
  const [value, set] = useState(true)
  return () => set(!value)
}

const BasicInformation = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
}) => {
  const [validationErrors, setError] = useState({})
  const forceUpdate = useForceUpdate()

  const validateAndSave = () => {
    if (!validateName(getFormValue('name'))) {
      validationErrors['name'] = 'Please provide valid name'
    } else {
      delete validationErrors['name']
    }

    const website = getFormValue('website')
    if (website && !validateWebsite(getFormValue('website'))) {
      validationErrors['website'] = 'Please provide valid website address'
    } else {
      delete validationErrors['website']
    }

    setError(validationErrors)

    if (Object.keys(validationErrors).length) {
      forceUpdate()
    } else {
      saveProfile(ethereumAddress)
    }
  }

  const displayErrors = () => {
    return Object.keys(validationErrors).length ? (
      <div>
        {Object.keys(validationErrors).map(errorSource => (
          <Text.Block key={errorSource} color={theme.negative}>
            {validationErrors[errorSource]}
          </Text.Block>
        ))}
      </div>
    ) : (
      ''
    )
  }

  return (
    <ModalWrapper title="Edit Basic Information">
      {displayErrors()}
      <TwoColumnsRow>
        <div>
          <Label>Name</Label>
          <TextInput
            wide
            onChange={e => onChange(e.target.value, 'name')}
            value={getFormValue('name')}
            style={{
              borderColor: validationErrors['name'] ? 'red' : 'default',
            }}
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
          style={{
            borderColor: validationErrors['website'] ? 'red' : 'default',
          }}
        />
      </div>

      <Button mode="strong" wide onClick={() => validateAndSave()}>
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
