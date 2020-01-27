package com.telecom.pycata.web.rest;

import com.telecom.pycata.domain.ReponseJoueur;
import com.telecom.pycata.repository.ReponseJoueurRepository;
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
 * REST controller for managing {@link com.telecom.pycata.domain.ReponseJoueur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReponseJoueurResource {

    private final Logger log = LoggerFactory.getLogger(ReponseJoueurResource.class);

    private static final String ENTITY_NAME = "reponseJoueur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReponseJoueurRepository reponseJoueurRepository;

    public ReponseJoueurResource(ReponseJoueurRepository reponseJoueurRepository) {
        this.reponseJoueurRepository = reponseJoueurRepository;
    }

    /**
     * {@code POST  /reponse-joueurs} : Create a new reponseJoueur.
     *
     * @param reponseJoueur the reponseJoueur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reponseJoueur, or with status {@code 400 (Bad Request)} if the reponseJoueur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reponse-joueurs")
    public ResponseEntity<ReponseJoueur> createReponseJoueur(@RequestBody ReponseJoueur reponseJoueur) throws URISyntaxException {
        log.debug("REST request to save ReponseJoueur : {}", reponseJoueur);
        if (reponseJoueur.getId() != null) {
            throw new BadRequestAlertException("A new reponseJoueur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReponseJoueur result = reponseJoueurRepository.save(reponseJoueur);
        return ResponseEntity.created(new URI("/api/reponse-joueurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reponse-joueurs} : Updates an existing reponseJoueur.
     *
     * @param reponseJoueur the reponseJoueur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reponseJoueur,
     * or with status {@code 400 (Bad Request)} if the reponseJoueur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reponseJoueur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reponse-joueurs")
    public ResponseEntity<ReponseJoueur> updateReponseJoueur(@RequestBody ReponseJoueur reponseJoueur) throws URISyntaxException {
        log.debug("REST request to update ReponseJoueur : {}", reponseJoueur);
        if (reponseJoueur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReponseJoueur result = reponseJoueurRepository.save(reponseJoueur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reponseJoueur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reponse-joueurs} : get all the reponseJoueurs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reponseJoueurs in body.
     */
    @GetMapping("/reponse-joueurs")
    public List<ReponseJoueur> getAllReponseJoueurs() {
        log.debug("REST request to get all ReponseJoueurs");
        return reponseJoueurRepository.findAll();
    }

    /**
     * {@code GET  /reponse-joueurs/:id} : get the "id" reponseJoueur.
     *
     * @param id the id of the reponseJoueur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reponseJoueur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reponse-joueurs/{id}")
    public ResponseEntity<ReponseJoueur> getReponseJoueur(@PathVariable Long id) {
        log.debug("REST request to get ReponseJoueur : {}", id);
        Optional<ReponseJoueur> reponseJoueur = reponseJoueurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reponseJoueur);
    }

    /**
     * {@code DELETE  /reponse-joueurs/:id} : delete the "id" reponseJoueur.
     *
     * @param id the id of the reponseJoueur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reponse-joueurs/{id}")
    public ResponseEntity<Void> deleteReponseJoueur(@PathVariable Long id) {
        log.debug("REST request to delete ReponseJoueur : {}", id);
        reponseJoueurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
