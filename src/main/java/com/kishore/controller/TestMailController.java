package com.kishore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestMailController {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/test-mail")
    public String testMail() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("rkishoreukt@gmail.com"); // Replace with your email
            message.setSubject("Test Email from Spring Boot");
            message.setText("This is a test email sent without JMS.");

            mailSender.send(message);
            return "✅ Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Failed to send email: " + e.getMessage();
        }
    }
}
