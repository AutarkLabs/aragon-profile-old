import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Viewport } from '@aragon/ui'

import InformationPanel from './informationPanel'
import OrganizationPanel from './OrganizationPanel'
import EducationPanel from './EducationPanel'
import WorkHistoryPanel from './WorkHistoryPanel'

const Profile = ({ ethereumAddress }) => {
  return (
    <div style={{ width: '100%' }}>
      <CoverImage />
      <Viewport>
        {({ below }) =>
          below(640) ? (
            <SingleColumn>
              <InformationPanel ethereumAddress={ethereumAddress} />
              <OrganizationPanel />
              <WorkHistoryPanel />
              <EducationPanel />
            </SingleColumn>
          ) : (
            <DoubleColumn>
              <LeftColumn>
                <InformationPanel ethereumAddress={ethereumAddress} />
                <EducationPanel />
              </LeftColumn>
              <RightColumn>
                <OrganizationPanel />
                <WorkHistoryPanel />
              </RightColumn>
            </DoubleColumn>
          )
        }
      </Viewport>
    </div>
  )
}

Profile.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

const CoverImage = styled.div`
  width: 100%;
  height: 12rem;
  background-image: url('https://cdn2.spacedecentral.net/assets/stars-551011e393a28d383a3f188ea38c595c9721561d3cf733bd63ce976616c0b0cd.jpg');
`
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 25rem;

  margin: 1rem;
  > * {
    margin-bottom: 2rem;
  }
`
const RightColumn = styled(LeftColumn)`
  width: 100%;
  max-width: 46rem;
`
const SingleColumn = styled(RightColumn)`
  width: auto;
  padding: 0 1rem;
  background-color: #ffffff;
  align-content: stretch;
`
const DoubleColumn = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 2rem;
`

export default Profile
