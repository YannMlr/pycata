import '../home/home.scss';

import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './listQuizz.reducer';

import { getLoginUrl } from 'app/shared/util/url-utils';
//import {getEntities} from "app/entities/quizz/quizz.reducer";

export interface IListQuizzProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


export const ListQuizz = (props: IListQuizzProps) => {

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { event} = props;


  return (
    <Row>
      <Col md="9">
        <h2>
          Veuillez choisir votre quizz !
        </h2>
        <p className="lead">
        </p>

      </Col>
      <Col md="3" className="pad">

      </Col>
    </Row>
  );
};




const mapStateToProps = ({ listQuizz }: IRootState) => ({
  event : listQuizz.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps )(ListQuizz);
