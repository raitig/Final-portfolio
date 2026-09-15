import { useState, useEffect, useRef } from "react";
import profileImg from "./assets/profile.png";

/* ---------------- DATA ---------------- */
const ROLES = ["Python Developer", "Machine Learning Enthusiast", "Aspiring Machine Learning Engineer & Data Analyst"];

const SKILLS = [
  { name: "Python", level: 90 },
  { name: "Machine Learning", level: 85 },
  { name: "Data Visualization (Python)", level: 80 },
  { name: "Flask / Django", level: 75 },
  { name: "MySQL", level: 70 },
  { name: "HTML & CSS", level: 70 },
];

const MARQUEE = ["Python","Machine Learning","OpenCV","Pandas","NumPy","Scikit-learn","MySQL","Flask","Django","Data Visualization","Git & GitHub","Discord API"];

const EDUCATION = [
  { school: "Brainware University", degree: "Bachelor of Computer Applications (BCA)", years: "2023–2027" },
  { school: "Patiram High School", degree: "Higher Secondary Education (WBCHSE)",years: "2022" },
  { school: "Patiram High School", degree: "Secondary Education (WBBSE)", years: "2020" },
];

const CERTS = [
  "🏅 NPTEL — Database Management System",
  "🏅 NPTEL — Python for Data Science",
  "🏅 Value Added Course — Python for Data Visualization",
];

const PROJECTS = [
  { icon: "🧠", title: "AI Emotional Wellness Monitoring & Support System", featured: true,
    desc: "Major project — an AI-powered system that monitors the emotional well-being of caregivers of differently-abled children, analyzes behavior and emotional patterns, and delivers personalized support via a friendly web interface.",
    tags: ["Machine Learning", "Python", "Web Interface"],
    link: "https://github.com/raitig/Machine-Learning-/blob/main/Major_Project.ipynb" },
  { icon: "🖐️", title: "AI Hand Gesture Tracking",
    desc: "Real-time hand gesture recognition using computer vision — detects hand landmarks, tracks gestures and enables touchless control.",
    tags: ["OpenCV", "Computer Vision", "Python"],
    link: "https://github.com/raitig" /* TODO: replace with the repo link */ },
  { icon: "🏦", title: "Loan Default Prediction",
    desc: "Predicts loan default risk from historical customer data — EDA, feature engineering and multiple classification models compared for accuracy.",
    tags: ["ML", "Classification", "EDA"],
    link: "https://github.com/raitig/Machine-Learning-/blob/main/Loan.ipynb" },
  { icon: "🏥", title: "Health Prediction",
    desc: "ML model that predicts health conditions from patient data to support early detection.",
    tags: ["ML", "Healthcare"],
    link: "https://github.com/raitig/Machine-Learning-/blob/main/Health.ipynb" },
  { icon: "🎯", title: "Recommendation System",
    desc: "Recommendation engine using content-based and collaborative filtering, optimized for large datasets.",
    tags: ["ML", "Recommenders"],
    link: "https://github.com/raitig/Machine-Learning-/blob/main/recommendation__system.ipynb" },
  { icon: "🤖", title: "Discord Bot",
    desc: "Automates server management — custom commands, moderation features and real-time events via the Discord API.",
    tags: ["Python", "APIs", "Automation"],
    link: "https://github.com/raitig/Python/blob/main/DiscordBOT/main.py" },
  { icon: "🎮", title: "Snake, Water, Gun Game",
    desc: "The classic game rebuilt in Python — you vs the computer.",
    tags: ["Python", "Game"],
    link: "https://github.com/raitig/Python/blob/main/project%201/Main.py" },
  { icon: "🔢", title: "Number Guessing System",
    desc: "Guess the secret number with hints from the computer.",
    tags: ["Python", "Logic"],
    link: "https://github.com/raitig/Python/blob/main/project%202/main.py" },
];

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/raitig",
    svg: <svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg> },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/raitig-sarkar",
    svg: <svg viewBox="0 0 24 24"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.4H3.5V9h3.6zM22.2 0H1.8A1.8 1.8 0 0 0 0 1.7v20.6A1.8 1.8 0 0 0 1.8 24h20.4a1.8 1.8 0 0 0 1.8-1.7V1.7A1.8 1.8 0 0 0 22.2 0"/></svg> },
  { name: "X", url: "https://x.com/RaitigSarkar",
    svg: <svg viewBox="0 0 24 24"><path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2L6.6 3.3h-2.2z"/></svg> },
  { name: "Instagram", url: "https://www.instagram.com/exotic_raitig",
    svg: <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.2a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg> },
  { name: "Email", url: "mailto:raitigsarkar18@gmail.com",
    svg: <svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.7L3.4 6v12h17.2V6zM4.7 6l7.3 5.4L19.3 6z"/></svg> },
];

const RESUME = "/Raitig-Sarkar-Resume.pdf";

/* ---------------- HOOKS ---------------- */
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timer;
    if (!deleting && text.length < word.length) timer = setTimeout(() => setText(word.slice(0, text.length + 1)), 90);
    else if (!deleting) timer = setTimeout(() => setDeleting(true), 1600);
    else if (text.length > 0) timer = setTimeout(() => setText(word.slice(0, text.length - 1)), 45);
    else { setDeleting(false); setWordIndex((i) => i + 1); }
    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);
  return text;
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>{children}</div>;
}

