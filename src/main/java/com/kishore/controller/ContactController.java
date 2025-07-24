package com.kishore.controller;

import com.kishore.model.ContactMessage;
import com.kishore.service.JmsProducer;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final JmsProducer jmsProducer;

    public ContactController(JmsProducer jmsProducer) {
        this.jmsProducer = jmsProducer;
    }

    @GetMapping("/")
	 
	public String home() {
		return "index";
	}
    
    @PostMapping
    public String receiveContact(@RequestBody ContactMessage message) {
        jmsProducer.sendMessage(message);
        return "Message queued successfully!";
    }
}
