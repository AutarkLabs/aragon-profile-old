import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import ImageMenu from './ImageMenu'
import { BoxContext } from '../wrappers/box'
import infuraIpfs from '../../ipfs'

import {
  uploadingImage,
  uploadedImage,
  uploadedImageFailure,
} from '../stateManagers/box'

const CoverImage = ({ ethereumAddress }) => {
  const { dispatch } = useContext(BoxContext)

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
    open,
  } = useDropzone({ accept: 'image/*', onDrop })

  let borderC = '0'
  if (isDragActive) borderC = '3px dashed yellow'
  if (isDragAccept) borderC = '3px dashed green'
  if (isDragReject) borderC = '3px dashed red'

  return (
    <CoverImageStyled
      dragBorder={borderC}
      {...getRootProps({ className: 'imageHover dropzone' })}
      onClick={event => event.stopPropagation()}
    >
      <input {...getInputProps()} />

      <ImageMenu top={26} right={26} imageExists open={open} />
    </CoverImageStyled>
  )
}

const CoverImageStyled = styled.div`
  width: 100%;
  border: ${({ dragBorder }) => dragBorder};
  height: 12rem;
  position: relative;
  background-image: url('https://cdn2.spacedecentral.net/assets/stars-551011e393a28d383a3f188ea38c595c9721561d3cf733bd63ce976616c0b0cd.jpg');
`
export default CoverImage
