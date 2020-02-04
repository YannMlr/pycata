package com.telecom.pycata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.telecom.pycata.domain.Question;


/**
 * Spring Data  repository for the Question entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	/**
	 * Méthode qui revoit toutes les questions d'un quizz dont l'id est donné en paramètre
	 */
	@Query("FROM Question WHERE quizz.id = :id")
    List<Question> findQuestionByQuizzId(@Param("id") Long id);
}
