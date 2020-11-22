import { PersonDetails, PersonList } from "../sw-components";

import React from "react";
import Row from "../row";
import { withRouter } from "react-router-dom";

const PeoplePage = ({ history, match }) => {
  return (
    <Row
      left={<PersonList onItemSelected={(id) => history.push(id)} />}
      right={<PersonDetails itemId={match.params.id} />}
    />
  );
};

export default withRouter(PeoplePage);
