package com.kishore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/contact")
public class ContactController {
	
	@Autowired
	private JavaMailSender mailSender;
    
    @GetMapping("/")
	 
   	public String home() {
   		return "index";
   	}

    
    
    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestParam("name") String name,
                                            @RequestParam("email") String email,
                                            @RequestParam("message") String message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom("rkishoreukt@gmail.com");
            mail.setTo("2020ec0929@svce.ac.in");
            mail.setSubject("You received a new message from your portfolio site:");
            mail.setText("Name: " + name + "\nEmail: " + email + "\nMessage: " + message);
            System.out.println("MailSender is null? " + (mailSender == null)); 

            mailSender.send(mail);
            return ResponseEntity.ok("Mail sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Mail send failed.");
        }
    }



   
    
}