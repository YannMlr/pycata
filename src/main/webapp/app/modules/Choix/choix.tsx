import '../home/home.scss';

import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './choix.reducer';

import { getLoginUrl } from 'app/shared/util/url-utils';
import {getEntities} from "app/entities/quizz/quizz.reducer";

export interface IChoixProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


export const Choix = (props: IChoixProps) => {

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { quizzEntity} = props;

  return (
    <Row>
      <Col md="9">
        <h2>
          {quizzEntity.sujet}
        </h2>
        <Button tag={Link} to={`/QuestionActuelle/${quizzEntity.id}`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          Commencer le quizz
        </Button>
      </Col>
      <Col md="3" className="pad">

      </Col>
    </Row>
  );
};




const mapStateToProps = ({ choix }: IRootState) => ({
  quizzEntity: choix.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps )(Choix);