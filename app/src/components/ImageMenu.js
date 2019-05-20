import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { Buffer } from 'ipfs-http-client'
import { BoxContext } from '../wrappers/box'
import infuraIpfs from '../../ipfs'
import { removeItem } from '../stateManagers/modal'
import { ModalContext } from '../wrappers/modal'

import {
  uploadingImage,
  uploadedImage,
  uploadedImageFailure,
} from '../stateManagers/box'

const ImageMenu = ({ ethereumAddress, top, right, imageExists, open }) => {
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
          dispatch(uploadedImage(ethereumAddress, result[0].hash))
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
  } = useDropzone({ accept: 'image/*', onDrop, noDragEventsBubbling: true })

  const userLoaded = !!boxes[ethereumAddress]
  const hasImage =
    userLoaded &&
    boxes[ethereumAddress].publicProfile.image &&
    boxes[ethereumAddress].publicProfile.image.length > 0

  const publicProfileImageCid =
    hasImage && boxes[ethereumAddress].publicProfile.image[0].contentUrl['/']

  const addedImage = userLoaded && boxes[ethereumAddress].uploadedImageSuccess

  const editProfileImageCid = addedImage
    ? boxes[ethereumAddress].forms.image[0].contentUrl['/']
    : publicProfileImageCid

console.log('--^', addedImage, editProfileImageCid, publicProfileImageCid)

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
        editProfileImageCid,
      })}
    >
      {' '}
      <input {...getInputProps({ disabled: false })} />
      <div>Update cover photo</div>
      <div
        onClick={event => {
          open()
          event.stopPropagation()
        }}
      >
        Upload new image
      </div>
      {imageExists && (
        <div
          onClick={() => {
            console.log('dispatch delete image:', publicProfileImageCid)
            dispatchModal(removeItem(publicProfileImageCid, 'image'))
          }}
        >
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

const getBackground = props => {
  const imageCid = props.isEditing
    ? props.editProfileImageCid
    : props.publicProfileImageCid

  if (imageCid) return `url(https://ipfs.infura.io/ipfs/${imageCid})`

  return `url(${addImage})`
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
    opacity: 0.95;
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
    padding: 4px 10px;
  }
`

export default ImageMenu
/*
const Container = styled.div`
  cursor: ${props => props.isEditing && 'pointer'};
  padding: 1.2rem;
  border-width: 0.15rem;
  border-color: ${props => getBorderColor(props)};
  border-color: #F2F2F2;
  border-style: ${props => getBorderStyle(props)};
  background-color: white;
  background-image: ${props => getBackground(props)};
  background-size: 11.5rem 11.5rem;
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
*/
