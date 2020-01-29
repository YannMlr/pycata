import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './niveau.reducer';
import { INiveau } from 'app/shared/model/niveau.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INiveauDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NiveauDetail = (props: INiveauDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { niveauEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Niveau [<b>{niveauEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="intitule">
              Intitule
            </span>
          </dt>
          <dd>{niveauEntity.intitule}</dd>
        </dl>
        <Button tag={Link} to="/niveau" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Retour
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/niveau/${niveauEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Editer
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ niveau }: IRootState) => ({
  niveauEntity: niveau.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NiveauDetail);
