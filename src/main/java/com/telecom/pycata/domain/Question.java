package com.telecom.pycata.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "intitule")
    private String intitule;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReponsePossible> reponsePossibles = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Quizz quizz;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Theme theme;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Niveau niveau;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Media media;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public Question intitule(String intitule) {
        this.intitule = intitule;
        return this;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public Set<ReponsePossible> getReponsePossibles() {
        return reponsePossibles;
    }

    public Question reponsePossibles(Set<ReponsePossible> reponsePossibles) {
        this.reponsePossibles = reponsePossibles;
        return this;
    }

    public Question addReponsePossible(ReponsePossible reponsePossible) {
        this.reponsePossibles.add(reponsePossible);
        reponsePossible.setQuestion(this);
        return this;
    }

    public Question removeReponsePossible(ReponsePossible reponsePossible) {
        this.reponsePossibles.remove(reponsePossible);
        reponsePossible.setQuestion(null);
        return this;
    }

    public void setReponsePossibles(Set<ReponsePossible> reponsePossibles) {
        this.reponsePossibles = reponsePossibles;
    }

    public Quizz getQuizz() {
        return quizz;
    }

    public Question quizz(Quizz quizz) {
        this.quizz = quizz;
        return this;
    }

    public void setQuizz(Quizz quizz) {
        this.quizz = quizz;
    }

    public Theme getTheme() {
        return theme;
    }

    public Question theme(Theme theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public Question niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public Media getMedia() {
        return media;
    }

    public Question media(Media media) {
        this.media = media;
        return this;
    }

    public void setMedia(Media media) {
        this.media = media;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", intitule='" + getIntitule() + "'" +
            "}";
    }
}
