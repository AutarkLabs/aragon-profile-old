import React, { Fragment, useState } from 'react'
import { Button, Text, TextInput, theme } from '@aragon/ui'
import styled from 'styled-components'
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

const hasErrors = errorObj => Object.keys(errorField => !!errorObj[errorField])

const DisplayErrors = ({ validationErrors }) => {
  return hasErrors(validationErrors) ? (
    <Fragment>
      {Object.keys(validationErrors)
        .filter(field => !!validationErrors[field])
        .map(errorSource => (
          <Text.Block key={errorSource} color={theme.negative}>
            {validationErrors[errorSource]}
          </Text.Block>
        ))}
    </Fragment>
  ) : (
    <Fragment />
  )
}

DisplayErrors.defaultProps = {
  validationErrors: {},
}

const TextInputWithValidation = styled(TextInput)`
  border-color: ${props => (props.error ? 'red' : 'default')};
`

const BasicInformation = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
}) => {
  const [validationErrors, setValidationErrors] = useState({})

  const validateAndSave = () => {
    const errors = {}
    if (!validateName(getFormValue('name')))
      errors['name'] = 'Please provide valid name'

    if (!validateWebsite(getFormValue('website')))
      errors['website'] = 'Please provide valid website address'

    setValidationErrors(errors)
    if (!hasErrors(errors)) saveProfile(ethereumAddress)
  }

  return (
    <ModalWrapper title="Edit Basic Information">
      <DisplayErrors validationErrors={validationErrors} />
      <TwoColumnsRow>
        <div>
          <Label>Name</Label>
          <TextInputWithValidation
            wide
            onChange={e => onChange(e.target.value, 'name')}
            value={getFormValue('name')}
            error={validationErrors['name']}
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
        <TextInputWithValidation
          wide
          value={getFormValue('website')}
          onChange={e => onChange(e.target.value, 'website')}
          type="url"
          error={validationErrors['website']}
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
