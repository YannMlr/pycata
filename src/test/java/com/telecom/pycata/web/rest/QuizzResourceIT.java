package com.telecom.pycata.web.rest;

import com.telecom.pycata.PycataApp;
import com.telecom.pycata.config.TestSecurityConfiguration;
import com.telecom.pycata.domain.Quizz;
import com.telecom.pycata.repository.QuizzRepository;
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
 * Integration tests for the {@link QuizzResource} REST controller.
 */
@SpringBootTest(classes = {PycataApp.class, TestSecurityConfiguration.class})
public class QuizzResourceIT {

    private static final String DEFAULT_SUJET = "AAAAAAAAAA";
    private static final String UPDATED_SUJET = "BBBBBBBBBB";

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    @Autowired
    private QuizzRepository quizzRepository;

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

    private MockMvc restQuizzMockMvc;

    private Quizz quizz;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizzResource quizzResource = new QuizzResource(quizzRepository);
        this.restQuizzMockMvc = MockMvcBuilders.standaloneSetup(quizzResource)
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
    public static Quizz createEntity(EntityManager em) {
        Quizz quizz = new Quizz()
            .sujet(DEFAULT_SUJET)
            .score(DEFAULT_SCORE);
        return quizz;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quizz createUpdatedEntity(EntityManager em) {
        Quizz quizz = new Quizz()
            .sujet(UPDATED_SUJET)
            .score(UPDATED_SCORE);
        return quizz;
    }

    @BeforeEach
    public void initTest() {
        quizz = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuizz() throws Exception {
        int databaseSizeBeforeCreate = quizzRepository.findAll().size();

        // Create the Quizz
        restQuizzMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizz)))
            .andExpect(status().isCreated());

        // Validate the Quizz in the database
        List<Quizz> quizzList = quizzRepository.findAll();
        assertThat(quizzList).hasSize(databaseSizeBeforeCreate + 1);
        Quizz testQuizz = quizzList.get(quizzList.size() - 1);
        assertThat(testQuizz.getSujet()).isEqualTo(DEFAULT_SUJET);
        assertThat(testQuizz.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createQuizzWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizzRepository.findAll().size();

        // Create the Quizz with an existing ID
        quizz.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizzMockMvc.perform(post("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizz)))
            .andExpect(status().isBadRequest());

        // Validate the Quizz in the database
        List<Quizz> quizzList = quizzRepository.findAll();
        assertThat(quizzList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuizzes() throws Exception {
        // Initialize the database
        quizzRepository.saveAndFlush(quizz);

        // Get all the quizzList
        restQuizzMockMvc.perform(get("/api/quizzes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizz.getId().intValue())))
            .andExpect(jsonPath("$.[*].sujet").value(hasItem(DEFAULT_SUJET)))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)));
    }
    
    @Test
    @Transactional
    public void getQuizz() throws Exception {
        // Initialize the database
        quizzRepository.saveAndFlush(quizz);

        // Get the quizz
        restQuizzMockMvc.perform(get("/api/quizzes/{id}", quizz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(quizz.getId().intValue()))
            .andExpect(jsonPath("$.sujet").value(DEFAULT_SUJET))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE));
    }

    @Test
    @Transactional
    public void getNonExistingQuizz() throws Exception {
        // Get the quizz
        restQuizzMockMvc.perform(get("/api/quizzes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuizz() throws Exception {
        // Initialize the database
        quizzRepository.saveAndFlush(quizz);

        int databaseSizeBeforeUpdate = quizzRepository.findAll().size();

        // Update the quizz
        Quizz updatedQuizz = quizzRepository.findById(quizz.getId()).get();
        // Disconnect from session so that the updates on updatedQuizz are not directly saved in db
        em.detach(updatedQuizz);
        updatedQuizz
            .sujet(UPDATED_SUJET)
            .score(UPDATED_SCORE);

        restQuizzMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuizz)))
            .andExpect(status().isOk());

        // Validate the Quizz in the database
        List<Quizz> quizzList = quizzRepository.findAll();
        assertThat(quizzList).hasSize(databaseSizeBeforeUpdate);
        Quizz testQuizz = quizzList.get(quizzList.size() - 1);
        assertThat(testQuizz.getSujet()).isEqualTo(UPDATED_SUJET);
        assertThat(testQuizz.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void updateNonExistingQuizz() throws Exception {
        int databaseSizeBeforeUpdate = quizzRepository.findAll().size();

        // Create the Quizz

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizzMockMvc.perform(put("/api/quizzes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizz)))
            .andExpect(status().isBadRequest());

        // Validate the Quizz in the database
        List<Quizz> quizzList = quizzRepository.findAll();
        assertThat(quizzList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuizz() throws Exception {
        // Initialize the database
        quizzRepository.saveAndFlush(quizz);

        int databaseSizeBeforeDelete = quizzRepository.findAll().size();

        // Delete the quizz
        restQuizzMockMvc.perform(delete("/api/quizzes/{id}", quizz.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Quizz> quizzList = quizzRepository.findAll();
        assertThat(quizzList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
