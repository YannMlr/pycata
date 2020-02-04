import '../home/home.scss';

import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './questionActuelle.reducer';

export interface IQuestionActuelleProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


export const QuestionActuelle = (props: IQuestionActuelleProps) => {


  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { quest } = props;


const handle = (i) =>{
      quest.reponsePossibles[i].intitule = "uyf";


  }

  return (
    <Row>
      <Col md="9">
        <h2>
            {quest.intitule}
        </h2>

        <ul>
        {quest.reponsePossibles && quest.reponsePossibles.length >0 ? (
          quest.reponsePossibles.map((reponse,i) => (


            <li key={reponse.id}>
                  <Button className="btn btn-primary my-3 jh-create-entity" id="jh-create-entity" onClick={this.handle(i)}  >
                    {reponse.intitule}
                  </Button>
            </li>
                )
          )

          ) :(
            <p> Veuillez patienter </p>
        )
        }
        </ul>

      </Col>

      <Col md="3" className="pad">



      </Col>
    </Row>
  );
};




const mapStateToProps = ({ questionActuelle }: IRootState) => ({
  quest: questionActuelle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps) (QuestionActuelle);
