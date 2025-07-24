package com.kishore.service;

import com.kishore.model.ContactMessage;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class JmsProducer {

    private final JmsTemplate jmsTemplate;

    public JmsProducer(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendMessage(ContactMessage message) {
        // 👇 Add this line to confirm it's being called
        System.out.println("📤 Sending message to queue: " + message);

        // Actual queue name must match your listener's destination
        jmsTemplate.convertAndSend("contact.queue", message);
    }
}
