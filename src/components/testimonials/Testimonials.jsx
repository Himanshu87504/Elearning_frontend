import React, { useState } from "react";
import "./testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Arjun Mehta",
    position: "Web Developer",
    message:
      "This platform completely changed how I approach learning. The structured courses and real-world projects gave me the confidence to land my first dev job.",
    initials: "AM",
    color: "purple",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Data Analyst",
    message:
      "I've tried many platforms but nothing comes close. The instructors explain concepts so clearly, and the quizzes keep me engaged throughout.",
    initials: "PS",
    color: "teal",
  },
  {
    id: 3,
    name: "Rahul Verma",
    position: "UI/UX Designer",
    message:
      "Finished three courses in two months and already applied the skills at work. The community support and feedback loops are genuinely world-class.",
    initials: "RV",
    color: "coral",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    position: "ML Engineer",
    message:
      "The AI course here is the most practical I've found online. Hands-on notebooks, clear theory, and instructors who actually respond to questions.",
    initials: "SI",
    color: "purple",
  },
];

const stars = (n = 5) =>
  Array.from({ length: n }, (_, i) => (
    <svg key={i} className="t-star" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l1.9 3.9L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.1-.7z" />
    </svg>
  ));

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonialsData.length) % testimonialsData.length);
  const next = () => setActive((a) => (a + 1) % testimonialsData.length);

  return (
    <section className="testimonials">
      <div className="t-header">
        <span className="t-pill">Testimonials</span>
        <h2 className="t-title">Loved by <em>learners</em></h2>
        <p className="t-sub">Real stories from students who transformed their careers.</p>
      </div>

      {/* Desktop grid */}
      <div className="t-grid">
        {testimonialsData.map((t, i) => (
          <div className={`t-card t-card--${t.color}`} key={t.id}>
            <div className="t-stars">{stars()}</div>
            <p className="t-message">"{t.message}"</p>
            <div className="t-footer">
              <div className={`t-avatar t-avatar--${t.color}`}>{t.initials}</div>
              <div>
                <p className="t-name">{t.name}</p>
                <p className="t-pos">{t.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="t-carousel">
        <div className="t-carousel-track" style={{ transform: `translateX(calc(-${active * 100}% - ${active * 16}px))` }}>
          {testimonialsData.map((t) => (
            <div className={`t-card t-card--${t.color} t-card--slide`} key={t.id}>
              <div className="t-stars">{stars()}</div>
              <p className="t-message">"{t.message}"</p>
              <div className="t-footer">
                <div className={`t-avatar t-avatar--${t.color}`}>{t.initials}</div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-pos">{t.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="t-dots">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              className={`t-dot${i === active ? " t-dot--active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="t-arrows">
          <button className="t-arrow" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 15l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="t-arrow" onClick={next} aria-label="Next">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
