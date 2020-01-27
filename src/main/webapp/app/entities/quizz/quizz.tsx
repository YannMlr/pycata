import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './quizz.reducer';
import { IQuizz } from 'app/shared/model/quizz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuizzProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Quizz = (props: IQuizzProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { quizzList, match } = props;
  return (
    <div>
      <h2 id="quizz-heading">
        <Translate contentKey="pycataApp.quizz.home.title">Quizzes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="pycataApp.quizz.home.createLabel">Create new Quizz</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {quizzList && quizzList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.quizz.sujet">Sujet</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.quizz.score">Score</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.quizz.evenement">Evenement</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {quizzList.map((quizz, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${quizz.id}`} color="link" size="sm">
                      {quizz.id}
                    </Button>
                  </td>
                  <td>{quizz.sujet}</td>
                  <td>{quizz.score}</td>
                  <td>{quizz.evenement ? <Link to={`evenement/${quizz.evenement.id}`}>{quizz.evenement.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${quizz.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${quizz.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${quizz.id}/delete`} color="danger" size="sm">
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
            <Translate contentKey="pycataApp.quizz.home.notFound">No Quizzes found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ quizz }: IRootState) => ({
  quizzList: quizz.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Quizz);
