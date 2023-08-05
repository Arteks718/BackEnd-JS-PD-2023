import React from 'react'
import HeroesForm from '../../components/HeroesForm'
import HeroesList from '../../components/HeroesList'


function HeroesPage() {
  return (
    <>
      <HeroesList></HeroesList>
      <HeroesForm></HeroesForm>
    </>
  )
}

export default HeroesPage