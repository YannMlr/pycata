import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMediaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Media = (props: IMediaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { mediaList, match } = props;
  return (
    <div>
      <h2 id="media-heading">
        Media
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          Creer un nouveau Media
        </Link>
      </h2>
      <div className="table-responsive">
        {mediaList && mediaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Url
                </th>
                <th>
                  Nom
                </th>
                <th>
                  Type
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mediaList.map((media, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${media.id}`} color="link" size="sm">
                      {media.id}
                    </Button>
                  </td>
                  <td>{media.url}</td>
                  <td>{media.nom}</td>
                  <td>{media.type}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${media.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          Detail
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${media.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${media.id}/delete`} color="danger" size="sm">
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
            Aucun Media trouve
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ media }: IRootState) => ({
  mediaList: media.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Media);
