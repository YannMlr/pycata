import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Question = (props: IQuestionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { questionList, match } = props;
  return (
    <div>
      <h2 id="question-heading">
        <Translate contentKey="pycataApp.question.home.title">Questions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="pycataApp.question.home.createLabel">Create new Question</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {questionList && questionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.question.intitule">Intitule</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.question.quizz">Quizz</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.question.theme">Theme</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.question.niveau">Niveau</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.question.media">Media</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questionList.map((question, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${question.id}`} color="link" size="sm">
                      {question.id}
                    </Button>
                  </td>
                  <td>{question.intitule}</td>
                  <td>{question.quizz ? <Link to={`quizz/${question.quizz.id}`}>{question.quizz.id}</Link> : ''}</td>
                  <td>{question.theme ? <Link to={`theme/${question.theme.id}`}>{question.theme.id}</Link> : ''}</td>
                  <td>{question.niveau ? <Link to={`niveau/${question.niveau.id}`}>{question.niveau.id}</Link> : ''}</td>
                  <td>{question.media ? <Link to={`media/${question.media.id}`}>{question.media.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${question.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${question.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${question.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="pycataApp.question.home.notFound">No Questions found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ question }: IRootState) => ({
  questionList: question.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
