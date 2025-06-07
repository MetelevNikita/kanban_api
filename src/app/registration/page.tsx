"use client"

import { FC } from 'react'

//

import { Container, Row, Col } from 'react-bootstrap'

// fn

import { createUser } from '@/functions/users/createUser'

// types

import { CompanyArrType } from '@/types/types'

const Registration = () => {


  const companyArr: CompanyArrType[] = [
    {
      id: 1,
      label: 'Монтажеры',
      value: 'editors',
      isActive: false
    },
    {
      id: 2,
      label: 'Дизайнеры',
      value: 'designers',
      isActive: false
    },
    {
      id: 3,
      label: 'Операторы',
      value: 'operators',
      isActive: false
    },
    {
      id: 4,
      label: 'Продакшен',
      value: 'editors',
      isActive: false
    },
    {
      id: 5,
      label: 'Технический отдел',
      value: 'Technical',
      isActive: false
    }

  ]

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
          <select name='company'>

            {companyArr.map((item) => {
              return <option value={item.value} key={item.id}>{item.label}</option>
            })}
            

          </select>
          <button type='submit'>Создать</button>

        </Row>

      </form>

    </Container>
  )
}

export default Registration