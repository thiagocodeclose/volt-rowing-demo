// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --vl-bg: #0A1628;
    --vl-surface: #0E1E36;
    --vl-card: #12243E;
    --vl-primary: #00D4FF;
    --vl-primary-dark: #00A8CC;
    --vl-accent: #7FFFFF;
    --vl-text: #E8F4FF;
    --vl-muted: rgba(232,244,255,0.5);
    --vl-border: rgba(0,212,255,0.12);
    --font-display: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
    --font-body: var(--font-inter), 'Inter', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--vl-bg); color: var(--vl-text); overflow-x: hidden; }

  /* NAV */
  .vl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem; height: 64px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .vl-nav.scrolled {
    background: rgba(10,22,40,0.97);
    box-shadow: 0 1px 24px rgba(0,0,0,0.5);
    backdrop-filter: blur(12px);
  }
  .vl-nav-logo {
    font-family: var(--font-display);
    font-size: 1.8rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--vl-text); text-decoration: none;
  }
  .vl-nav-logo span { color: var(--vl-primary); }
  .vl-nav-links { display: flex; gap: 2rem; align-items: center; }
  .vl-nav-links a {
    font-size: 0.85rem; font-weight: 500; letter-spacing: 0.04em;
    color: var(--vl-muted); text-decoration: none; transition: color 0.2s;
  }
  .vl-nav-links a:hover { color: var(--vl-primary); }
  .vl-btn-nav {
    background: var(--vl-primary); color: #0A1628;
    padding: 0.5rem 1.4rem; border-radius: 2px;
    font-size: 0.82rem; font-weight: 700; letter-spacing: 0.06em;
    text-decoration: none; transition: background 0.2s;
  }
  .vl-btn-nav:hover { background: var(--vl-accent); }

  /* ===== INSET/CARD HERO ===== */
  .vl-hero {
    min-height: 100vh; position: relative;
    display: flex; align-items: center; overflow: hidden;
  }
  .vl-hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&q=80');
    background-size: cover; background-position: center;
    filter: brightness(0.18) saturate(0.5);
  }
  .vl-hero-bg-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(10,22,40,0.6) 0%, rgba(0,212,255,0.06) 100%);
  }
  .vl-hero-inner {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto; padding: 8rem 3rem 5rem;
    display: grid; grid-template-columns: 1fr 420px; gap: 5rem; align-items: center;
  }
  .vl-hero-copy {}
  .vl-hero-tag {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--vl-primary); margin-bottom: 1.5rem;
  }
  .vl-hero-tag-line { width: 20px; height: 1.5px; background: var(--vl-primary); }
  .vl-hero-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 5.5vw, 6.5rem);
    font-weight: 700; line-height: 0.95; letter-spacing: -0.02em;
    color: var(--vl-text); margin-bottom: 1.5rem;
  }
  .vl-hero-title em { font-style: normal; color: var(--vl-primary); }
  .vl-hero-sub { font-size: 1rem; line-height: 1.75; color: var(--vl-muted); max-width: 420px; margin-bottom: 2.5rem; }
  .vl-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 3rem; }
  .vl-btn-primary {
    background: var(--vl-primary); color: #0A1628;
    padding: 0.9rem 2rem;
    font-weight: 700; font-size: 0.9rem; letter-spacing: 0.06em;
    text-decoration: none; transition: background 0.2s, transform 0.2s;
  }
  .vl-btn-primary:hover { background: var(--vl-accent); transform: translateY(-2px); }
  .vl-btn-ghost {
    border: 1.5px solid rgba(232,244,255,0.15); color: var(--vl-muted);
    padding: 0.9rem 2rem;
    font-weight: 500; font-size: 0.9rem; letter-spacing: 0.04em;
    text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  .vl-btn-ghost:hover { border-color: var(--vl-primary); color: var(--vl-primary); }

  /* Stats below copy */
  .vl-hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; padding-top: 2rem; border-top: 1px solid rgba(232,244,255,0.07); }
  .vl-hs-value { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--vl-primary); margin-bottom: 0.2rem; }
  .vl-hs-label { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vl-muted); }

  /* INSET VIDEO CARD — Volt style */
  .vl-video-card {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(0,212,255,0.15), 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.06);
    aspect-ratio: 9/16;
    max-height: 540px;
    position: relative;
    background: var(--vl-card);
  }
  .vl-video-card video { width: 100%; height: 100%; object-fit: cover; display: block; }
  .vl-video-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 40%);
  }
  .vl-video-card-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; padding: 1.25rem 1.5rem;
  }
  .vl-video-card-label {
    display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;
  }
  .vl-video-card-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--vl-primary);
    box-shadow: 0 0 6px var(--vl-primary);
    animation: vl-pulse 2s infinite;
  }
  @keyframes vl-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .vl-video-card-name {
    font-family: var(--font-display);
    font-size: 0.9rem; font-weight: 600; letter-spacing: 0.06em;
    color: var(--vl-primary);
  }
  .vl-video-card-sub {
    font-size: 0.75rem; color: rgba(232,244,255,0.55); letter-spacing: 0.04em;
  }
  /* Cyan glow border effect */
  .vl-video-card::before {
    content: ''; position: absolute; inset: 0; border-radius: 6px;
    border: 1.5px solid rgba(0,212,255,0.25); pointer-events: none; z-index: 2;
  }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .vl-section-tag {
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--vl-primary); margin-bottom: 0.5rem; display: inline-block;
  }
  .vl-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 3.8rem);
    font-weight: 700; letter-spacing: -0.02em; line-height: 1;
    color: var(--vl-text); margin-bottom: 1rem;
  }
  .vl-section-sub { font-size: 1rem; line-height: 1.75; color: var(--vl-muted); max-width: 520px; }

  /* PILLARS */
  .vl-pillars-section { background: var(--vl-surface); }
  .vl-pillars-inner { max-width: 1200px; margin: 0 auto; }
  .vl-pillars-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem; }
  .vl-pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--vl-border); border: 1px solid var(--vl-border); }
  .vl-pillar-cell { background: var(--vl-card); padding: 2.5rem 1.75rem; transition: background 0.2s; }
  .vl-pillar-cell:hover { background: #162A46; }
  .vl-pillar-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .vl-pillar-name {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 700; letter-spacing: 0.02em;
    color: var(--vl-text); margin-bottom: 0.6rem;
  }
  .vl-pillar-desc { font-size: 0.88rem; line-height: 1.65; color: var(--vl-muted); }

  /* CLASSES */
  .vl-classes-section { background: var(--vl-bg); }
  .vl-classes-inner { max-width: 1200px; margin: 0 auto; }
  .vl-classes-header { margin-bottom: 3rem; }
  .vl-classes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--vl-border); border: 1px solid var(--vl-border); }
  .vl-class-cell { background: var(--vl-card); padding: 2rem; transition: background 0.2s; position: relative; overflow: hidden; }
  .vl-class-cell:hover { background: #14263E; }
  .vl-class-cell::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--vl-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
  }
  .vl-class-cell:hover::after { transform: scaleX(1); }
  .vl-class-badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  .vl-badge { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0.65rem; }
  .vl-badge-level { background: rgba(0,212,255,0.1); color: var(--vl-primary); }
  .vl-badge-dur { background: rgba(232,244,255,0.06); color: var(--vl-muted); }
  .vl-class-name {
    font-family: var(--font-display);
    font-size: 1.15rem; font-weight: 700; letter-spacing: 0.02em;
    color: var(--vl-text); margin-bottom: 0.75rem;
  }
  .vl-class-desc { font-size: 0.88rem; line-height: 1.65; color: var(--vl-muted); }

  /* PRICING */
  .vl-pricing-section { background: var(--vl-surface); }
  .vl-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .vl-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .vl-pricing-header .vl-section-sub { margin: 0 auto; }
  .vl-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--vl-border); border: 1px solid var(--vl-border); }
  .vl-price-card { background: var(--vl-card); padding: 2.5rem 2rem; position: relative; }
  .vl-price-card.highlight { background: #0B1E38; box-shadow: inset 0 0 0 1.5px rgba(0,212,255,0.25); }
  .vl-popular-badge {
    position: absolute; top: 0; left: 0; right: 0;
    background: var(--vl-primary);
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #0A1628; text-align: center; padding: 0.3rem;
  }
  .vl-price-name {
    font-family: var(--font-display);
    font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--vl-muted); margin-bottom: 0.75rem; margin-top: 0.5rem;
  }
  .vl-price-card.highlight .vl-price-name { margin-top: 2.2rem; }
  .vl-price-amount { font-family: var(--font-display); font-size: 3rem; font-weight: 700; color: var(--vl-primary); line-height: 1; margin-bottom: 0.2rem; }
  .vl-price-period { font-size: 0.8rem; color: var(--vl-muted); margin-bottom: 1.75rem; }
  .vl-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 2rem; }
  .vl-price-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.88rem; color: var(--vl-muted); }
  .vl-check { color: var(--vl-primary); flex-shrink: 0; font-weight: 700; }
  .vl-price-cta {
    display: block; text-align: center; padding: 0.9rem;
    font-weight: 700; font-size: 0.88rem; letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; transition: all 0.2s;
  }
  .vl-price-card.highlight .vl-price-cta { background: var(--vl-primary); color: #0A1628; }
  .vl-price-card.highlight .vl-price-cta:hover { background: var(--vl-accent); }
  .vl-price-card:not(.highlight) .vl-price-cta { border: 1px solid rgba(232,244,255,0.1); color: var(--vl-muted); }
  .vl-price-card:not(.highlight) .vl-price-cta:hover { border-color: var(--vl-primary); color: var(--vl-primary); }

  /* CTA */
  .vl-cta-section { background: var(--vl-bg); text-align: center; padding: 7rem 2rem; position: relative; overflow: hidden; }
  .vl-cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.07) 0%, transparent 100%);
  }
  .vl-cta-inner { max-width: 580px; margin: 0 auto; position: relative; }
  .vl-cta-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 6.5rem);
    font-weight: 700; letter-spacing: -0.02em; line-height: 0.95;
    color: var(--vl-text); margin-bottom: 1.25rem;
  }
  .vl-cta-title span { color: var(--vl-primary); }
  .vl-cta-sub { font-size: 1rem; color: var(--vl-muted); margin-bottom: 2.5rem; line-height: 1.75; }
  .vl-btn-cta {
    background: var(--vl-primary); color: #0A1628;
    padding: 1.1rem 3rem;
    font-weight: 700; font-size: 0.95rem; letter-spacing: 0.06em;
    text-decoration: none; display: inline-block;
    transition: background 0.2s, transform 0.2s;
  }
  .vl-btn-cta:hover { background: var(--vl-accent); transform: translateY(-2px); }

  /* FOOTER */
  .vl-footer { background: #060F1C; padding: 4rem 2rem 2rem; }
  .vl-footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
  .vl-footer-logo { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; letter-spacing: 0.05em; color: var(--vl-text); margin-bottom: 0.75rem; }
  .vl-footer-logo span { color: var(--vl-primary); }
  .vl-footer-desc { font-size: 0.88rem; line-height: 1.6; color: var(--vl-muted); max-width: 280px; }
  .vl-footer-h { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,244,255,0.22); margin-bottom: 1rem; }
  .vl-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .vl-footer-links a { color: var(--vl-muted); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .vl-footer-links a:hover { color: var(--vl-primary); }
  .vl-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem; border-top: 1px solid rgba(232,244,255,0.06);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.78rem; color: var(--vl-muted); flex-wrap: wrap; gap: 0.5rem;
  }
  .vl-footer-brand { color: var(--vl-primary); text-decoration: none; font-weight: 700; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .vl-hero-inner { grid-template-columns: 1fr; }
    .vl-video-card { max-height: 240px; aspect-ratio: 16/9; }
    .vl-hero-stats { grid-template-columns: repeat(2, 1fr); }
    .vl-pillars-grid { grid-template-columns: repeat(2, 1fr); }
    .vl-classes-grid { grid-template-columns: 1fr; }
    .vl-pricing-grid { grid-template-columns: 1fr; }
    .vl-footer-inner { grid-template-columns: 1fr; }
    .vl-nav-links { display: none; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function VoltPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className={`vl-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="vl-nav-logo"><span>VOLT</span> Rowing</a>
        <div className="vl-nav-links">
          <a href="#classes">Classes</a>
          <a href="#pillars">Method</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#first" className="vl-btn-nav">First Row Free</a>
        </div>
      </nav>

      {/* INSET/CARD HERO */}
      <section id="first" className="vl-hero">
        <div className="vl-hero-bg" />
        <div className="vl-hero-bg-overlay" />
        <div className="vl-hero-inner">
          <div className="vl-hero-copy">
            <div className="vl-hero-tag">
              <span data-cg-el="hero_eyebrow" className="vl-hero-tag-line" />
              Chicago, IL — Studio Row
            </div>
            <h1 data-cg-el="hero_headline_1" className="vl-hero-title">
              Row<br />Stronger.<br /><em>Row VOLT.</em>
            </h1>
            <p data-cg-el="hero_subtitle" className="vl-hero-sub">
              Data-driven erg training combined with full-body strength work. 24 machines, real-time split tracking, and coaches who know the difference between effort and output.
            </p>
            <div className="vl-hero-actions">
              <a data-cg-el="hero_cta_primary" href="#pricing" className="vl-btn-primary">First Row Free</a>
              <a data-cg-el="hero_cta_secondary" href="#classes" className="vl-btn-ghost">View Classes</a>
            </div>
            <div className="vl-hero-stats">
              {siteData.stats.map((s) => (
                <div key={s.label}>
                  <div className="vl-hs-value">{s.value}</div>
                  <div className="vl-hs-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* INSET VIDEO CARD */}
          <div className="vl-video-card">
            <video autoPlay muted loop playsInline
              poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-athlete-rowing-in-a-gym-machine-39988-large.mp4"
                type="video/mp4"
              />
            </video>
            <div className="vl-video-card-overlay" />
            <div className="vl-video-card-bottom">
              <div className="vl-video-card-label">
                <span className="vl-video-card-dot" />
                <span className="vl-video-card-name">Power Row</span>
              </div>
              <div className="vl-video-card-sub">50 min · All Levels · Erg + Floor</div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="vl-pillars-section">
        <div className="vl-pillars-inner">
          <div className="vl-pillars-header reveal">
            <div>
              <span className="vl-section-tag">The VOLT Method</span>
              <h2 className="vl-section-title">Four<br />Principles</h2>
            </div>
            <p className="vl-section-sub">
              We built VOLT on the belief that rowing is the most complete full-body workout available — and that most people have never been taught to do it properly.
            </p>
          </div>
          <div className="vl-pillars-grid">
            {siteData.pillars.map((p, i) => (
              <div key={p.name} className="vl-pillar-cell reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="vl-pillar-icon">{p.icon}</div>
                <div className="vl-pillar-name">{p.name}</div>
                <p className="vl-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="vl-classes-section">
        <div className="vl-classes-inner">
          <div className="vl-classes-header reveal">
            <span className="vl-section-tag">Class Formats</span>
            <h2 className="vl-section-title">Every Stroke<br />Counts</h2>
            <p className="vl-section-sub">
              Six class formats built for every experience level. Whether you&apos;re touching a Concept2 for the first time or chasing a new 2k PR — VOLT has a class for it.
            </p>
          </div>
          <div className="vl-classes-grid">
            {siteData.classes.map((c, i) => (
              <div key={c.name} className="vl-class-cell reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="vl-class-badges">
                  <span className="vl-badge vl-badge-level">{c.level}</span>
                  <span className="vl-badge vl-badge-dur">{c.duration}</span>
                </div>
                <div className="vl-class-name">{c.name}</div>
                <p className="vl-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="vl-pricing-section">
        <div className="vl-pricing-inner">
          <div className="vl-pricing-header reveal">
            <span className="vl-section-tag">Membership</span>
            <h2 className="vl-section-title">Train<br />With VOLT</h2>
            <p className="vl-section-sub">
              Your first class is free. No pressure — come in, feel the machine, and decide from there.
            </p>
          </div>
          <div className="vl-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div key={p.name} className={`vl-price-card reveal${p.highlight ? ' highlight' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {p.highlight && <span className="vl-popular-badge">Best Value</span>}
                <div className="vl-price-name">{p.name}</div>
                <div className="vl-price-amount">{p.price}</div>
                <div className="vl-price-period">{p.period}</div>
                <ul className="vl-price-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="vl-check">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#first" className="vl-price-cta">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vl-cta-section">
        <div className="vl-cta-inner">
          <h2 className="vl-cta-title reveal">
            Take the<br /><span>First Pull.</span>
          </h2>
          <p className="vl-cta-sub reveal">
            Book your free intro class. Bring nothing except willingness to learn — we&apos;ll handle the rest.
          </p>
          <a href="#first" className="vl-btn-cta reveal">Book Free Class</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="vl-footer">
        <div className="vl-footer-inner">
          <div>
            <div className="vl-footer-logo"><span>VOLT</span> Rowing</div>
            <p className="vl-footer-desc">
              {siteData.gym.address}<br />
              {siteData.gym.phone}<br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="vl-footer-h">Train</div>
            <ul className="vl-footer-links">
              <li><a href="#classes">Schedule</a></li>
              <li><a href="#pillars">Our Method</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Private Training</a></li>
            </ul>
          </div>
          <div>
            <div className="vl-footer-h">Studio</div>
            <ul className="vl-footer-links">
              <li><a href="#">First Visit</a></li>
              <li><a href="#">Our Coaches</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="vl-footer-bottom">
          <span>© {new Date().getFullYear()} VOLT Rowing. All rights reserved.</span>
          <span>Powered by <a href="https://koriva.com" className="vl-footer-brand">Koriva</a></span>
        </div>
      </footer>
    </>
  );
}
