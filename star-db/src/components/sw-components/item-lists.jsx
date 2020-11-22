import ItemList from "../item-list";
import React from "react";
import compose from "../hoc-helpers/compose";
import listData from "../hoc-helpers/list-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const wrapChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return <Wrapped {...props}>{fn}</Wrapped>;
  };
};

const renderName = ({ name }) => <span>{name}</span>;

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople,
  };
};

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets,
  };
};

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships,
  };
};

const mapFilmMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllFilms,
  };
};

const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  listData,
  wrapChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  listData,
  wrapChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  listData,
  wrapChildFunction(renderName)
)(ItemList);

const FilmList = compose(
  withSwapiService(mapFilmMethodsToProps),
  listData,
  wrapChildFunction(renderName)
)(ItemList);

export { PersonList, PlanetList, StarshipList, FilmList };
