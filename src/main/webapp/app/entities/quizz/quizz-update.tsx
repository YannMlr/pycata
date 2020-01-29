import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEvenement } from 'app/shared/model/evenement.model';
import { getEntities as getEvenements } from 'app/entities/evenement/evenement.reducer';
import { getEntity, updateEntity, createEntity, reset } from './quizz.reducer';
import { IQuizz } from 'app/shared/model/quizz.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuizzUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizzUpdate = (props: IQuizzUpdateProps) => {
  const [evenementId, setEvenementId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { quizzEntity, evenements, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/quizz');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEvenements();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...quizzEntity,
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
          <h2 id="pycataApp.quizz.home.createOrEditLabel">
            Creer ou editer un Quizz
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : quizzEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quizz-id">
                    ID
                  </Label>
                  <AvInput id="quizz-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sujetLabel" for="quizz-sujet">
                  Sujet
                </Label>
                <AvField id="quizz-sujet" type="text" name="sujet" />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLabel" for="quizz-score">
                  Score
                </Label>
                <AvField id="quizz-score" type="string" className="form-control" name="score" />
              </AvGroup>
              <AvGroup>
                <Label for="quizz-evenement">
                  Evenement
                </Label>
                <AvInput id="quizz-evenement" type="select" className="form-control" name="evenement.id">
                  <option value="" key="0" />
                  {evenements
                    ? evenements.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.intitule}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quizz" replace color="info">
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
  evenements: storeState.evenement.entities,
  quizzEntity: storeState.quizz.entity,
  loading: storeState.quizz.loading,
  updating: storeState.quizz.updating,
  updateSuccess: storeState.quizz.updateSuccess
});

const mapDispatchToProps = {
  getEvenements,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizzUpdate);
