import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundary from "../error-boundary";
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import { SwapiServiceProvider } from "../swapi-context-service";
import s from "./app.module.scss";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className={s["star-db-app"]}>
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                  exact
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets/:id?" component={PlanetsPage} />
                <Route path="/starships/:id?" component={StarshipsPage} />
                <Route render={() => <h2>Ooops! Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
