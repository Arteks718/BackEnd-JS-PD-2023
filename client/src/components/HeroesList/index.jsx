import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteHeroThunk,
  getHeroesThunk,
  updateHeroThunk
} from "../../store/slices/heroesSlice";

function HeroesList({ heroes, isFetching, error, getHeroes, deleteHero, updateHero }) {
  useEffect(() => {
    getHeroes();
  }, []);
  const mapHeroes = (hero) => {
    return (
      (
        <li key={hero.id}>
          <h2>{hero.id}</h2>
          <h2>{hero.nickname}</h2>
          <div>{hero.realName}</div>
          {/* <h2>{hero.}</h2> */}
          <div>{hero.catchPhrase}</div>
          <div>isGood <input type="checkbox" checked={hero.isGood} onChange={() => {
            updateHero(hero.id, { isGood: !hero.isGood})
          }}></input></div>
          <button onClick={() => deleteHero(hero.id)}>Delete</button>
        </li>
      )
    );
  };
  return (
    <>
      {error && <div>ERROR!!!</div>}
      {isFetching && <div>Loading...</div>}
      {!error && !isFetching && <ul>{heroes.map(mapHeroes)}</ul>}
    </>
  );
}

const mapStateToProps = (state) => state.heroData;

const mapDispatchToProps = (dispatch) => {
  return {
    getHeroes: () => dispatch(getHeroesThunk()),
    deleteHero: (id) => dispatch(deleteHeroThunk(id)),
    updateHero: (id, updatedData) => dispatch(updateHeroThunk({ id, updatedData}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroesList);