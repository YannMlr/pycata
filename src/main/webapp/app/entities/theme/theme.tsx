import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './theme.reducer';
import { ITheme } from 'app/shared/model/theme.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThemeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Theme = (props: IThemeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { themeList, match } = props;
  return (
    <div>
      <h2 id="theme-heading">
        Themes
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          Creer un nouveau Theme
        </Link>
      </h2>
      <div className="table-responsive">
        {themeList && themeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Intitule
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {themeList.map((theme, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${theme.id}`} color="link" size="sm">
                      {theme.id}
                    </Button>
                  </td>
                  <td>{theme.intitule}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${theme.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          Detail
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${theme.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${theme.id}/delete`} color="danger" size="sm">
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
            Aucun Theme trouve
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ theme }: IRootState) => ({
  themeList: theme.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
