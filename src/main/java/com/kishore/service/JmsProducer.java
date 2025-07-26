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
        System.out.println("📤 Sending message to queue: " + message);

        jmsTemplate.convertAndSend("contact.queue", message);
    }

	public void send(String formattedMessage) {
		
	}
}
