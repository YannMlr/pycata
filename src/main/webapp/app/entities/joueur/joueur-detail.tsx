import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './joueur.reducer';
import { IJoueur } from 'app/shared/model/joueur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJoueurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JoueurDetail = (props: IJoueurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { joueurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Joueur [<b>{joueurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idUser">
              Id User
            </span>
          </dt>
          <dd>{joueurEntity.idUser}</dd>
        </dl>
        <Button tag={Link} to="/joueur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Retour
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/joueur/${joueurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Editer
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ joueur }: IRootState) => ({
  joueurEntity: joueur.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JoueurDetail);
