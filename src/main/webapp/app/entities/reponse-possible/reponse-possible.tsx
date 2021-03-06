import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './reponse-possible.reducer';
import { IReponsePossible } from 'app/shared/model/reponse-possible.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReponsePossibleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ReponsePossible = (props: IReponsePossibleProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { reponsePossibleList, match } = props;
  return (
    <div>
      <h2 id="reponse-possible-heading">
        <Translate contentKey="pycataApp.reponsePossible.home.title">Reponse Possibles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          Creer une nouvelle Reponse Possible
        </Link>
      </h2>
      <div className="table-responsive">
        {reponsePossibleList && reponsePossibleList.length > 0 ? (
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
                  Vrai
                </th>
                <th>
                  Question
                </th>
                <th>
                  Media
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reponsePossibleList.map((reponsePossible, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${reponsePossible.id}`} color="link" size="sm">
                      {reponsePossible.id}
                    </Button>
                  </td>
                  <td>{reponsePossible.intitule}</td>
                  <td>{reponsePossible.vrai ? 'true' : 'false'}</td>
                  <td>
                    {reponsePossible.question ? (
                      <Link to={`question/${reponsePossible.question.id}`}>{reponsePossible.question.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{reponsePossible.media ? <Link to={`media/${reponsePossible.media.id}`}>{reponsePossible.media.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${reponsePossible.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          Detail
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reponsePossible.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reponsePossible.id}/delete`} color="danger" size="sm">
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
            Aucune Reponse Possibles trouve
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reponsePossible }: IRootState) => ({
  reponsePossibleList: reponsePossible.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponsePossible);
