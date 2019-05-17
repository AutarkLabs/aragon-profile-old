import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, Card, theme } from '@aragon/ui'

import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import { open } from '../../stateManagers/modal'
import { SafeLink } from '../readOrEditFields'
import {
  IconPencil,
  IconGitHub,
  IconTwitter,
  IconLocation,
  IconEthereum,
  IconVerified,
} from '../../assets/'

const shortenAddress = address =>
  address.slice(0, 12) + '...' + address.slice(-10)

const renderName = fields => {
  const { dispatchModal } = useContext(ModalContext)

  return fields.name ? (
    <Text.Block size="xxlarge" style={{ fontWeight: '700' }}>
      {fields.name}
    </Text.Block>
  ) : (
    <Center>
      <Text
        style={{ cursor: 'pointer' }}
        size="large"
        color={theme.accent}
        onClick={() => dispatchModal(open('basicInformation'))}
      >
        Add name
      </Text>
    </Center>
  )
}

const renderDescription = fields => {
  const { dispatchModal } = useContext(ModalContext)

  return fields.description ? (
    <Text.Block>{fields.description}</Text.Block>
  ) : (
    <Center>
      <Text.Block
        style={{ cursor: 'pointer' }}
        size="large"
        color={theme.accent}
        onClick={() => dispatchModal(open('basicInformation'))}
      >
        Add bio
      </Text.Block>
    </Center>
  )
}

const InformationCard = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  const userLoaded = !!boxes[ethereumAddress]

  // return early if there is no profile to display
  if (!userLoaded) return <div>No profile</div>

  const fields = boxes[ethereumAddress].publicProfile
  //  (!(fields.name || fields.description || fields.location))
  return (
    <StyledCard>
      <Information>
        <Details>
          {!(fields.name || fields.description || fields.location) ? (
            <Center height="10rem">
              <Text.Block style={{ textAlign: 'center' }} size="xlarge">
                You have no name, bio or location
              </Text.Block>
              <Text
                style={{ cursor: 'pointer' }}
                size="small"
                color={theme.accent}
                onClick={() => dispatchModal(open('basicInformation'))}
              >
                Add basic information
              </Text>
            </Center>
          ) : (
            <Fragment>
              {renderName(fields)}
              {renderDescription(fields)}
            </Fragment>
          )}
          <Social>
            <IconLocation
              width="1rem"
              height="1rem"
              color={theme.textTertiary}
            />
            {fields.location ? (
              <Text size="small" color={theme.textTertiary}>
                {fields.location}
              </Text>
            ) : (
              <Text
                style={{ cursor: 'pointer' }}
                color={theme.accent}
                onClick={() => dispatchModal(open('basicInformation'))}
              >
                Add location
              </Text>
            )}
          </Social>
          <Social>
            <IconGitHub width="1rem" height="1rem" color={theme.textTertiary} />
            {fields.website ? (
              <SafeLink
                value={fields.website}
                placeholder="website"
                size="small"
              />
            ) : (
              <Text
                style={{ cursor: 'pointer' }}
                color={theme.accent}
                onClick={() => dispatchModal(open('basicInformation'))}
              >
                Add website
              </Text>
            )}
          </Social>
          {fields.twitter && (
            <Social>
              <IconTwitter
                width="1rem"
                height="1rem"
                color={theme.textTertiary}
              />
              <SafeLink
                value={'https://twitter.com/' + fields.twitter}
                placeholder="twitter account"
                size="small"
              />
              <IconVerified />
            </Social>
          )}
          {fields.github && (
            <Social>
              <IconGitHub
                width="1rem"
                height="1rem"
                color={theme.textTertiary}
              />
              <SafeLink
                value="https://github.com"
                placeholder="github account"
                size="small"
              />
            </Social>
          )}
          <Social>
            <IconEthereum
              width="1rem"
              height="1rem"
              color={theme.textTertiary}
            />
            <Text size="small" color={theme.textTertiary}>
              {shortenAddress(ethereumAddress)}
            </Text>
          </Social>
        </Details>
        <Icons>
          <IconPencil
            width="16px"
            color={theme.accent}
            onClick={() => dispatchModal(open('basicInformation'))}
          />
        </Icons>
      </Information>
    </StyledCard>
  )
}

InformationCard.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || '3rem'};
`
const Social = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    width: 2rem;
  }
  > :nth-child(3) {
    margin-left: 0.6rem;
  }
`
const Information = styled.div`
  display: flex;
  > :not(:last-child) {
    margin-bottom: 0.2rem;
  }
`
const Icons = styled.div`
  display: inline-flex;
  width: auto;
  flex-direction: column;
  visibility: hidden;
  > * {
    margin: 0 0 0.6rem 0.6rem;
    cursor: pointer;
  }
  ${Information}:hover & {
    visibility: visible;
  }
}
`
const Details = styled.div`
  width: 100%;
  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`
const StyledCard = styled(Card).attrs({ width: '100%', height: 'auto' })`
  padding: 1.2rem;
  padding-top: 4rem;
`

export default InformationCard
