import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Buffer } from 'ipfs-http-client'
import infuraIpfs from '../../ipfs'
import { removeItem } from '../stateManagers/modal'
import { BoxContext } from '../wrappers/box'
import { ModalContext } from '../wrappers/modal'
import { image } from '../../modules/things'

import {
  uploadingImage,
  uploadedImage,
  uploadedImageFailure,
  savingProfile,
  savedProfile,
  saveProfileError,
} from '../stateManagers/box'

const ImageMenu = ({ ethereumAddress, top, right, imageExists, imageTag }) => {
  const { boxes, dispatch } = useContext(BoxContext)
  const { dispatchModal } = useContext(ModalContext)

  const onDrop = useCallback(
    acceptedFiles => {
      dispatch(uploadingImage(ethereumAddress))

      const reader = new FileReader()

      reader.onerror = error => {
        reader.onabort = () =>
          console.log('file reading failed and was aborted')
        dispatch(uploadedImageFailure(error))
      }

      reader.onload = async () => {
        try {
          const file = Buffer.from(reader.result)
          const result = await infuraIpfs.add(file)
          dispatch(uploadedImage(ethereumAddress, imageTag, result[0].hash))
          const { unlockedBox, publicProfile } = boxes[ethereumAddress]
          const profileImages = { ...publicProfile.image }
          profileImages[imageTag] = image(result[0].hash)
          const images = { image: profileImages }
          try {
            dispatch(savingProfile(ethereumAddress))
            await unlockedBox.setPublicFields(['image'], [profileImages])
            dispatch(savedProfile(ethereumAddress, images))
          } catch (error2) {
            dispatch(saveProfileError(ethereumAddress, error2))
          }
        } catch (error) {
          dispatch(uploadedImageFailure(error))
        }
      }

      acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
    },
    [dispatch, ethereumAddress]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: 'image/*',
    onDrop,
    noDragEventsBubbling: true,
    noClick: true,
    noKeyboard: true,
  })

  const publicProfileImageCid =
    imageExists &&
    boxes[ethereumAddress].publicProfile.image[imageTag].contentUrl['/']

  return (
    <ImageMenuStyled
      top={top}
      right={right}
      {...getRootProps({
        className: 'dropzone',
        isDragActive,
        isDragAccept,
        isDragReject,
        publicProfileImageCid,
      })}
    >
      {' '}
      <div>Update {imageTag} photo</div>
      <input {...getInputProps({ disabled: false })} />
      <div onClick={open}>Upload new image</div>
      {imageExists && (
        <div onClick={() => dispatchModal(removeItem(imageTag, 'image'))}>
          Delete
        </div>
      )}
    </ImageMenuStyled>
  )
}

ImageMenu.propTypes = {
  ethereumAddress: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  imageExists: PropTypes.bool.isRequired,
}
/*
const getBorderColor = props => {
  if (props.isEditing) {
    if (props.isDragAccept) return '#00e676'
    if (props.isDragReject) return '#ff1744'
    if (props.isDragActive) return '#2196f3'
  }
  if (props.imageCid) return 'white'
  return 'black'
}

const getBorderStyle = props => {
  if (props.isEditing) return 'dashed'
  return 'solid'
}
*/

const ImageMenuStyled = styled.div`
  .imageHover:hover & {
    visibility: visible;
    transition: visibility 0.3s linear, opacity 0.3s linear;
    visibility: visible;
    opacity: 0.8;
  }
  border-radius: 3px;
  font-size: 0.9rem;
  transition: visibility 0.3s linear, opacity 0.3s linear;
  visibility: hidden;
  opacity: 0;
  width: 12rem;
  z-index: 1;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  right: ${({ right }) => `${right}px`};
  padding: 1px;
  background: white;
  > :first-child {
    background: #d1d1d1;
    opacity: 0.6;
    font-weight: bold;
    font-size: 1rem;
  }
  > :not(:first-child) {
    background: white;
    opacity: 0.9;
    :hover {
      opacity: 1;
      background: #eee;
      cursor: pointer;
    }
  }
  > :not(:last-child) {
    margin-bottom: 1px;
  }
  > * {
    padding: 0.5rem 0.9rem;
  }
`

export default ImageMenu
