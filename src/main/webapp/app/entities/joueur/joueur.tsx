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
        <Translate contentKey="pycataApp.joueur.home.title">Joueurs</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="pycataApp.joueur.home.createLabel">Create new Joueur</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {joueurList && joueurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="pycataApp.joueur.idUser">Id User</Translate>
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
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${joueur.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${joueur.id}/delete`} color="danger" size="sm">
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
            <Translate contentKey="pycataApp.joueur.home.notFound">No Joueurs found</Translate>
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
