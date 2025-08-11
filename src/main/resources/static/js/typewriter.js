/* -----------------------------------------------
* Typewriter.js - A simple JavaScript library for creating typewriter effects
* Author: Kishore R (Portfolio)
* License: MIT
* ----------------------------------------------- */

class Typewriter {
  constructor(element, options = {}) {
    // Get the element
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) {
      console.error('Typewriter: Element not found');
      return;
    }
    
    // Set options with defaults
    this.options = {
      strings: options.strings || ['Hello World'],
      speed: options.speed || 100,
      deleteSpeed: options.deleteSpeed || 50,
      delay: options.delay || 1500,
      loop: options.loop !== undefined ? options.loop : true,
      cursor: options.cursor !== undefined ? options.cursor : true,
      cursorChar: options.cursorChar || '|',
      autoStart: options.autoStart !== undefined ? options.autoStart : true,
      onComplete: options.onComplete || null
    };
    
    // Initialize variables
    this.isDeleting = false;
    this.loopNum = 0;
    this.text = '';
    this.currentStringIndex = 0;
    this.cursorElement = null;
    
    // Initialize
    this.init();
  }
  
  init() {
    // Create cursor element if needed
    if (this.options.cursor) {
      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'typewriter-cursor';
      this.cursorElement.innerHTML = this.options.cursorChar;
      this.cursorElement.style.animation = 'blink 0.7s infinite';
      this.element.parentNode.insertBefore(this.cursorElement, this.element.nextSibling);
      
      // Add CSS for cursor blinking if not already present
      if (!document.querySelector('#typewriter-styles')) {
        const style = document.createElement('style');
        style.id = 'typewriter-styles';
        style.innerHTML = `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Start typing if autoStart is true
    if (this.options.autoStart) {
      this.start();
    }
  }
  
  start() {
    this.currentStringIndex = 0;
    this.loopNum = 0;
    this.isDeleting = false;
    this.text = '';
    this.tick();
  }
  
  tick() {
    // Get current string
    const currentString = this.options.strings[this.currentStringIndex];
    
    // Calculate new text
    if (this.isDeleting) {
      // Remove characters
      this.text = currentString.substring(0, this.text.length - 1);
    } else {
      // Add characters
      this.text = currentString.substring(0, this.text.length + 1);
    }
    
    // Update element text
    this.element.innerHTML = this.text;
    
    // Calculate typing speed
    let delta = this.isDeleting ? this.options.deleteSpeed : this.options.speed;
    
    // Check if complete
    if (!this.isDeleting && this.text === currentString) {
      // Switch to deleting state after delay
      delta = this.options.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      // Switch to next string
      this.isDeleting = false;
      this.currentStringIndex++;
      
      // Reset to first string if at end and looping
      if (this.currentStringIndex >= this.options.strings.length) {
        this.currentStringIndex = 0;
        this.loopNum++;
        
        // Stop if not looping and completed all strings
        if (!this.options.loop) {
          if (typeof this.options.onComplete === 'function') {
            this.options.onComplete();
          }
          return;
        }
      }
      
      // Pause before typing next string
      delta = 500;
    }
    
    // Schedule next tick
    setTimeout(() => this.tick(), delta);
  }
  
  stop() {
    // Remove cursor
    if (this.cursorElement) {
      this.cursorElement.remove();
      this.cursorElement = null;
    }
  }
}

// Initialize typewriter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if typewriter element exists
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    // Initialize typewriter
    new Typewriter('#typewriter-text', {
      strings: [
        'Full Stack Developer',
        'Java Enthusiast',
        'Spring Boot Expert',
        'Web Designer',
        'Problem Solver'
      ],
      speed: 80,
      deleteSpeed: 40,
      delay: 2000,
      loop: true
    });
  }
});