import React, { Fragment } from 'react'
import { Text } from '@aragon/ui'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  SmallMargin,
  FlexDirectionRow,
  FlexGrowTextInput,
  FullWidthButton,
  FullWidthTextInput,
} from '../styled-components'

import { EditTextArea } from '../readOrEditFields'

const BasicInformation = ({
  ethereumAddress,
  getFormValue,
  onChange,
  saveProfile,
}) => {
  return (
    <Fragment>
      <Text>Edit Basic Information</Text>
      <SmallMargin />
      <SpaceAround>
        <FlexGrowTextInput
          type={'text'}
          onChange={e => onChange(e.target.value, 'name')}
          value={getFormValue('name')}
          placeholder={'Name'}
        />
        <SmallMargin />
        <FlexGrowTextInput
          type="text"
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
    </Fragment>
  )
}

BasicInformation.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
}

export default BasicInformation

const SpaceAround = styled(FlexDirectionRow)`
  justify-content: space-around;
`
