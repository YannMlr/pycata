import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INiveau } from 'app/shared/model/niveau.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './niveau.reducer';

export interface INiveauDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NiveauDeleteDialog = (props: INiveauDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/niveau');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.niveauEntity.id);
  };

  const { niveauEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        Confirmer la suppression
      </ModalHeader>
      <ModalBody id="pycataApp.niveau.delete.question" interpolate={{ id: niveauEntity.id }}>
          Etes vous sur de vouloir supprimer ce niveau?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          Annuler
        </Button>
        <Button id="jhi-confirm-delete-niveau" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ niveau }: IRootState) => ({
  niveauEntity: niveau.entity,
  updateSuccess: niveau.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NiveauDeleteDialog);
