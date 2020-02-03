import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './joueur.reducer';
import { IJoueur } from 'app/shared/model/joueur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJoueurProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Joueur = (props: IJoueurProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { joueurList, match } = props;
  return (
    <div>
      <h2 id="joueur-heading">
        Joueurs
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          Creer un nouveau Joueur
        </Link>
      </h2>
      <div className="table-responsive">
        {joueurList && joueurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Id User
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {joueurList.map((joueur, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${joueur.id}`} color="link" size="sm">
                      {joueur.id}
                    </Button>
                  </td>
                  <td>{joueur.idUser}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${joueur.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          Details
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${joueur.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${joueur.id}/delete`} color="danger" size="sm">
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
            Aucun joueur trouvé
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ joueur }: IRootState) => ({
  joueurList: joueur.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Joueur);
