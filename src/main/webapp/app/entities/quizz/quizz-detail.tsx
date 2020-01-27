import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quizz.reducer';
import { IQuizz } from 'app/shared/model/quizz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuizzDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizzDetail = (props: IQuizzDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { quizzEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="pycataApp.quizz.detail.title">Quizz</Translate> [<b>{quizzEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sujet">
              <Translate contentKey="pycataApp.quizz.sujet">Sujet</Translate>
            </span>
          </dt>
          <dd>{quizzEntity.sujet}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="pycataApp.quizz.score">Score</Translate>
            </span>
          </dt>
          <dd>{quizzEntity.score}</dd>
          <dt>
            <Translate contentKey="pycataApp.quizz.evenement">Evenement</Translate>
          </dt>
          <dd>{quizzEntity.evenement ? quizzEntity.evenement.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/quizz" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quizz/${quizzEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ quizz }: IRootState) => ({
  quizzEntity: quizz.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizzDetail);
