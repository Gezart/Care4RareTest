import React from 'react'
import Container from './Container'

const Text = ({ title, content }) => {
  return (
    <Container>
      <div className='text'>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </Container>
  )
}

export default Text