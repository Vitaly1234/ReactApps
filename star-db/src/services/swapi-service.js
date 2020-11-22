export default class SwapiService {
  _apiBase = "https://swapi.dev/api";
  _imageBase = "https://starwars-visualguide.com/assets/img";

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getPersonImage = ({ id }) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map((planet) => this._transformPlanet(planet));
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map((starship) => this._transformStarship(starship));
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  };

  getAllFilms = async () => {
    const res = await this.getResource(`/films/`);
    return res.results
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(this._transformFilm);
  };

  getFilm = async (id) => {
    const film = await this.getResource(`/films/${id}/`);
    return this._transformFilm(film);
  };

  getFilmImage = ({ id }) => {
    return `${this._imageBase}/films/${id}.jpg`;
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  };

  _transformFilm = (film) => {
    return {
      id: this._extractId(film),
      name: film.title,
      created: new Date(film.created).toLocaleDateString(),
      producer: film.producer,
      director: film.director,
      openingCrawl: film.opening_crawl,
      episodeNumber: film.episode_id,
    };
  };
}
