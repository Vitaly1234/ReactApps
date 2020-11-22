import { FilmDetails, FilmList } from "../sw-components";

import React from "react";
import Row from "../row";
import { withRouter } from "react-router-dom";

const FilmsPage = ({ history, match }) => {
  return (
    <Row
      left={<FilmList onItemSelected={(id) => history.push(id)} />}
      right={<FilmDetails itemId={match.params.id} />}
    />
  );
};

export default withRouter(FilmsPage);
