import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './evenement.reducer';

export interface IEvenementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Evenement = (props: IEvenementProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { evenementList, match } = props;
  return (
    <div>
      <h2 id="evenement-heading">
        Evenements
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          Créer un nouvel evenement
        </Link>
      </h2>
      <div className="table-responsive">
        {evenementList && evenementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  Event ID
                </th>
                <th>
                  Intitule
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {evenementList.map((evenement, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${evenement.id}`} color="link" size="sm">
                      {evenement.id}
                    </Button>
                  </td>
                  <td>{evenement.intitule}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${evenement.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          Detail
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evenement.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          Editer
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evenement.id}/delete`} color="danger" size="sm">
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
            Aucun evenement trouvé
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ evenement }: IRootState) => ({
  evenementList: evenement.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Evenement);
