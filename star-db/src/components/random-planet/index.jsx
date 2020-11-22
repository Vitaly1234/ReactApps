import React, { Component } from "react";

import ErrorBoundary from "../error-boundary";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import SwapiService from "../../services/swapi-service";
import s from "./random-planet.module.scss";

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  static defaultProps = {
    updateInterval: 10000,
  };

  static propTypes = {
    updateInterval: PropTypes.number,
  };

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded);
  };

  render() {
    const { planet, loading } = this.state;

    return (
      <ErrorBoundary>
        <div className={`${s["random-planet"]} jumbotron rounded`}>
          {loading ? <Spinner /> : <PlanetView planet={planet} />}
        </div>
      </ErrorBoundary>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        className={s["planet-image"]}
        alt="planet"
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className={s.term}>Population </span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className={s.term}>Rotation Period </span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className={s.term}>Diameter </span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
