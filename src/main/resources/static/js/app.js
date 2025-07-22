const sections = {
  home: `
    <section>
      <h2>Welcome!</h2>
      <p>This is my personal portfolio showcasing my skills and projects.</p>
    </section>
  `,
  skills: `
    <section>
      <h2>Technical Skills</h2>
      <ul>
        <li><strong>Backend:</strong> Java, Spring Boot, Hibernate, JPA</li>
        <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
        <li><strong>Database:</strong> MySQL, MongoDB</li>
        <li><strong>Tools:</strong> Git, Postman, Eclipse, STS</li>
      </ul>
    </section>
  `,
  projects: `
    <section>
      <h2>Projects</h2>
      <ul>
        <li><strong>Netflix Clone</strong> – ReactJS + TMDB API</li>
        <li><strong>To-Do App</strong> – MERN Stack CRUD App</li>
        <li><strong>Vehicle CRUD</strong> – Java + Hibernate</li>
        <li><strong>Movie Booking</strong> – Spring Boot + Thymeleaf</li>
      </ul>
    </section>
  `,
  contact: `
    <section>
      <h2>Contact Me</h2>
      <form onsubmit="return sendMessage(this)">
        <label>Name:</label>
        <input type="text" name="name" required />
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Message:</label>
        <textarea name="message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  `
};

function loadSection(section) {
  document.getElementById('main-content').innerHTML = sections[section] || sections.home;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function sendMessage(form) {
  const name = form.name.value;
  alert(`Thanks, ${name}! Your message has been sent.`);
  loadSection('home');
  return false;
}

window.onload = () => {
  loadSection('home');
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
};
