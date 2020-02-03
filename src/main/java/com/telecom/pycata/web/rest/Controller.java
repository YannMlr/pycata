package com.telecom.pycata.web.rest;

import com.telecom.pycata.domain.User;
import com.telecom.pycata.repository.JoueurRepository;
import com.telecom.pycata.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    JoueurRepository joueurRepository ;
    UserRepository userRepository;

    public Controller(JoueurRepository joueurRepository, UserRepository userRepository) {

        this.joueurRepository = joueurRepository;
        this.userRepository = userRepository;


    }


   // @Scheduled()
    public void synchroniseUserOkta()
    {

    }
}
