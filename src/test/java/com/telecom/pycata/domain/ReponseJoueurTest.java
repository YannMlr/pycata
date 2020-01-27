package com.telecom.pycata.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.telecom.pycata.web.rest.TestUtil;

public class ReponseJoueurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReponseJoueur.class);
        ReponseJoueur reponseJoueur1 = new ReponseJoueur();
        reponseJoueur1.setId(1L);
        ReponseJoueur reponseJoueur2 = new ReponseJoueur();
        reponseJoueur2.setId(reponseJoueur1.getId());
        assertThat(reponseJoueur1).isEqualTo(reponseJoueur2);
        reponseJoueur2.setId(2L);
        assertThat(reponseJoueur1).isNotEqualTo(reponseJoueur2);
        reponseJoueur1.setId(null);
        assertThat(reponseJoueur1).isNotEqualTo(reponseJoueur2);
    }
}
