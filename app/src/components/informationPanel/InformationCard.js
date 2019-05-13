import React, { useContext } from 'react'
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

const InformationCard = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  const userLoaded = !!boxes[ethereumAddress]

  const fields = boxes[ethereumAddress].publicProfile

  fields.website = 'https://autark.xyz'
  fields.github = 'rkzel'
  fields.location = 'Mons Olympus'
  fields.twitter = 'autarklabs'

  return !userLoaded ? (
    <div>No profile</div>
  ) : (
    <StyledCard>
      <Information>
        <Details>
          <Text.Block size="xxlarge" style={{ fontWeight: '700' }}>
            {fields.name ? fields.name : 'name'}
          </Text.Block>
          <Text.Block size="normal">
            {fields.description ? fields.description : 'description'}
          </Text.Block>

          {fields.location && (
            <Social>
              <IconLocation
                width="1rem"
                height="1rem"
                color={theme.textTertiary}
              />
              <Text size="small" color={theme.textTertiary}>
                {fields.location}
              </Text>
            </Social>
          )}
          {fields.website && (
            <Social>
              <IconGitHub
                width="1rem"
                height="1rem"
                color={theme.textTertiary}
              />
              <SafeLink
                value={fields.website}
                placeholder="website"
                size="small"
              />
            </Social>
          )}
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
