package com.telecom.pycata.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ReponseJoueur.
 */
@Entity
@Table(name = "reponse_joueur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReponseJoueur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_envoi")
    private Long dateEnvoi;

    @Column(name = "date_reponse")
    private Long dateReponse;

    @Column(name = "score")
    private Integer score;

    @ManyToOne
    @JsonIgnoreProperties("reponseJoueurs")
    private Joueur joueur;

    @ManyToOne
    @JsonIgnoreProperties("reponseJoueurs")
    private ReponsePossible reponsePossible;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDateEnvoi() {
        return dateEnvoi;
    }

    public ReponseJoueur dateEnvoi(Long dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
        return this;
    }

    public void setDateEnvoi(Long dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }

    public Long getDateReponse() {
        return dateReponse;
    }

    public ReponseJoueur dateReponse(Long dateReponse) {
        this.dateReponse = dateReponse;
        return this;
    }

    public void setDateReponse(Long dateReponse) {
        this.dateReponse = dateReponse;
    }

    public Integer getScore() {
        return score;
    }

    public ReponseJoueur score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Joueur getJoueur() {
        return joueur;
    }

    public ReponseJoueur joueur(Joueur joueur) {
        this.joueur = joueur;
        return this;
    }

    public void setJoueur(Joueur joueur) {
        this.joueur = joueur;
    }

    public ReponsePossible getReponsePossible() {
        return reponsePossible;
    }

    public ReponseJoueur reponsePossible(ReponsePossible reponsePossible) {
        this.reponsePossible = reponsePossible;
        return this;
    }

    public void setReponsePossible(ReponsePossible reponsePossible) {
        this.reponsePossible = reponsePossible;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReponseJoueur)) {
            return false;
        }
        return id != null && id.equals(((ReponseJoueur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReponseJoueur{" +
            "id=" + getId() +
            ", dateEnvoi=" + getDateEnvoi() +
            ", dateReponse=" + getDateReponse() +
            ", score=" + getScore() +
            "}";
    }
}
