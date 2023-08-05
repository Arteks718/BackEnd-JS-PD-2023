import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHeroesThunk } from '../../store/slices/heroesSlice'

function HeroesList({ heroes, isFetching, error, getHeroes}) {
  useEffect(() => {
    getHeroes()
  }, [])
  return (
    <div>HeroesList</div>
  )
}

const mapStateToProps = (state) => state.heroData

const mapDispatchToProps = (dispatch) => {
  return {
    getHeroes: () => {
      dispatch(getHeroesThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroesList)