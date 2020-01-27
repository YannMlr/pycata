package com.telecom.pycata.web.rest;

import com.telecom.pycata.domain.Joueur;
import com.telecom.pycata.repository.JoueurRepository;
import com.telecom.pycata.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.telecom.pycata.domain.Joueur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class JoueurResource {

    private final Logger log = LoggerFactory.getLogger(JoueurResource.class);

    private static final String ENTITY_NAME = "joueur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JoueurRepository joueurRepository;

    public JoueurResource(JoueurRepository joueurRepository) {
        this.joueurRepository = joueurRepository;
    }

    /**
     * {@code POST  /joueurs} : Create a new joueur.
     *
     * @param joueur the joueur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new joueur, or with status {@code 400 (Bad Request)} if the joueur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/joueurs")
    public ResponseEntity<Joueur> createJoueur(@RequestBody Joueur joueur) throws URISyntaxException {
        log.debug("REST request to save Joueur : {}", joueur);
        if (joueur.getId() != null) {
            throw new BadRequestAlertException("A new joueur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Joueur result = joueurRepository.save(joueur);
        return ResponseEntity.created(new URI("/api/joueurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /joueurs} : Updates an existing joueur.
     *
     * @param joueur the joueur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated joueur,
     * or with status {@code 400 (Bad Request)} if the joueur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the joueur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/joueurs")
    public ResponseEntity<Joueur> updateJoueur(@RequestBody Joueur joueur) throws URISyntaxException {
        log.debug("REST request to update Joueur : {}", joueur);
        if (joueur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Joueur result = joueurRepository.save(joueur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, joueur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /joueurs} : get all the joueurs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of joueurs in body.
     */
    @GetMapping("/joueurs")
    public List<Joueur> getAllJoueurs() {
        log.debug("REST request to get all Joueurs");
        return joueurRepository.findAll();
    }

    /**
     * {@code GET  /joueurs/:id} : get the "id" joueur.
     *
     * @param id the id of the joueur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the joueur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/joueurs/{id}")
    public ResponseEntity<Joueur> getJoueur(@PathVariable Long id) {
        log.debug("REST request to get Joueur : {}", id);
        Optional<Joueur> joueur = joueurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(joueur);
    }

    /**
     * {@code DELETE  /joueurs/:id} : delete the "id" joueur.
     *
     * @param id the id of the joueur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/joueurs/{id}")
    public ResponseEntity<Void> deleteJoueur(@PathVariable Long id) {
        log.debug("REST request to delete Joueur : {}", id);
        joueurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
