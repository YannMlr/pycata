package com.telecom.pycata.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.telecom.pycata.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.telecom.pycata.repository.JoueurRepository;
import com.telecom.pycata.repository.QuizzRepository;
import com.telecom.pycata.repository.ReponseJoueurRepository;
import com.telecom.pycata.web.rest.errors.BadRequestAlertException;
import com.telecom.pycata.service.UserService;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.telecom.pycata.domain.Quizz}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class QuizzResource {

    private final Logger log = LoggerFactory.getLogger(QuizzResource.class);

    private static final String ENTITY_NAME = "quizz";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private UserService userService;

    private final QuizzRepository quizzRepository;
    private final JoueurRepository joueurRepository;
    private final ReponseJoueurRepository reponseJoueurRepository;


    public QuizzResource(QuizzRepository quizzRepository, JoueurRepository joueurRepository, ReponseJoueurRepository reponseJoueurRepository) {
        this.quizzRepository = quizzRepository;
        this.joueurRepository = joueurRepository;
        this.reponseJoueurRepository = reponseJoueurRepository;
    }

    /**
     * {@code POST  /quizzes} : Create a new quizz.
     *
     * @param quizz the quizz to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizz, or with status {@code 400 (Bad Request)} if the quizz has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quizzes")
    public ResponseEntity<Quizz> createQuizz(@RequestBody Quizz quizz) throws URISyntaxException {
        log.debug("REST request to save Quizz : {}", quizz);
        if (quizz.getId() != null) {
            throw new BadRequestAlertException("A new quizz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quizz result = quizzRepository.save(quizz);
        return ResponseEntity.created(new URI("/api/quizzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code POST  /quizzes} : Links players to quizzes through ReponseJoueur class.
     *
     * @param  id and joueur id.
     *
     */
    @GetMapping("/quizz-add-joueur/{id}")
    public void addJoueurToQuizz(@PathVariable("id") Long id) {
        Quizz quizz = quizzRepository.findById(id).get();
        Joueur joueur = joueurRepository.getJoueurByIdUser(this.userService.getUserWithAuthorities().get().getId());
        Set<Question> questions = quizz.getQuestions();
        for(Question question : questions) {
        	for(ReponsePossible reponsePossible : question.getReponsePossibles()){
                ReponseJoueur reponseJoueur = new ReponseJoueur();
                reponseJoueur.setJoueur(joueur);
                reponseJoueur.setReponsePossible(reponsePossible);
                reponseJoueurRepository.save(reponseJoueur);
            }
        }
        reponseJoueurRepository.flush();

    }

    /**
     * {@code PUT  /quizzes} : Updates an existing quizz.
     *
     * @param quizz the quizz to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizz,
     * or with status {@code 400 (Bad Request)} if the quizz is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizz couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quizzes")
    public ResponseEntity<Quizz> updateQuizz(@RequestBody Quizz quizz) throws URISyntaxException {
        log.debug("REST request to update Quizz : {}", quizz);
        if (quizz.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Quizz result = quizzRepository.save(quizz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizz.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /quizzes} : get all the quizzes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizzes in body.
     */
    @GetMapping("/quizzes")
    public List<Quizz> getAllQuizzes() {
        log.debug("REST request to get all Quizzes");
        return quizzRepository.findAll();
    }


    @GetMapping("/quizzesJoueur")
    public ResponseEntity<Joueur> getJoueur() {
    	//User user = userService.getUserWithAuthorities().get();

    	return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userService.getUserWithAuthorities().get().getId()))
                .body(joueurRepository.getJoueurByIdUser(userService.getUserWithAuthorities().get().getId()));
    }

    /**
     * {@code GET  /quizzes/:id} : get the "id" quizz.
     *
     * @param id the id of the quizz to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizz, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quizz> getQuizz(@PathVariable Long id) {
        log.debug("REST request to get Quizz : {}", id);
        Optional<Quizz> quizz = quizzRepository.findById(id);

        System.out.println( "" + this.userService.getUserWithAuthorities().get());
        return ResponseUtil.wrapOrNotFound(quizz);
    }

    /**
     * {@code DELETE  /quizzes/:id} : delete the "id" quizz.
     *
     * @param id the id of the quizz to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuizz(@PathVariable Long id, HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        principal.getName();
        log.debug("REST request to delete Quizz : {}", id);
        quizzRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }



    /**
     * {@code GET  /quizzes/:id} : get the "id" quizz.
     *
     * @param id the id of the quizz to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizz, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/choix/{id}")
    public ResponseEntity<Quizz> getChoix(@PathVariable Long id) {
        log.debug("REST request to get Quizz : {}", id);
        Optional<Quizz> quizz = quizzRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quizz);
    }



    /**
     * {@code GET  /quizzes/:id} : get the "id" quizz.
     *
     * @param id the id of the quizz to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizz, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questionActuelle/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        log.debug("REST request to get Quizz : {}", id);
        Optional<Quizz> quizz = quizzRepository.findById(id);

        Joueur joueur = joueurRepository.getJoueurByIdUser(this.userService.getUserWithAuthorities().get().getId());

        Set<ReponseJoueur> reponseJoueurs = joueur.getReponseJoueurs();
        Optional<Question> question = null;
        Set<Question> setQuestions = quizz.get().getQuestions();
        for(Question q : setQuestions)
        {
            for(ReponsePossible reponsePossible : q.getReponsePossibles()){
                for(ReponseJoueur reponseJoueur : reponseJoueurs) {
                    if(reponseJoueur.getReponsePossible().getId() == reponsePossible.getId() && reponseJoueur.getDateReponse() == null){
                         question = Optional.of(q);
                    }

                }
            }
        }

        return ResponseUtil.wrapOrNotFound(question);
    }


}
