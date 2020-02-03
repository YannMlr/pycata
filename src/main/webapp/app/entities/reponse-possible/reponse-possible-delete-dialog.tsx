import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IReponsePossible } from 'app/shared/model/reponse-possible.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './reponse-possible.reducer';

export interface IReponsePossibleDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReponsePossibleDeleteDialog = (props: IReponsePossibleDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/reponse-possible');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.reponsePossibleEntity.id);
  };

  const { reponsePossibleEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        Confirmer la suppression
      </ModalHeader>
      <ModalBody id="pycataApp.reponsePossible.delete.question" interpolate={{ id: reponsePossibleEntity.id }}>
          Etes vous sur de vouloir supprimer cette ReponsePossible?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          Annuler
        </Button>
        <Button id="jhi-confirm-delete-reponsePossible" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ reponsePossible }: IRootState) => ({
  reponsePossibleEntity: reponsePossible.entity,
  updateSuccess: reponsePossible.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponsePossibleDeleteDialog);
