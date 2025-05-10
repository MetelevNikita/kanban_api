"use client"

import { FC } from 'react'

//

import { Container, Row, Col } from 'react-bootstrap'

// fn

import { createUser } from '@/functions/createUser'

const Registration = () => {
  return (
    <Container>
      <Row>
        <Col><div>регистрация</div></Col>
      </Row>

      <form action={createUser}>

        <Row>
          <input type="text" name='username' placeholder='username'/>
          <input type="text" name='email' placeholder='email'/>
          <input type="text" name='password' placeholder='password'/>
          <input type="file" name='avatar'/>
          <button type='submit'>Создать</button>

        </Row>

      </form>

    </Container>
  )
}

export default Registration