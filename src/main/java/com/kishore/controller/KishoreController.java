package com.kishore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class KishoreController {

	
	@GetMapping("/")
		 
	public String home() {
		return "index";
	}
	
//	@GetMapping("/skills")
//	
//	public String skills() {
//		return "Skills";
//	}
//	
//	@GetMapping("/projects")
//		
//		public String projects() {
//			return "projects";
//		}
//		
//	@GetMapping("/contact")
//	
//	public String contact() {
//		return "contact";
//	}

	@PostMapping("/contact")
    public String submitContact(@RequestParam String name, @RequestParam String email,
                                @RequestParam String message, Model model) {
        model.addAttribute("name", name);
        return "thanks";
    }
	
}
	

