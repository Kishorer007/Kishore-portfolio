package com.kishore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.kishore.model.ContactMessage;

@Component
public class ContactMessageListener {

    @Autowired
    private JavaMailSender mailSender;

    @JmsListener(destination = "contact.queue")
    public void processMessage(ContactMessage message) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo("your_email@gmail.com");
            email.setSubject("New Contact Form Message");
            email.setText("Name: " + message.getName() + "\n"
                        + "Email: " + message.getEmail() + "\n"
                        + "Message: " + message.getMessage());

            mailSender.send(email);
            System.out.println("✅ Email sent from JMS listener");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
