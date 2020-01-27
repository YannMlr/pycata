package com.telecom.pycata.repository;

import com.telecom.pycata.domain.ReponseJoueur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReponseJoueur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReponseJoueurRepository extends JpaRepository<ReponseJoueur, Long> {

}
