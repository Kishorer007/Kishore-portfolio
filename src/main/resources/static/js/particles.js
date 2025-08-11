/* -----------------------------------------------
* Particles.js - A lightweight JavaScript library for creating particles
* Author: Kishore R (Portfolio)
* License: MIT
* ----------------------------------------------- */

class Particles {
  constructor(selector, options = {}) {
    this.canvas = document.querySelector(selector);
    if (!this.canvas) {
      console.error(`Particles: No element found with selector ${selector}`);
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    // Default options
    this.options = {
      particleCount: options.particleCount || 100,
      color: options.color || '#ffffff',
      minSize: options.minSize || 1,
      maxSize: options.maxSize || 3,
      speed: options.speed || 0.5,
      connectParticles: options.connectParticles !== undefined ? options.connectParticles : true,
      connectDistance: options.connectDistance || 100,
      lineWidth: options.lineWidth || 0.5,
      responsive: options.responsive !== undefined ? options.responsive : true
    };
    
    this.init();
  }
  
  init() {
    // Set canvas size
    this.setCanvasSize();
    
    // Create particles
    this.createParticles();
    
    // Start animation
    this.animate();
    
    // Handle window resize
    if (this.options.responsive) {
      window.addEventListener('resize', () => {
        this.setCanvasSize();
        this.createParticles();
      });
    }
  }
  
  setCanvasSize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;
  }
  
  createParticles() {
    // Clear existing particles
    this.particles = [];
    
    // Create new particles
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
        speedX: (Math.random() - 0.5) * this.options.speed,
        speedY: (Math.random() - 0.5) * this.options.speed,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }
  
  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.updateParticles();
    
    // Request next frame
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      // Move particle
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX = -particle.speedX;
      }
      
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY = -particle.speedY;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
      
      // Connect particles
      if (this.options.connectParticles) {
        this.connectParticles(particle, i);
      }
    }
  }
  
  connectParticles(particle, index) {
    for (let j = index + 1; j < this.particles.length; j++) {
      const particle2 = this.particles[j];
      
      // Calculate distance between particles
      const dx = particle.x - particle2.x;
      const dy = particle.y - particle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Connect particles if they are close enough
      if (distance < this.options.connectDistance) {
        const opacity = 1 - (distance / this.options.connectDistance);
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(particle2.x, particle2.y);
        this.ctx.strokeStyle = this.options.color;
        this.ctx.globalAlpha = opacity * 0.5;
        this.ctx.lineWidth = this.options.lineWidth;
        this.ctx.stroke();
      }
    }
  }
  
  destroy() {
    // Stop animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // Remove event listeners
    if (this.options.responsive) {
      window.removeEventListener('resize', this.setCanvasSize);
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Clear particles
    this.particles = [];
  }
}

// Initialize particles when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if particles container exists
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    particlesContainer.appendChild(canvas);
    
    // Initialize particles
    new Particles('#particles-canvas', {
      particleCount: 80,
      color: '#00c6ff',
      minSize: 1,
      maxSize: 3,
      speed: 0.3,
      connectParticles: true,
      connectDistance: 150,
      lineWidth: 0.5
    });
  }
});