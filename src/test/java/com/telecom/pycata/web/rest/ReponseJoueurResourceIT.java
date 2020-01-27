package com.telecom.pycata.web.rest;

import com.telecom.pycata.PycataApp;
import com.telecom.pycata.config.TestSecurityConfiguration;
import com.telecom.pycata.domain.ReponseJoueur;
import com.telecom.pycata.repository.ReponseJoueurRepository;
import com.telecom.pycata.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.telecom.pycata.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReponseJoueurResource} REST controller.
 */
@SpringBootTest(classes = {PycataApp.class, TestSecurityConfiguration.class})
public class ReponseJoueurResourceIT {

    private static final Long DEFAULT_DATE_ENVOI = 1L;
    private static final Long UPDATED_DATE_ENVOI = 2L;

    private static final Long DEFAULT_DATE_REPONSE = 1L;
    private static final Long UPDATED_DATE_REPONSE = 2L;

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Autowired
    private ReponseJoueurRepository reponseJoueurRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReponseJoueurMockMvc;

    private ReponseJoueur reponseJoueur;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReponseJoueurResource reponseJoueurResource = new ReponseJoueurResource(reponseJoueurRepository);
        this.restReponseJoueurMockMvc = MockMvcBuilders.standaloneSetup(reponseJoueurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReponseJoueur createEntity(EntityManager em) {
        ReponseJoueur reponseJoueur = new ReponseJoueur()
            .dateEnvoi(DEFAULT_DATE_ENVOI)
            .dateReponse(DEFAULT_DATE_REPONSE)
            .score(DEFAULT_SCORE);
        return reponseJoueur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReponseJoueur createUpdatedEntity(EntityManager em) {
        ReponseJoueur reponseJoueur = new ReponseJoueur()
            .dateEnvoi(UPDATED_DATE_ENVOI)
            .dateReponse(UPDATED_DATE_REPONSE)
            .score(UPDATED_SCORE);
        return reponseJoueur;
    }

    @BeforeEach
    public void initTest() {
        reponseJoueur = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponseJoueur() throws Exception {
        int databaseSizeBeforeCreate = reponseJoueurRepository.findAll().size();

        // Create the ReponseJoueur
        restReponseJoueurMockMvc.perform(post("/api/reponse-joueurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseJoueur)))
            .andExpect(status().isCreated());

        // Validate the ReponseJoueur in the database
        List<ReponseJoueur> reponseJoueurList = reponseJoueurRepository.findAll();
        assertThat(reponseJoueurList).hasSize(databaseSizeBeforeCreate + 1);
        ReponseJoueur testReponseJoueur = reponseJoueurList.get(reponseJoueurList.size() - 1);
        assertThat(testReponseJoueur.getDateEnvoi()).isEqualTo(DEFAULT_DATE_ENVOI);
        assertThat(testReponseJoueur.getDateReponse()).isEqualTo(DEFAULT_DATE_REPONSE);
        assertThat(testReponseJoueur.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createReponseJoueurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponseJoueurRepository.findAll().size();

        // Create the ReponseJoueur with an existing ID
        reponseJoueur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponseJoueurMockMvc.perform(post("/api/reponse-joueurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseJoueur)))
            .andExpect(status().isBadRequest());

        // Validate the ReponseJoueur in the database
        List<ReponseJoueur> reponseJoueurList = reponseJoueurRepository.findAll();
        assertThat(reponseJoueurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReponseJoueurs() throws Exception {
        // Initialize the database
        reponseJoueurRepository.saveAndFlush(reponseJoueur);

        // Get all the reponseJoueurList
        restReponseJoueurMockMvc.perform(get("/api/reponse-joueurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponseJoueur.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEnvoi").value(hasItem(DEFAULT_DATE_ENVOI.intValue())))
            .andExpect(jsonPath("$.[*].dateReponse").value(hasItem(DEFAULT_DATE_REPONSE.intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }
    
    @Test
    @Transactional
    public void getReponseJoueur() throws Exception {
        // Initialize the database
        reponseJoueurRepository.saveAndFlush(reponseJoueur);

        // Get the reponseJoueur
        restReponseJoueurMockMvc.perform(get("/api/reponse-joueurs/{id}", reponseJoueur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reponseJoueur.getId().intValue()))
            .andExpect(jsonPath("$.dateEnvoi").value(DEFAULT_DATE_ENVOI.intValue()))
            .andExpect(jsonPath("$.dateReponse").value(DEFAULT_DATE_REPONSE.intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingReponseJoueur() throws Exception {
        // Get the reponseJoueur
        restReponseJoueurMockMvc.perform(get("/api/reponse-joueurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponseJoueur() throws Exception {
        // Initialize the database
        reponseJoueurRepository.saveAndFlush(reponseJoueur);

        int databaseSizeBeforeUpdate = reponseJoueurRepository.findAll().size();

        // Update the reponseJoueur
        ReponseJoueur updatedReponseJoueur = reponseJoueurRepository.findById(reponseJoueur.getId()).get();
        // Disconnect from session so that the updates on updatedReponseJoueur are not directly saved in db
        em.detach(updatedReponseJoueur);
        updatedReponseJoueur
            .dateEnvoi(UPDATED_DATE_ENVOI)
            .dateReponse(UPDATED_DATE_REPONSE)
            .score(UPDATED_SCORE);

        restReponseJoueurMockMvc.perform(put("/api/reponse-joueurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReponseJoueur)))
            .andExpect(status().isOk());

        // Validate the ReponseJoueur in the database
        List<ReponseJoueur> reponseJoueurList = reponseJoueurRepository.findAll();
        assertThat(reponseJoueurList).hasSize(databaseSizeBeforeUpdate);
        ReponseJoueur testReponseJoueur = reponseJoueurList.get(reponseJoueurList.size() - 1);
        assertThat(testReponseJoueur.getDateEnvoi()).isEqualTo(UPDATED_DATE_ENVOI);
        assertThat(testReponseJoueur.getDateReponse()).isEqualTo(UPDATED_DATE_REPONSE);
        assertThat(testReponseJoueur.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void updateNonExistingReponseJoueur() throws Exception {
        int databaseSizeBeforeUpdate = reponseJoueurRepository.findAll().size();

        // Create the ReponseJoueur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponseJoueurMockMvc.perform(put("/api/reponse-joueurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponseJoueur)))
            .andExpect(status().isBadRequest());

        // Validate the ReponseJoueur in the database
        List<ReponseJoueur> reponseJoueurList = reponseJoueurRepository.findAll();
        assertThat(reponseJoueurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReponseJoueur() throws Exception {
        // Initialize the database
        reponseJoueurRepository.saveAndFlush(reponseJoueur);

        int databaseSizeBeforeDelete = reponseJoueurRepository.findAll().size();

        // Delete the reponseJoueur
        restReponseJoueurMockMvc.perform(delete("/api/reponse-joueurs/{id}", reponseJoueur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReponseJoueur> reponseJoueurList = reponseJoueurRepository.findAll();
        assertThat(reponseJoueurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
