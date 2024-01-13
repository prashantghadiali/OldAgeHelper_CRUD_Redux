import React from 'react'
import NavbarComp from '../../../components/v1/NavbarComp'
import { Container } from '@mui/material'
import ReminderList from '../../../components/v1/HomeComp/ReminderList'

function Home() {

  return (
    <div>
        <NavbarComp />
        <Container>
            <ReminderList />
        </Container>
    </div>
  )
}

export default Home
