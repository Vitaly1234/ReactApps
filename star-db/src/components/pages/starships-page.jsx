import { StarshipDetails, StarshipList } from "../sw-components";

import React from "react";
import Row from "../row";
import { withRouter } from "react-router-dom";

const StarhipsPage = ({ history, match }) => {
  return (
    <Row
      left={<StarshipList onItemSelected={(id) => history.push(id)} />}
      right={<StarshipDetails itemId={match.params.id} />}
    />
  );
};

export default withRouter(StarhipsPage);
