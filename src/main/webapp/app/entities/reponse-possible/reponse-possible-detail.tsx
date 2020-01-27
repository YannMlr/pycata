import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reponse-possible.reducer';
import { IReponsePossible } from 'app/shared/model/reponse-possible.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReponsePossibleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReponsePossibleDetail = (props: IReponsePossibleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reponsePossibleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="pycataApp.reponsePossible.detail.title">ReponsePossible</Translate> [<b>{reponsePossibleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="intitule">
              <Translate contentKey="pycataApp.reponsePossible.intitule">Intitule</Translate>
            </span>
          </dt>
          <dd>{reponsePossibleEntity.intitule}</dd>
          <dt>
            <span id="vrai">
              <Translate contentKey="pycataApp.reponsePossible.vrai">Vrai</Translate>
            </span>
          </dt>
          <dd>{reponsePossibleEntity.vrai ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="pycataApp.reponsePossible.question">Question</Translate>
          </dt>
          <dd>{reponsePossibleEntity.question ? reponsePossibleEntity.question.id : ''}</dd>
          <dt>
            <Translate contentKey="pycataApp.reponsePossible.media">Media</Translate>
          </dt>
          <dd>{reponsePossibleEntity.media ? reponsePossibleEntity.media.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/reponse-possible" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reponse-possible/${reponsePossibleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ reponsePossible }: IRootState) => ({
  reponsePossibleEntity: reponsePossible.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponsePossibleDetail);
