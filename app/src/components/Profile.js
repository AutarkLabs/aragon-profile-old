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
          below('small') ? (
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
  height: 150px;
  background-image: url('https://cdn2.spacedecentral.net/assets/stars-551011e393a28d383a3f188ea38c595c9721561d3cf733bd63ce976616c0b0cd.jpg');
`
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;

  margin: 10px;
  > * {
    margin-bottom: 20px;
  }
`
const RightColumn = styled(LeftColumn)`
  width: 100%;
  max-width: 600px;
`
const SingleColumn = styled(RightColumn)`
  margin: 0;
  padding: 10px;
  background-color: #ffffff;
`
const DoubleColumn = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`

export default Profile
