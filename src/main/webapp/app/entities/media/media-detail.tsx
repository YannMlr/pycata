import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './media.reducer';
import { IMedia } from 'app/shared/model/media.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMediaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MediaDetail = (props: IMediaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { mediaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="pycataApp.media.detail.title">Media</Translate> [<b>{mediaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">
              <Translate contentKey="pycataApp.media.url">Url</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.url}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="pycataApp.media.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.nom}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="pycataApp.media.type">Type</Translate>
            </span>
          </dt>
          <dd>{mediaEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/media" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/media/${mediaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ media }: IRootState) => ({
  mediaEntity: media.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetail);