/* ---------------- COMPONENTS ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Home", "About", "Skills", "Education", "Projects", "Contact"];
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#home" className="logo">R<span>.</span>S</a>
      <ul className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l) => <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a></li>)}
      </ul>
      <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="menu"><span /><span /><span /></button>
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  const [imgOk, setImgOk] = useState(true);
  return (
    <header className="hero" id="home">
      <div className="orb orb1" /><div className="orb orb2" />
      <div className="hero-text">
        <p className="hello">Hello, I'm</p>
        <h1>Raitig <span>Sarkar</span></h1>
        <div className="typed"><span>{typed}</span><span className="cursor">|</span></div>
        <p className="desc">BCA student. I build intelligent things with Python — ML models, computer vision, backend systems and automation bots.</p>
        <a href={RESUME} download="Raitig-Sarkar-Resume.pdf" className="btn btn-primary">📄 Download Resume</a>
        <a href="#projects" className="btn btn-outline">View Projects</a>
        <div className="socials">
          {SOCIALS.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>{s.svg}</a>)}
        </div>
      </div>
      <div className="hero-photo">
        <div className="photo-ring">
          {imgOk ? <img src={profileImg} alt="Raitig Sarkar" onError={() => setImgOk(false)} /> : <div className="photo-fallback">RS</div>}
        </div>
      </div>
    </header>
  );
}

function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t} ✦</span>)}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about">
      <h2 className="section-title"><Reveal>About <span>Me</span></Reveal></h2>
      <div className="about-grid">
        <Reveal>
          <p>I'm <b>Raitig Sarkar</b>, a passionate Computer Science student from Dinajpur, West Bengal, with a keen interest in <b>Machine Learning, AI and Data Analysis</b>.</p>
          <p>I enjoy building practical applications that solve real-world problems — AI wellness systems, gesture recognition, prediction models, recommendation engines and Discord bots.</p>
          <p>My goal is to grow as a <b>Machine Learning Engineer or Data Analyst</b>. Languages: Hindi · Bengali · English. 🚀</p>
        </Reveal>
        <Reveal className="stats">
          <div className="stat"><b>8+</b><br /><small>Projects</small></div>
          <div className="stat"><b>3</b><br /><small>Certifications</small></div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ background: "var(--bg2)" }}>
      <h2 className="section-title"><Reveal>My <span>Skills</span></Reveal></h2>
      <div className="skills-wrap">
        {SKILLS.map((s) => (
          <Reveal key={s.name} className="skill">
            <div className="skill-head"><span>{s.name}</span><span>{s.level}%</span></div>
            <div className="bar"><i style={{ "--w": `${s.level}%` }} /></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education">
      <h2 className="section-title"><Reveal>edu</Reveal></h2>
      <h2 className="section-title"><Reveal>Education & <span>Certifications</span></Reveal></h2>
      <div className="timeline">
        {EDUCATION.map((e) => (
          <Reveal key={e.degree} className="tl-item">
            <span className="years">{e.years}</span>
            <h3>{e.degree}</h3>
            <div className="tl-school">{e.school}</div>
            {e.detail && <p>{e.detail}</p>}
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="certs">
          {CERTS.map((c) => <div className="cert" key={c}>{c}</div>)}
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ background: "var(--bg2)" }}>
      <h2 className="section-title"><Reveal>My <span>Projects</span></Reveal></h2>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <Reveal key={p.title}>
            <div className={`card ${p.featured ? "featured" : ""}`}>
              <div className="icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <a className="link" href={p.link} target="_blank" rel="noreferrer">View on GitHub →</a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <h2 className="section-title"><Reveal>Get In <span>Touch</span></Reveal></h2>
      <Reveal>
        <div className="contact-box">
          <div style={{ fontSize: "2.5rem" }}>📬</div>
          <h3>Let's build something together</h3>
          <p>Open to internships, collaborations and ML projects.</p>
          <a href="mailto:raitigsarkar18@gmail.com" className="btn btn-primary">raitigsarkar18@gmail.com</a>
          <a href={RESUME} download="Raitig-Sarkar-Resume.pdf" className="btn btn-outline">📄 Resume</a>
          <div className="socials">
            {SOCIALS.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>{s.svg}</a>)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return <footer>Made with ❤️ by <b>Raitig Sarkar</b> · © 2025</footer>;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
