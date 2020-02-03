import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuestion } from 'app/shared/model/question.model';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { getEntities as getMedia } from 'app/entities/media/media.reducer';
import { getEntity, updateEntity, createEntity, reset } from './reponse-possible.reducer';
import { IReponsePossible } from 'app/shared/model/reponse-possible.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReponsePossibleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReponsePossibleUpdate = (props: IReponsePossibleUpdateProps) => {
  const [questionId, setQuestionId] = useState('0');
  const [mediaId, setMediaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { reponsePossibleEntity, questions, media, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/reponse-possible');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuestions();
    props.getMedia();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...reponsePossibleEntity,
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
          <h2 id="pycataApp.reponsePossible.home.createOrEditLabel">
            Creer ou editer une ReponsePossible
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : reponsePossibleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="reponse-possible-id">
                    ID
                  </Label>
                  <AvInput id="reponse-possible-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="intituleLabel" for="reponse-possible-intitule">
                  Intitule
                </Label>
                <AvField id="reponse-possible-intitule" type="text" name="intitule" />
              </AvGroup>
              <AvGroup check>
                <Label id="vraiLabel">
                  <AvInput id="reponse-possible-vrai" type="checkbox" className="form-check-input" name="vrai" />
                  Vrai
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="reponse-possible-question">
                  Question
                </Label>
                <AvInput id="reponse-possible-question" type="select" className="form-control" name="question.id">
                  <option value="" key="0" />
                  {questions
                    ? questions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="reponse-possible-media">
                  Media
                </Label>
                <AvInput id="reponse-possible-media" type="select" className="form-control" name="media.id">
                  <option value="" key="0" />
                  {media
                    ? media.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/reponse-possible" replace color="info">
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
  questions: storeState.question.entities,
  media: storeState.media.entities,
  reponsePossibleEntity: storeState.reponsePossible.entity,
  loading: storeState.reponsePossible.loading,
  updating: storeState.reponsePossible.updating,
  updateSuccess: storeState.reponsePossible.updateSuccess
});

const mapDispatchToProps = {
  getQuestions,
  getMedia,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponsePossibleUpdate);
