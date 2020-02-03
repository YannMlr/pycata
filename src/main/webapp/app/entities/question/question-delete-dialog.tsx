import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IQuestion } from 'app/shared/model/question.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './question.reducer';

export interface IQuestionDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionDeleteDialog = (props: IQuestionDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/question');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.questionEntity.id);
  };

  const { questionEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        Confirmer la suppression
      </ModalHeader>
      <ModalBody id="pycataApp.question.delete.question" interpolate={{ id: questionEntity.id }}>
          Etes vous sur de vouloir supprimer cette Question?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          Annuler
        </Button>
        <Button id="jhi-confirm-delete-question" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ question }: IRootState) => ({
  questionEntity: question.entity,
  updateSuccess: question.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDeleteDialog);
