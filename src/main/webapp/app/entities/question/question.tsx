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
          Creer une nouvelle Question
        </Link>
      </h2>
      <div className="table-responsive">
        {questionList && questionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Intitule
                </th>
                <th>
                  Quizz
                </th>
                <th>
                  Theme
                </th>
                <th>
                  Niveau
                </th>
                <th>
                  Media
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
                          Detail
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${question.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${question.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          Supprimer
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
            Aucune Question Trouve
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
