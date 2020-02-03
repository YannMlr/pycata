import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IReponseJoueur } from 'app/shared/model/reponse-joueur.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './reponse-joueur.reducer';

export interface IReponseJoueurDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReponseJoueurDeleteDialog = (props: IReponseJoueurDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/reponse-joueur');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.reponseJoueurEntity.id);
  };

  const { reponseJoueurEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        Confirmer la suppression
      </ModalHeader>
      <ModalBody id="pycataApp.reponseJoueur.delete.question" interpolate={{ id: reponseJoueurEntity.id }}>
          Etes vous sur de vouloir supprimer cette ReponseJoueur?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          Annuler
        </Button>
        <Button id="jhi-confirm-delete-reponseJoueur" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          Supprimer
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ reponseJoueur }: IRootState) => ({
  reponseJoueurEntity: reponseJoueur.entity,
  updateSuccess: reponseJoueur.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReponseJoueurDeleteDialog);
