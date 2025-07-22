package com.kishore.controller;

// Update the import below to match the actual package of ContactMessage
import com.kishore.model.ContactMessage;
// Make sure this import matches the actual package of your JmsProducer class
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

    @PostMapping
    public String receiveContact(@RequestBody ContactMessage message) {
        jmsProducer.sendMessage(message);
        return "Message queued successfully!";
    }
}
