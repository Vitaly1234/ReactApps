import ItemDetails, { Record } from "../item-details";

import React from "react";
import compose from "../hoc-helpers/compose";
import elementData from "../hoc-helpers/element-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const planetChildWrap = (View) => {
  return (props) => {
    return (
      <View {...props}>
        <Record field="population" label="Population" />
        <Record field="rotationPeriod" label="Rotation period" />
        <Record field="diameter" label="Diameter" />
      </View>
    );
  };
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage,
  };
};

export default compose(
  withSwapiService(mapMethodsToProps),
  elementData("planet"),
  planetChildWrap
)(ItemDetails);
