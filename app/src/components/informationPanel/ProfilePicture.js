import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ImageMenu from '../ImageMenu'
import { BoxContext } from '../../wrappers/box'

import defaultImage from '../../assets/profile_avatar.svg'
import editImage from '../../assets/pencil-black-tool-interface-symbol.png'

const ProfilePicture = ({ ethereumAddress }) => {
  const { boxes } = useContext(BoxContext)
  const userLoaded = !!boxes[ethereumAddress]
  const isEditing = userLoaded ? boxes[ethereumAddress].editingProfile : false

  const hasImage =
    userLoaded &&
    boxes[ethereumAddress].publicProfile.image &&
    boxes[ethereumAddress].publicProfile.image.length > 0

  const publicProfileImageCid =
    hasImage && boxes[ethereumAddress].publicProfile.image[0].contentUrl['/']

  const addedImage = userLoaded && boxes[ethereumAddress].uploadedImageSuccess

  // finally, in edit mode if a new image has been uploaded...
  const editProfileImageCid = addedImage
    ? boxes[ethereumAddress].forms.image[0].contentUrl['/']
    : publicProfileImageCid

  return (
    <Container
      className="imageHover"
      publicProfileImageCid={publicProfileImageCid}
      editProfileImageCid={editProfileImageCid}
    >
      {isEditing && (
        <TransparentEditOverlay>
          <EditIcon />
        </TransparentEditOverlay>
      )}
      <ImageMenu
        ethereumAddress={ethereumAddress}
        top={26}
        right={-6}
        imageExists={hasImage && addedImage}
      />
    </Container>
  )
}

ProfilePicture.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
}

const getBackground = props => {
  const imageCid = props.editProfileImageCid
    ? props.editProfileImageCid
    : props.publicProfileImageCid

  if (imageCid) return `url(https://ipfs.infura.io/ipfs/${imageCid})`

  return `url(${defaultImage})`
}

const getBorderStyle = props => {
  if (props.isEditing) return 'dashed'
  return 'solid'
}

const Container = styled.div`
  cursor: ${props => props.isEditing && 'pointer'};
  padding: 1.2rem;
  border-width: 0.15rem;
  border-color: #f2f2f2;
  border-style: ${props => getBorderStyle(props)};
  background-color: #EEE;
  background-image: ${props => getBackground(props)};
  background-size: 11.5rem 11.5rem;
  background-repeat: no-repeat;
  background-position: center;
  transition: border 0.24s ease-in-out;
  border-radius: 50%;
  width: 11.5rem;
  height: 11.5rem;
  position: absolute;
  top: 4rem;
  left: 4rem;
  z-index: 4;
`
const TransparentEditOverlay = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  cursor: pointer;
  background-color: white;
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  border-radius: 50%;
`
const EditIcon = styled.img.attrs({ src: editImage })`
  width: 1.9rem;
  position: absolute;
  right: 1.1rem;
  top: 0.4rem;
`
export default ProfilePicture
