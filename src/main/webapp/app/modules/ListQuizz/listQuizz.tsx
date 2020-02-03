import '../home/home.scss';

import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Table, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './listQuizz.reducer';

import { getLoginUrl } from 'app/shared/util/url-utils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import quizz from "app/entities/quizz/quizz";
//import {getEntities} from "app/entities/quizz/quizz.reducer";

export interface IListQuizzProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


export const ListQuizz = (props: IListQuizzProps) => {

  useEffect(() => {
    props.getEntities();
  }, []);

  const { quizzPossible } = props;

  return (
    <Row>
      <Col md="9">
        <h2>
          Veuillez choisir votre quizz :-p
        </h2>

        {<div className="table-responsive">
          {quizzPossible && quizzPossible.length > 0 ? (
            <Table responsive>
              <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Intitule
                </th>
                <th>
                  Score
                </th>
                <th>
                  Evenement
                </th>
              </tr>
              </thead>

              <tbody>
              {quizzPossible.map((quizzes) => (
                <tr>
                  <td>
                    <Button tag={Link} to={`/choix/${quizzes.id}`} color="link" size="sm">
                      {quizzes.id}
                    </Button>
                  </td>
                  <td>{quizzes.sujet}</td>
                  <td>{quizzes.score}</td>
                  {quizzes.evenement ? (
                    <td>{quizzes.evenement.intitule}</td>
                  ) : (
                    <td>
                      Pas d'évènement associé
                    </td>
                  )
                  }
                </tr>
              ))}
              </tbody>

            </Table>
          ) : (
            <div className="alert alert-warning">
              Aucun Quizz trouve
            </div>)}


        </div>
        }

      </Col>
    </Row>
  );
};




const mapStateToProps = ({ listQuizz }: IRootState) => ({
  quizzPossible : listQuizz.entities
});

const mapDispatchToProps = { getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps )(ListQuizz);
