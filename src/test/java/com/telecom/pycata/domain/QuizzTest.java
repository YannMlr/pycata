package com.telecom.pycata.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.telecom.pycata.web.rest.TestUtil;

public class QuizzTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Quizz.class);
        Quizz quizz1 = new Quizz();
        quizz1.setId(1L);
        Quizz quizz2 = new Quizz();
        quizz2.setId(quizz1.getId());
        assertThat(quizz1).isEqualTo(quizz2);
        quizz2.setId(2L);
        assertThat(quizz1).isNotEqualTo(quizz2);
        quizz1.setId(null);
        assertThat(quizz1).isNotEqualTo(quizz2);
    }
}
