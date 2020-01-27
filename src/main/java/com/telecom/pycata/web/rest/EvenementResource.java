package com.telecom.pycata.web.rest;

import com.telecom.pycata.domain.Evenement;
import com.telecom.pycata.repository.EvenementRepository;
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
 * REST controller for managing {@link com.telecom.pycata.domain.Evenement}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EvenementResource {

    private final Logger log = LoggerFactory.getLogger(EvenementResource.class);

    private static final String ENTITY_NAME = "evenement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EvenementRepository evenementRepository;

    public EvenementResource(EvenementRepository evenementRepository) {
        this.evenementRepository = evenementRepository;
    }

    /**
     * {@code POST  /evenements} : Create a new evenement.
     *
     * @param evenement the evenement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new evenement, or with status {@code 400 (Bad Request)} if the evenement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evenements")
    public ResponseEntity<Evenement> createEvenement(@RequestBody Evenement evenement) throws URISyntaxException {
        log.debug("REST request to save Evenement : {}", evenement);
        if (evenement.getId() != null) {
            throw new BadRequestAlertException("A new evenement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Evenement result = evenementRepository.save(evenement);
        return ResponseEntity.created(new URI("/api/evenements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evenements} : Updates an existing evenement.
     *
     * @param evenement the evenement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated evenement,
     * or with status {@code 400 (Bad Request)} if the evenement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the evenement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evenements")
    public ResponseEntity<Evenement> updateEvenement(@RequestBody Evenement evenement) throws URISyntaxException {
        log.debug("REST request to update Evenement : {}", evenement);
        if (evenement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Evenement result = evenementRepository.save(evenement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, evenement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /evenements} : get all the evenements.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of evenements in body.
     */
    @GetMapping("/evenements")
    public List<Evenement> getAllEvenements() {
        log.debug("REST request to get all Evenements");
        return evenementRepository.findAll();
    }

    /**
     * {@code GET  /evenements/:id} : get the "id" evenement.
     *
     * @param id the id of the evenement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the evenement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evenements/{id}")
    public ResponseEntity<Evenement> getEvenement(@PathVariable Long id) {
        log.debug("REST request to get Evenement : {}", id);
        Optional<Evenement> evenement = evenementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(evenement);
    }

    /**
     * {@code DELETE  /evenements/:id} : delete the "id" evenement.
     *
     * @param id the id of the evenement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evenements/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        log.debug("REST request to delete Evenement : {}", id);
        evenementRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
