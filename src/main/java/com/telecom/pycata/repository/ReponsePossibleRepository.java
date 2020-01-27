package com.telecom.pycata.repository;

import com.telecom.pycata.domain.ReponsePossible;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReponsePossible entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReponsePossibleRepository extends JpaRepository<ReponsePossible, Long> {

}
