package com.kishore.model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ContactMessage implements Serializable {
    private String name;
    private String email;
    private String message;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}



 
