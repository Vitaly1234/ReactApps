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

  getAllPeople = async (page) => {
    const res = await this.getResource(`/people/?page=${page}`);
    return this._getPagebleData(res, this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getPersonImage = ({ id }) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  };

  getAllPlanets = async (page) => {
    const res = await this.getResource(`/planets/?page=${page}`);
    return this._getPagebleData(res, this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  };

  getAllStarships = async (page) => {
    const res = await this.getResource(`/starships/?page=${page}`);
    return this._getPagebleData(res, this._transformStarship);
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  };

  getAllFilms = async (page) => {
    const res = await this.getResource(`/films/?page=${page}`);
    return this._getPagebleData(res, this._transformFilm);
  };

  getFilm = async (id) => {
    const film = await this.getResource(`/films/${id}/`);
    return this._transformFilm(film);
  };

  getFilmImage = ({ id }) => {
    return `${this._imageBase}/films/${id}.jpg`;
  };

  _getPagebleData = (sourceData, transformFunc) => {
    return {
      data: sourceData.results.map(transformFunc),
      totalPages: Math.ceil(sourceData.count / 10),
      hasNext: !!sourceData.next,
      hasPrevious: !!sourceData.previous,
    };
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
