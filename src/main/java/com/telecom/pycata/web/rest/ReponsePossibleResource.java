package com.telecom.pycata.web.rest;

import com.telecom.pycata.domain.ReponsePossible;
import com.telecom.pycata.repository.ReponsePossibleRepository;
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
 * REST controller for managing {@link com.telecom.pycata.domain.ReponsePossible}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReponsePossibleResource {

    private final Logger log = LoggerFactory.getLogger(ReponsePossibleResource.class);

    private static final String ENTITY_NAME = "reponsePossible";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReponsePossibleRepository reponsePossibleRepository;

    public ReponsePossibleResource(ReponsePossibleRepository reponsePossibleRepository) {
        this.reponsePossibleRepository = reponsePossibleRepository;
    }

    /**
     * {@code POST  /reponse-possibles} : Create a new reponsePossible.
     *
     * @param reponsePossible the reponsePossible to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reponsePossible, or with status {@code 400 (Bad Request)} if the reponsePossible has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reponse-possibles")
    public ResponseEntity<ReponsePossible> createReponsePossible(@RequestBody ReponsePossible reponsePossible) throws URISyntaxException {
        log.debug("REST request to save ReponsePossible : {}", reponsePossible);
        if (reponsePossible.getId() != null) {
            throw new BadRequestAlertException("A new reponsePossible cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReponsePossible result = reponsePossibleRepository.save(reponsePossible);
        return ResponseEntity.created(new URI("/api/reponse-possibles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reponse-possibles} : Updates an existing reponsePossible.
     *
     * @param reponsePossible the reponsePossible to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reponsePossible,
     * or with status {@code 400 (Bad Request)} if the reponsePossible is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reponsePossible couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reponse-possibles")
    public ResponseEntity<ReponsePossible> updateReponsePossible(@RequestBody ReponsePossible reponsePossible) throws URISyntaxException {
        log.debug("REST request to update ReponsePossible : {}", reponsePossible);
        if (reponsePossible.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReponsePossible result = reponsePossibleRepository.save(reponsePossible);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reponsePossible.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reponse-possibles} : get all the reponsePossibles.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reponsePossibles in body.
     */
    @GetMapping("/reponse-possibles")
    public List<ReponsePossible> getAllReponsePossibles() {
        log.debug("REST request to get all ReponsePossibles");
        return reponsePossibleRepository.findAll();
    }

    /**
     * {@code GET  /reponse-possibles/:id} : get the "id" reponsePossible.
     *
     * @param id the id of the reponsePossible to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reponsePossible, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reponse-possibles/{id}")
    public ResponseEntity<ReponsePossible> getReponsePossible(@PathVariable Long id) {
        log.debug("REST request to get ReponsePossible : {}", id);
        Optional<ReponsePossible> reponsePossible = reponsePossibleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reponsePossible);
    }

    /**
     * {@code DELETE  /reponse-possibles/:id} : delete the "id" reponsePossible.
     *
     * @param id the id of the reponsePossible to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reponse-possibles/{id}")
    public ResponseEntity<Void> deleteReponsePossible(@PathVariable Long id) {
        log.debug("REST request to delete ReponsePossible : {}", id);
        reponsePossibleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
