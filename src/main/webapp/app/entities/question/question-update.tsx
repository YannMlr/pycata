import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuizz } from 'app/shared/model/quizz.model';
import { getEntities as getQuizzes } from 'app/entities/quizz/quizz.reducer';
import { ITheme } from 'app/shared/model/theme.model';
import { getEntities as getThemes } from 'app/entities/theme/theme.reducer';
import { INiveau } from 'app/shared/model/niveau.model';
import { getEntities as getNiveaus } from 'app/entities/niveau/niveau.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { getEntities as getMedia } from 'app/entities/media/media.reducer';
import { getEntity, updateEntity, createEntity, reset } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionUpdate = (props: IQuestionUpdateProps) => {
  const [quizzId, setQuizzId] = useState('0');
  const [themeId, setThemeId] = useState('0');
  const [niveauId, setNiveauId] = useState('0');
  const [mediaId, setMediaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { questionEntity, quizzes, themes, niveaus, media, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/question');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuizzes();
    props.getThemes();
    props.getNiveaus();
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
        ...questionEntity,
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
          <h2 id="pycataApp.question.home.createOrEditLabel">
            <Translate contentKey="pycataApp.question.home.createOrEditLabel">Create or edit a Question</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : questionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="question-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="question-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="intituleLabel" for="question-intitule">
                  <Translate contentKey="pycataApp.question.intitule">Intitule</Translate>
                </Label>
                <AvField id="question-intitule" type="text" name="intitule" />
              </AvGroup>
              <AvGroup>
                <Label for="question-quizz">
                  <Translate contentKey="pycataApp.question.quizz">Quizz</Translate>
                </Label>
                <AvInput id="question-quizz" type="select" className="form-control" name="quizz.id">
                  <option value="" key="0" />
                  {quizzes
                    ? quizzes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="question-theme">
                  <Translate contentKey="pycataApp.question.theme">Theme</Translate>
                </Label>
                <AvInput id="question-theme" type="select" className="form-control" name="theme.id">
                  <option value="" key="0" />
                  {themes
                    ? themes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="question-niveau">
                  <Translate contentKey="pycataApp.question.niveau">Niveau</Translate>
                </Label>
                <AvInput id="question-niveau" type="select" className="form-control" name="niveau.id">
                  <option value="" key="0" />
                  {niveaus
                    ? niveaus.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="question-media">
                  <Translate contentKey="pycataApp.question.media">Media</Translate>
                </Label>
                <AvInput id="question-media" type="select" className="form-control" name="media.id">
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
              <Button tag={Link} id="cancel-save" to="/question" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  quizzes: storeState.quizz.entities,
  themes: storeState.theme.entities,
  niveaus: storeState.niveau.entities,
  media: storeState.media.entities,
  questionEntity: storeState.question.entity,
  loading: storeState.question.loading,
  updating: storeState.question.updating,
  updateSuccess: storeState.question.updateSuccess
});

const mapDispatchToProps = {
  getQuizzes,
  getThemes,
  getNiveaus,
  getMedia,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionUpdate);
