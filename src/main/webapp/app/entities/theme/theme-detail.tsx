import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './theme.reducer';
import { ITheme } from 'app/shared/model/theme.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThemeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThemeDetail = (props: IThemeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { themeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Theme [<b>{themeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="intitule">
              Intitule
            </span>
          </dt>
          <dd>{themeEntity.intitule}</dd>
        </dl>
        <Button tag={Link} to="/theme" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            Retour
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/theme/${themeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            Editer
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ theme }: IRootState) => ({
  themeEntity: theme.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThemeDetail);
