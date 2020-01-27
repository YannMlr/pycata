package com.telecom.pycata.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.telecom.pycata.web.rest.TestUtil;

public class JoueurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Joueur.class);
        Joueur joueur1 = new Joueur();
        joueur1.setId(1L);
        Joueur joueur2 = new Joueur();
        joueur2.setId(joueur1.getId());
        assertThat(joueur1).isEqualTo(joueur2);
        joueur2.setId(2L);
        assertThat(joueur1).isNotEqualTo(joueur2);
        joueur1.setId(null);
        assertThat(joueur1).isNotEqualTo(joueur2);
    }
}
