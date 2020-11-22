import ItemDetails, { Record } from "../item-details";

import React from "react";
import compose from "../hoc-helpers/compose";
import elementData from "../hoc-helpers/element-data";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const personChildWrap = (View) => {
  return (props) => {
    return (
      <View {...props}>
        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth year" />
        <Record field="eyeColor" label="Eye color" />
      </View>
    );
  };
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage,
  };
};

export default compose(
  withSwapiService(mapMethodsToProps),
  elementData("person"),
  personChildWrap
)(ItemDetails);
