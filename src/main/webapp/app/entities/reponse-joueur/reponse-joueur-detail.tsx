import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reponse-joueur.reducer';
import { IReponseJoueur } from 'app/shared/model/reponse-joueur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReponseJoueurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReponseJoueurDetail = (props: IReponseJoueurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reponseJoueurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ReponseJoueur [<b>{reponseJoueurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateEnvoi">
              Date Envoi
            </span>
          </dt>
          <dd>{reponseJoueurEntity.dateEnvoi}</dd>
          <dt>
            <span id="dateReponse">
              Date Reponse
            </span>
          </dt>
          <dd>{reponseJoueurEntity.dateReponse}</dd>
          <dt>
            <span id="score">
              Score
            </span>
          </dt>
          <dd>{reponseJoueurEntity.score}</dd>
          <dt>
            Joueur
          </dt>
          <dd>{reponseJoueurEntity.joueur ? reponseJoueurEntity.joueur.id : ''}</dd>
          <dt>
            Reponse Possible
          </dt>
          <dd>{reponseJoueurEntity.reponsePossible ? reponseJoueurEntity.reponsePossible.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/reponse-joueur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Retour
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reponse-joueur/${reponseJoueurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Editer
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ reponseJoueur }: IRootState) => ({
  reponseJoueurEntity: reponseJoueur.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponseJoueurDetail);
