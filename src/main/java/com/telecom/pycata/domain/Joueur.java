package com.telecom.pycata.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Joueur.
 */
@Entity
@Table(name = "joueur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Joueur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_user")
    private Long idUser;

    @OneToMany(mappedBy = "joueur", fetch=FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ReponseJoueur> reponseJoueurs = new HashSet<>();
    

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdUser() {
        return idUser;
    }

    public Joueur idUser(Long idUser) {
        this.idUser = idUser;
        return this;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Set<ReponseJoueur> getReponseJoueurs() {
        return reponseJoueurs;
    }

    public Joueur reponseJoueurs(Set<ReponseJoueur> reponseJoueurs) {
        this.reponseJoueurs = reponseJoueurs;
        return this;
    }

    public Joueur addReponseJoueur(ReponseJoueur reponseJoueur) {
        this.reponseJoueurs.add(reponseJoueur);
        reponseJoueur.setJoueur(this);
        return this;
    }

    public Joueur removeReponseJoueur(ReponseJoueur reponseJoueur) {
        this.reponseJoueurs.remove(reponseJoueur);
        reponseJoueur.setJoueur(null);
        return this;
    }

    public void setReponseJoueurs(Set<ReponseJoueur> reponseJoueurs) {
        this.reponseJoueurs = reponseJoueurs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Joueur)) {
            return false;
        }
        return id != null && id.equals(((Joueur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Joueur{" +
            "id=" + getId() +
            ", idUser=" + getIdUser() +
            "}";
    }
}
