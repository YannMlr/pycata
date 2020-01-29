import React from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Alert color="danger">
          La page n'existe pas.
        </Alert>
      </div>
    );
  }
}

export default PageNotFound;
