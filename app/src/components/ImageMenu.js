import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageMenu = ({ top, right, imageExists, open }) => (
  <ImageMenuStyled top={top} right={right}>
    <div>Update cover photo</div>
    <div
      onClick={event => {
        open()
        event.stopPropagation()
      }}
    >
      Upload new image
    </div>
    {imageExists && <div>Delete</div>}
  </ImageMenuStyled>
)

ImageMenu.propTypes = {
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  imageExists: PropTypes.bool.isRequired,
}

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
