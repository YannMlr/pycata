package com.telecom.pycata.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ReponsePossible.
 */
@Entity
@Table(name = "reponse_possible")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReponsePossible implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "intitule")
    private String intitule;

    @Column(name = "vrai")
    private Boolean vrai;

    @OneToMany(mappedBy = "reponsePossible")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReponseJoueur> reponseJoueurs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("reponsePossibles")
    private Question question;

    @ManyToOne
    @JsonIgnoreProperties("reponsePossibles")
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

    public ReponsePossible intitule(String intitule) {
        this.intitule = intitule;
        return this;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public Boolean isVrai() {
        return vrai;
    }

    public ReponsePossible vrai(Boolean vrai) {
        this.vrai = vrai;
        return this;
    }

    public void setVrai(Boolean vrai) {
        this.vrai = vrai;
    }

    public Set<ReponseJoueur> getReponseJoueurs() {
        return reponseJoueurs;
    }

    public ReponsePossible reponseJoueurs(Set<ReponseJoueur> reponseJoueurs) {
        this.reponseJoueurs = reponseJoueurs;
        return this;
    }

    public ReponsePossible addReponseJoueur(ReponseJoueur reponseJoueur) {
        this.reponseJoueurs.add(reponseJoueur);
        reponseJoueur.setReponsePossible(this);
        return this;
    }

    public ReponsePossible removeReponseJoueur(ReponseJoueur reponseJoueur) {
        this.reponseJoueurs.remove(reponseJoueur);
        reponseJoueur.setReponsePossible(null);
        return this;
    }

    public void setReponseJoueurs(Set<ReponseJoueur> reponseJoueurs) {
        this.reponseJoueurs = reponseJoueurs;
    }

    public Question getQuestion() {
        return question;
    }

    public ReponsePossible question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Media getMedia() {
        return media;
    }

    public ReponsePossible media(Media media) {
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
        if (!(o instanceof ReponsePossible)) {
            return false;
        }
        return id != null && id.equals(((ReponsePossible) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReponsePossible{" +
            "id=" + getId() +
            ", intitule='" + getIntitule() + "'" +
            ", vrai='" + isVrai() + "'" +
            "}";
    }
}
