import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, Card, theme, Button, SafeLink, IconClose } from '@aragon/ui'

import { BoxContext } from '../../wrappers/box'
import { ModalContext } from '../../wrappers/modal'
import { open } from '../../stateManagers/modal'
import {
  IconPencil,
  IconGitHub,
  IconTwitter,
  IconLocation,
  IconEthereum,
  IconVerified,
  IconGlobe,
} from '../../assets/'

const shortenAddress = address =>
  address.slice(0, 12) + '...' + address.slice(-10)

const InformationCard = ({ ethereumAddress }) => {
  const [activePopover, setPopover] = useState('')

  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  const userLoaded = !!boxes[ethereumAddress]

  // return early if there is no profile to display
  if (!userLoaded) return <div>No profile</div>

  const fields = boxes[ethereumAddress].publicProfile

  const popoverCard = social => (
    <VerifyCard>
      <Text.Block size="xlarge">Verify my {social}</Text.Block>
      <CardCloseButton type="button" onClick={() => setPopover('')}>
        <IconClose />￼
      </CardCloseButton>

      <Text.Block size="small">
        Aragon manages profiles using 3box.io. To verify your {social}, you must
        visit your 3box profile.
      </Text.Block>
      <SafeLink
        style={{ color: theme.accent, fontWeight: 'bold' }}
        size="small"
        href="https://3box.io"
        target="_blank"
      >
        Take me to my 3box
      </SafeLink>
    </VerifyCard>
  )

  const renderName = fields =>
    fields.name ? (
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

  const renderDescription = fields =>
    fields.description ? (
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

  const renderLocation = fields => (
    <Social>
      <IconLocation width="1rem" height="1rem" color={theme.textTertiary} />
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
  )

  const renderEmpty = () => (
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
  )

  return (
    <StyledCard>
      <Information>
        <Details>
          {!(fields.name || fields.description || fields.location) ? (
            renderEmpty()
          ) : (
            <Fragment>
              {renderName(fields)}
              {renderDescription(fields)}
              {renderLocation(fields)}
            </Fragment>
          )}
          <Social>
            <IconGlobe width="1rem" height="1rem" color={theme.textPrimary} />
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
          <Separator style={{ marginBottom: '1.1rem' }} />
          <Social>
            <IconTwitter
              width="1rem"
              height="1rem"
              color={theme.textTertiary}
            />
            {fields.twitter ? (
              <Fragment>
                <SafeLink
                  value={'https://twitter.com/' + fields.twitter}
                  placeholder="twitter account"
                  size="small"
                />
                <IconVerified />
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  compact
                  mode="outline"
                  style={{ position: 'relative' }}
                  onClick={() => setPopover('twitter')}
                >
                  Verify my Twitter account
                </Button>

                {activePopover === 'twitter' && popoverCard('Twitter')}
              </Fragment>
            )}
          </Social>
          <Social>
            <IconGitHub width="1rem" height="1rem" color={theme.textTertiary} />
            {fields.github ? (
              <Fragment>
                <SafeLink
                  value="https://github.com"
                  placeholder="github account"
                  size="small"
                />
                <IconVerified />
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  compact
                  mode="outline"
                  style={{ position: 'relative' }}
                  onClick={() => setPopover('github')}
                >
                  Verify my GitHub account
                </Button>
                {activePopover === 'github' && popoverCard('GitHub')}
              </Fragment>
            )}
          </Social>
          <Separator />
          <Social>
            <IconEthereum
              width="1rem"
              height="1rem"
              color={theme.textTertiary}
            />
            <Text size="small" color={theme.textSecondary}>
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
const VerifyCard = styled(Card).attrs({
  width: '22rem',
  height: '13rem',
})`
  background: white;
  padding: 1rem 1.5rem;
  position: absolute;
  left: 4rem;
  z-index: 2;
  > :not(:last-child) {
    margin-bottom: 1rem;
  }
`
const CardCloseButton = styled.button`
  ${VerifyCard} & {
    position: absolute;
    ￼padding: 20px;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    background: none;
    border: 0;
    outline: 0;
    &::-moz-focus-inner {
      border: 0;
    }
  }
￼`
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
const Separator = styled.hr`
  height: 1px;
  border: 0;
  width: 100%;
  margin: 1rem;
  background: ${theme.contentBorder};
`

export default InformationCard
