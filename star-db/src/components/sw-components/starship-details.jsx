import React from "react";
import compose from "../hoc-helpers/compose";
import elementData from "../hoc-helpers/element-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";
import ItemDetails, { Record } from "../item-details";

const starshipChildWrap = (View) => {
  return (props) => {
    return (
      <View {...props}>
        <Record field="model" label="Model" />
        <Record field="manufacturer" label="Manufacturer" />
        <Record field="costInCredits" label="Cost in credits" />
        <Record field="length" label="Length" />
        <Record field="crew" label="Crew" />
        <Record field="passengers" label="Passengers" />
        <Record field="cargoCapacity" label="Cargo capacity" />
      </View>
    );
  };
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  };
};

export default compose(
  withSwapiService(mapMethodsToProps),
  elementData("starship"),
  starshipChildWrap
)(ItemDetails);
