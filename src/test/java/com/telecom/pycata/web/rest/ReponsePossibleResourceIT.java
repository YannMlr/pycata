package com.telecom.pycata.web.rest;

import com.telecom.pycata.PycataApp;
import com.telecom.pycata.config.TestSecurityConfiguration;
import com.telecom.pycata.domain.ReponsePossible;
import com.telecom.pycata.repository.ReponsePossibleRepository;
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
 * Integration tests for the {@link ReponsePossibleResource} REST controller.
 */
@SpringBootTest(classes = {PycataApp.class, TestSecurityConfiguration.class})
public class ReponsePossibleResourceIT {

    private static final String DEFAULT_INTITULE = "AAAAAAAAAA";
    private static final String UPDATED_INTITULE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VRAI = false;
    private static final Boolean UPDATED_VRAI = true;

    @Autowired
    private ReponsePossibleRepository reponsePossibleRepository;

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

    private MockMvc restReponsePossibleMockMvc;

    private ReponsePossible reponsePossible;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReponsePossibleResource reponsePossibleResource = new ReponsePossibleResource(reponsePossibleRepository);
        this.restReponsePossibleMockMvc = MockMvcBuilders.standaloneSetup(reponsePossibleResource)
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
    public static ReponsePossible createEntity(EntityManager em) {
        ReponsePossible reponsePossible = new ReponsePossible()
            .intitule(DEFAULT_INTITULE)
            .vrai(DEFAULT_VRAI);
        return reponsePossible;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReponsePossible createUpdatedEntity(EntityManager em) {
        ReponsePossible reponsePossible = new ReponsePossible()
            .intitule(UPDATED_INTITULE)
            .vrai(UPDATED_VRAI);
        return reponsePossible;
    }

    @BeforeEach
    public void initTest() {
        reponsePossible = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponsePossible() throws Exception {
        int databaseSizeBeforeCreate = reponsePossibleRepository.findAll().size();

        // Create the ReponsePossible
        restReponsePossibleMockMvc.perform(post("/api/reponse-possibles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponsePossible)))
            .andExpect(status().isCreated());

        // Validate the ReponsePossible in the database
        List<ReponsePossible> reponsePossibleList = reponsePossibleRepository.findAll();
        assertThat(reponsePossibleList).hasSize(databaseSizeBeforeCreate + 1);
        ReponsePossible testReponsePossible = reponsePossibleList.get(reponsePossibleList.size() - 1);
        assertThat(testReponsePossible.getIntitule()).isEqualTo(DEFAULT_INTITULE);
        assertThat(testReponsePossible.isVrai()).isEqualTo(DEFAULT_VRAI);
    }

    @Test
    @Transactional
    public void createReponsePossibleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponsePossibleRepository.findAll().size();

        // Create the ReponsePossible with an existing ID
        reponsePossible.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponsePossibleMockMvc.perform(post("/api/reponse-possibles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponsePossible)))
            .andExpect(status().isBadRequest());

        // Validate the ReponsePossible in the database
        List<ReponsePossible> reponsePossibleList = reponsePossibleRepository.findAll();
        assertThat(reponsePossibleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReponsePossibles() throws Exception {
        // Initialize the database
        reponsePossibleRepository.saveAndFlush(reponsePossible);

        // Get all the reponsePossibleList
        restReponsePossibleMockMvc.perform(get("/api/reponse-possibles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponsePossible.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE)))
            .andExpect(jsonPath("$.[*].vrai").value(hasItem(DEFAULT_VRAI.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getReponsePossible() throws Exception {
        // Initialize the database
        reponsePossibleRepository.saveAndFlush(reponsePossible);

        // Get the reponsePossible
        restReponsePossibleMockMvc.perform(get("/api/reponse-possibles/{id}", reponsePossible.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reponsePossible.getId().intValue()))
            .andExpect(jsonPath("$.intitule").value(DEFAULT_INTITULE))
            .andExpect(jsonPath("$.vrai").value(DEFAULT_VRAI.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReponsePossible() throws Exception {
        // Get the reponsePossible
        restReponsePossibleMockMvc.perform(get("/api/reponse-possibles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponsePossible() throws Exception {
        // Initialize the database
        reponsePossibleRepository.saveAndFlush(reponsePossible);

        int databaseSizeBeforeUpdate = reponsePossibleRepository.findAll().size();

        // Update the reponsePossible
        ReponsePossible updatedReponsePossible = reponsePossibleRepository.findById(reponsePossible.getId()).get();
        // Disconnect from session so that the updates on updatedReponsePossible are not directly saved in db
        em.detach(updatedReponsePossible);
        updatedReponsePossible
            .intitule(UPDATED_INTITULE)
            .vrai(UPDATED_VRAI);

        restReponsePossibleMockMvc.perform(put("/api/reponse-possibles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReponsePossible)))
            .andExpect(status().isOk());

        // Validate the ReponsePossible in the database
        List<ReponsePossible> reponsePossibleList = reponsePossibleRepository.findAll();
        assertThat(reponsePossibleList).hasSize(databaseSizeBeforeUpdate);
        ReponsePossible testReponsePossible = reponsePossibleList.get(reponsePossibleList.size() - 1);
        assertThat(testReponsePossible.getIntitule()).isEqualTo(UPDATED_INTITULE);
        assertThat(testReponsePossible.isVrai()).isEqualTo(UPDATED_VRAI);
    }

    @Test
    @Transactional
    public void updateNonExistingReponsePossible() throws Exception {
        int databaseSizeBeforeUpdate = reponsePossibleRepository.findAll().size();

        // Create the ReponsePossible

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponsePossibleMockMvc.perform(put("/api/reponse-possibles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponsePossible)))
            .andExpect(status().isBadRequest());

        // Validate the ReponsePossible in the database
        List<ReponsePossible> reponsePossibleList = reponsePossibleRepository.findAll();
        assertThat(reponsePossibleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReponsePossible() throws Exception {
        // Initialize the database
        reponsePossibleRepository.saveAndFlush(reponsePossible);

        int databaseSizeBeforeDelete = reponsePossibleRepository.findAll().size();

        // Delete the reponsePossible
        restReponsePossibleMockMvc.perform(delete("/api/reponse-possibles/{id}", reponsePossible.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReponsePossible> reponsePossibleList = reponsePossibleRepository.findAll();
        assertThat(reponsePossibleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
