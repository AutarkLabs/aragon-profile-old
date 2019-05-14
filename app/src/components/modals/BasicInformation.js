import React from 'react'
import { Field, Button, DropDown, TextInput } from '@aragon/ui'
import PropTypes from 'prop-types'
import ModalWrapper from './ModalWrapper'

const BasicInformation = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
}) => {
  const title = 'Edit Basic Information'

  const months = [
    'Month',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const years = ['Year', '2018', '2019']

  return (
    <ModalWrapper title={title}>
      <Field label="Name">
        <TextInput
          wide
          onChange={e => onChange(e.target.value, 'name')}
          value={getFormValue('name')}
        />
      </Field>

      <Field label="Location">
        <TextInput
          wide
          onChange={e => onChange(e.target.value, 'location')}
          value={getFormValue('location')}
        />
      </Field>

      <Field label="Bio">
        <TextInput.Multiline
          wide
          rows="3"
          value={getFormValue('description')}
          onChange={e => onChange(e.target.value, 'description')}
        />
      </Field>

      <Field label="Website">
        <TextInput
          wide
          value={getFormValue('website')}
          onChange={e => onChange(e.target.value, 'website')}
          type="url"
          size="normal"
        />
      </Field>

      <Field label="date">
        <DropDown
          items={months}
          active={1}
          onChange={e => onChange(e.target.value, 'description')}
        />
        <DropDown
          items={years}
          active={1}
          onChange={e => onChange(e.target.value, 'description')}
        />
      </Field>

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
