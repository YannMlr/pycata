package com.telecom.pycata.repository;

import com.telecom.pycata.domain.Quizz;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Quizz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizzRepository extends JpaRepository<Quizz, Long> {

}
