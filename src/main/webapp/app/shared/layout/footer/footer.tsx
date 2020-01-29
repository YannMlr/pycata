import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>
          Copyright PYCATA
          Application développée par A. Pinier Rafer, Y. Moulaire, T. Dupuis, P. Desclaux, A. Jean et C. Joulin
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
