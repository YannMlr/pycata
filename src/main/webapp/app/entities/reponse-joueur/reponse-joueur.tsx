import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './reponse-joueur.reducer';
import { IReponseJoueur } from 'app/shared/model/reponse-joueur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReponseJoueurProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ReponseJoueur = (props: IReponseJoueurProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { reponseJoueurList, match } = props;
  return (
    <div>
      <h2 id="reponse-joueur-heading">
        Reponse Joueurs
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          Creer une nouvelle Reponse Joueur
        </Link>
      </h2>
      <div className="table-responsive">
        {reponseJoueurList && reponseJoueurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Date Envoi
                </th>
                <th>
                  Date Reponse
                </th>
                <th>
                  Score
                </th>
                <th>
                  Joueur
                </th>
                <th>
                  Reponse Possible
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reponseJoueurList.map((reponseJoueur, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${reponseJoueur.id}`} color="link" size="sm">
                      {reponseJoueur.id}
                    </Button>
                  </td>
                  <td>{reponseJoueur.dateEnvoi}</td>
                  <td>{reponseJoueur.dateReponse}</td>
                  <td>{reponseJoueur.score}</td>
                  <td>{reponseJoueur.joueur ? <Link to={`joueur/${reponseJoueur.joueur.id}`}>{reponseJoueur.joueur.id}</Link> : ''}</td>
                  <td>
                    {reponseJoueur.reponsePossible ? (
                      <Link to={`reponse-possible/${reponseJoueur.reponsePossible.id}`}>{reponseJoueur.reponsePossible.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${reponseJoueur.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          Detail
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reponseJoueur.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${reponseJoueur.id}/delete`} color="danger" size="sm">
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
            Aucune Reponse Joueurs trouve
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reponseJoueur }: IRootState) => ({
  reponseJoueurList: reponseJoueur.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponseJoueur);
