package com.telecom.pycata.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.telecom.pycata.web.rest.TestUtil;

public class ReponsePossibleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReponsePossible.class);
        ReponsePossible reponsePossible1 = new ReponsePossible();
        reponsePossible1.setId(1L);
        ReponsePossible reponsePossible2 = new ReponsePossible();
        reponsePossible2.setId(reponsePossible1.getId());
        assertThat(reponsePossible1).isEqualTo(reponsePossible2);
        reponsePossible2.setId(2L);
        assertThat(reponsePossible1).isNotEqualTo(reponsePossible2);
        reponsePossible1.setId(null);
        assertThat(reponsePossible1).isNotEqualTo(reponsePossible2);
    }
}
