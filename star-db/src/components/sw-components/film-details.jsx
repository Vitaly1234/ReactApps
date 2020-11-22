import ItemDetails, { Record } from "../item-details";

import React from "react";
import compose from "../hoc-helpers/compose";
import elementData from "../hoc-helpers/element-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const filmChildWrap = (View) => {
  return (props) => {
    return (
      <View {...props}>
        <Record field="episodeNumber" label="Episode number:" />
        <Record field="created" label="Date created:" />
        <Record field="director" label="Director:" />
        <Record field="producer" label="Producer:" />
        <Record field="openingCrawl" label="Opening crawl:" />
      </View>
    );
  };
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getFilm,
    getImageUrl: swapiService.getFilmImage,
  };
};

export default compose(
  withSwapiService(mapMethodsToProps),
  elementData("film"),
  filmChildWrap
)(ItemDetails);
