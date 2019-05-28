import JsonSchemaValidator from 'ajv'
import { isAddress } from 'web3-utils'

export const validator = new JsonSchemaValidator({
  coerceTypes: true,
  useDefaults: true,
})

// not in use at the moment, left here for future reference
validator.addFormat('address', {
  type: 'string',
  validate: isAddress,
})

// Work Panel
export const validateWorkPlace = validator.compile({
  type: 'string',
  minLength: 1,
  maxLength: 64,
})

export const validateJobTitle = validator.compile({
  type: 'string',
  minLength: 1,
  maxLength: 64,
})

export const validateEducationDates = (startDate, endDate) => {
  if (!startDate && !endDate) return true
  else if (!startDate && endDate) return false
  else if (startDate && !endDate) return true
  else if (startDate > endDate) return false
  else return true
}

export const validateWorkDates = (startDate, endDate) => {
  if (!startDate) return false
  else if (!endDate) return true
  else if (startDate > endDate) return false
  else return true
}

// Education Panel
export const validateEducationOrg = validator.compile({
  type: 'string',
  minLength: 1,
  maxLength: 64,
})

// Basic Information Panel
export const validateName = validator.compile({
  type: 'string',
  minLength: 1,
  maxLength: 32,
})

export const validateWebsite = validator.compile({
  type: 'string',
  format: 'uri',
})
