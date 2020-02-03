import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJoueur } from 'app/shared/model/joueur.model';
import { getEntities as getJoueurs } from 'app/entities/joueur/joueur.reducer';
import { IReponsePossible } from 'app/shared/model/reponse-possible.model';
import { getEntities as getReponsePossibles } from 'app/entities/reponse-possible/reponse-possible.reducer';
import { getEntity, updateEntity, createEntity, reset } from './reponse-joueur.reducer';
import { IReponseJoueur } from 'app/shared/model/reponse-joueur.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReponseJoueurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReponseJoueurUpdate = (props: IReponseJoueurUpdateProps) => {
  const [joueurId, setJoueurId] = useState('0');
  const [reponsePossibleId, setReponsePossibleId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { reponseJoueurEntity, joueurs, reponsePossibles, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/reponse-joueur');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getJoueurs();
    props.getReponsePossibles();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...reponseJoueurEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pycataApp.reponseJoueur.home.createOrEditLabel">
            Creer ou editer une Reponse Joueur
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : reponseJoueurEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="reponse-joueur-id">
                    ID
                  </Label>
                  <AvInput id="reponse-joueur-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateEnvoiLabel" for="reponse-joueur-dateEnvoi">
                  Date Envoi
                </Label>
                <AvField id="reponse-joueur-dateEnvoi" type="string" className="form-control" name="dateEnvoi" />
              </AvGroup>
              <AvGroup>
                <Label id="dateReponseLabel" for="reponse-joueur-dateReponse">
                  Date Reponse
                </Label>
                <AvField id="reponse-joueur-dateReponse" type="string" className="form-control" name="dateReponse" />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLabel" for="reponse-joueur-score">
                  Score
                </Label>
                <AvField id="reponse-joueur-score" type="string" className="form-control" name="score" />
              </AvGroup>
              <AvGroup>
                <Label for="reponse-joueur-joueur">
                  Joueur
                </Label>
                <AvInput id="reponse-joueur-joueur" type="select" className="form-control" name="joueur.id">
                  <option value="" key="0" />
                  {joueurs
                    ? joueurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="reponse-joueur-reponsePossible">
                  Reponse Possible
                </Label>
                <AvInput id="reponse-joueur-reponsePossible" type="select" className="form-control" name="reponsePossible.id">
                  <option value="" key="0" />
                  {reponsePossibles
                    ? reponsePossibles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/reponse-joueur" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  Retour
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                Sauvegarder
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  joueurs: storeState.joueur.entities,
  reponsePossibles: storeState.reponsePossible.entities,
  reponseJoueurEntity: storeState.reponseJoueur.entity,
  loading: storeState.reponseJoueur.loading,
  updating: storeState.reponseJoueur.updating,
  updateSuccess: storeState.reponseJoueur.updateSuccess
});

const mapDispatchToProps = {
  getJoueurs,
  getReponsePossibles,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponseJoueurUpdate);
