import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/media">
      <Translate contentKey="global.menu.entities.media" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/quizz">
      <Translate contentKey="global.menu.entities.quizz" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/evenement">
      <Translate contentKey="global.menu.entities.evenement" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/question">
      <Translate contentKey="global.menu.entities.question" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/reponse-joueur">
      <Translate contentKey="global.menu.entities.reponseJoueur" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/theme">
      <Translate contentKey="global.menu.entities.theme" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/reponse-possible">
      <Translate contentKey="global.menu.entities.reponsePossible" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/niveau">
      <Translate contentKey="global.menu.entities.niveau" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/joueur">
      <Translate contentKey="global.menu.entities.joueur" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
