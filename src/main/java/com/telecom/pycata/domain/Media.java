package com.telecom.pycata.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Media.
 */
@Entity
@Table(name = "media")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Media implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "nom")
    private String nom;

    @Column(name = "type")
    private Integer type;

    @OneToMany(mappedBy = "media")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Question> questions = new HashSet<>();

    @OneToMany(mappedBy = "media")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReponsePossible> reponsePossibles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Media url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getNom() {
        return nom;
    }

    public Media nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getType() {
        return type;
    }

    public Media type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Media questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Media addQuestion(Question question) {
        this.questions.add(question);
        question.setMedia(this);
        return this;
    }

    public Media removeQuestion(Question question) {
        this.questions.remove(question);
        question.setMedia(null);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<ReponsePossible> getReponsePossibles() {
        return reponsePossibles;
    }

    public Media reponsePossibles(Set<ReponsePossible> reponsePossibles) {
        this.reponsePossibles = reponsePossibles;
        return this;
    }

    public Media addReponsePossible(ReponsePossible reponsePossible) {
        this.reponsePossibles.add(reponsePossible);
        reponsePossible.setMedia(this);
        return this;
    }

    public Media removeReponsePossible(ReponsePossible reponsePossible) {
        this.reponsePossibles.remove(reponsePossible);
        reponsePossible.setMedia(null);
        return this;
    }

    public void setReponsePossibles(Set<ReponsePossible> reponsePossibles) {
        this.reponsePossibles = reponsePossibles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Media)) {
            return false;
        }
        return id != null && id.equals(((Media) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Media{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", nom='" + getNom() + "'" +
            ", type=" + getType() +
            "}";
    }
}
