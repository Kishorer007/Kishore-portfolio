package com.kishore.service;

import com.kishore.model.ContactMessage;
import jakarta.mail.MessagingException;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class ContactMessageListener {

    private final JavaMailSender mailSender;

    public ContactMessageListener(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @JmsListener(destination = "contact.queue")
    public void receiveMessage(ContactMessage message) throws MessagingException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("your_email@gmail.com"); // your inbox
        mail.setSubject("New Contact Form Submission");
        mail.setText("From: " + message.getName() + " (" + message.getEmail() + ")\n\n" + message.getMessage());

        mailSender.send(mail);
    }
}

