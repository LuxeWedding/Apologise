import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CONTACT_CONFIG, LOVE_CONFIG } from './config';
import './styles.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Yesterday', href: '#yesterday' },
  { label: 'Apology', href: '#apology' },
  { label: 'Love', href: '#love' },
  { label: 'Memories', href: '#memories' },
  { label: 'Call', href: '#call' }
];

function sanitizePhone(number) {
  return number.replace(/[^\d]/g, '');
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" onClick={closeMenu}>
        <span aria-hidden="true">♡</span>
        <span>{LOVE_CONFIG.girlfriendName}</span>
      </a>
      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          style={{
            '--x': `${(index * 17) % 100}%`,
            '--delay': `${(index % 9) * -1.4}s`,
            '--size': `${6 + (index % 4) * 3}px`
          }}
        />
      ))}
    </div>
  );
}

function MusicToggle() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = async () => {
      try {
        audio.volume = 0.8;
        await audio.play();
      } catch {
        // Browser autoplay policies may block audio until there is a user gesture.
      }
    };

    startMusic();
  }, []);

  return <audio ref={audioRef} src={LOVE_CONFIG.music.src} loop autoPlay preload="auto" />;
}

function Hero() {
  return (
    <section className="hero section" id="home">
      <Particles />
      <div className="hero-glow one" aria-hidden="true" />
      <div className="hero-glow two" aria-hidden="true" />
      <div className="section-inner hero-content" data-reveal>
        <p className="eyebrow">For {LOVE_CONFIG.girlfriendName}</p>
        <h1>{LOVE_CONFIG.heroTitle}</h1>
        <p className="hero-text">{LOVE_CONFIG.heroText}</p>
        <p className="soft-note">{LOVE_CONFIG.heroNote}</p>
        <div className="hero-actions">
          <a className="primary-button" href="#yesterday">
            Read My Heart <span aria-hidden="true">→</span>
          </a>
          <MusicToggle />
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function Yesterday() {
  const [better, setBetter] = useState(false);

  return (
    <section className="section yesterday-section" id="yesterday">
      <div className="section-inner two-column">
        <div data-reveal>
          <p className="eyebrow">Accountability</p>
          <h2>About Yesterday</h2>
          <p>{LOVE_CONFIG.yesterdayText}</p>
        </div>
        <div className="transform-card" data-reveal>
          <div className={better ? 'reflection-card after' : 'reflection-card before'}>
            <p className="card-label">{better ? 'What I Wish I Had Said' : 'What I Said / How I Behaved'}</p>
            <p>{better ? LOVE_CONFIG.betterVersion.after : LOVE_CONFIG.betterVersion.before}</p>
          </div>
          <button className="secondary-button" type="button" onClick={() => setBetter((value) => !value)}>
            {better ? 'Show The Honest Moment' : 'Show Me The Better Version'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Letter() {
  return (
    <section className="section letter-section" id="apology">
      <div className="section-inner narrow" data-reveal>
        <p className="eyebrow">From me to you</p>
        <h2>A Letter From Me To You</h2>
        <article className="letter-paper">
          {LOVE_CONFIG.letterParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="letter-close">I'm sorry. Truly.</p>
          <p className="signature">— Akash ♡</p>
        </article>
      </div>
    </section>
  );
}

function Reasons() {
  return (
    <section className="section love-section" id="love">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">A reminder</p>
          <h2>And Just So You Remember...</h2>
          <p>There are so many reasons you mean the world to me.</p>
        </div>
        <div className="reason-grid">
          {LOVE_CONFIG.reasonsILoveYou.map((reason, index) => (
            <article className="reason-card" key={reason} data-reveal style={{ '--delay': `${index * 45}ms` }}>
              <span className="reason-number">{String(index + 1).padStart(2, '0')}</span>
              <p>{reason}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Promises() {
  return (
    <section className="section promises-section">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">What I can change</p>
          <h2>What I Want To Do Better</h2>
        </div>
        <div className="promise-list" data-reveal>
          {LOVE_CONFIG.promises.map((promise) => (
            <div className="promise-item" key={promise}>
              <span aria-hidden="true">✓</span>
              <p>{promise}</p>
            </div>
          ))}
        </div>
        <p className="promise-note" data-reveal>
          I know promises mean nothing without actions. So I don't want this page to be just words. I want my
          behavior to prove them.
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section timeline-section" id="memories">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Our little story</p>
          <h2>Our Little Story</h2>
        </div>
        <div className="timeline" data-reveal>
          {LOVE_CONFIG.memories.map((memory, index) => (
            <article className="timeline-item" key={memory.title}>
              <span className="timeline-dot" aria-hidden="true" />
              <small>{String(index + 1).padStart(2, '0')}</small>
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryImage({ item, onOpen }) {
  const [failed, setFailed] = useState(false);

  return (
    <button className="gallery-card" type="button" onClick={() => onOpen(item)} aria-label={`Open ${item.caption}`}>
      {failed ? (
        <div className="photo-placeholder">
          <span aria-hidden="true">♡</span>
        </div>
      ) : (
        <img src={item.src} alt={item.alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </button>
  );
}

function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  return (
    <section className="section gallery-section">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Our story</p>
          <h2>Portfolio</h2>
        </div>
        <div className="gallery-grid" data-reveal>
          {LOVE_CONFIG.gallery.map((item) => (
            <GalleryImage item={item} key={item.src} onOpen={setActive} />
          ))}
        </div>
      </div>
      {active && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActive(null)}>
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.caption} onMouseDown={(e) => e.stopPropagation()}>
            <button className="icon-button close-button" type="button" aria-label="Close photo" onClick={() => setActive(null)}>
              ×
            </button>
            <img src={active.src} alt={active.alt} onError={(event) => event.currentTarget.classList.add('is-hidden')} />
            <p>{active.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function SmileBox() {
  const [message, setMessage] = useState(LOVE_CONFIG.smileMessages[0]);
  const [index, setIndex] = useState(0);

  const nextMessage = () => {
    const next = (index + Math.floor(Math.random() * (LOVE_CONFIG.smileMessages.length - 1)) + 1) % LOVE_CONFIG.smileMessages.length;
    setIndex(next);
    setMessage(LOVE_CONFIG.smileMessages[next]);
  };

  return (
    <section className="section smile-section">
      <div className="section-inner narrow center" data-reveal>
        <p className="eyebrow">Whenever you need it</p>
        <h2>Reasons To Smile</h2>
        <div className="smile-box" aria-live="polite">
          <p>{message}</p>
        </div>
        <button className="primary-button" type="button" onClick={nextMessage}>
          Click Whenever You Need A Smile ♡
        </button>
      </div>
    </section>
  );
}

function CallSection() {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const phone = sanitizePhone(CONTACT_CONFIG.phone);
  const whatsapp = sanitizePhone(CONTACT_CONFIG.whatsapp);
  const whatsappText = encodeURIComponent("I'd like to talk.");
  const hasWhatsapp = whatsapp && whatsapp !== 'YOURWHATSAPPNUMBER';
  const hasPhone = phone && phone !== 'YOURPHONENUMBER';

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <section className="section call-section" id="call">
      <div className="section-inner narrow center" data-reveal>
        <p className="eyebrow">When you are comfortable</p>
        <h2>Can I Have A Little Bit Of Your Time?</h2>
        <p>
          I don't want to hide behind a website. I want to hear your voice, listen to you, and talk about everything
          properly.
        </p>
        <button className="call-button" type="button" onClick={() => setOpen(true)}>
          <span aria-hidden="true">☎</span> Can We Have A Call?
        </button>
      </div>
      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div className="call-modal" role="dialog" aria-modal="true" aria-labelledby="call-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="icon-button close-button" type="button" aria-label="Close request" onClick={() => setOpen(false)}>
              ×
            </button>
            {accepted ? (
              <div className="accepted-message">
                <h3>Thank you ♡</h3>
                <p>I'll be waiting for your call.</p>
                <div className="contact-actions">
                  {hasPhone && <a className="primary-button" href={`tel:${phone}`}>Call Now</a>}
                  {hasWhatsapp && (
                    <a className="secondary-button" href={`https://wa.me/${whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <>
                <h3 id="call-title">A Small Call Request ♡</h3>
                <p>
                  I'd really like to talk to you. Not to argue, not to prove who's right, and not to make excuses. I just
                  want to listen, apologize properly, and talk to you.
                </p>
                <div className="modal-actions">
                  <button className="primary-button" type="button" onClick={() => setAccepted(true)}>
                    Yes, Let's Talk ♡
                  </button>
                  <button className="secondary-button" type="button" onClick={() => setOpen(false)}>
                    Maybe Later
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function FinalSection() {
  const [celebrating, setCelebrating] = useState(false);

  const celebrate = () => {
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 2800);
  };

  return (
    <section className="section final-section">
      {celebrating && (
        <div className="heart-burst" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, index) => (
            <span key={index} style={{ '--angle': `${index * 14}deg`, '--distance': `${90 + (index % 6) * 16}px` }}>
              ♡
            </span>
          ))}
        </div>
      )}
      <div className="section-inner center" data-reveal>
        <p className="eyebrow">One last thing</p>
        <h2>One Last Thing...</h2>
        <p className="final-quote">
          I'm not asking you to forget yesterday.
          <br />
          I'm just want to talk Ishaaa.
        </p>
        <div className="final-heart" aria-hidden="true">♡</div>
        <h3>I'm Sorry ♡</h3>
        <p className="love-line">I Love You.</p>
        <button className="primary-button" type="button" onClick={celebrate}>
          Please Forgive Me ♡
        </button>
      </div>
    </section>
  );
}

function EasterEggs() {
  const [secretOpen, setSecretOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [visited, setVisited] = useState(new Set());

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.length !== 1) return;
      setTyped((value) => (value + event.key.toLowerCase()).slice(-5));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (typed === 'sorry') {
      setSecretOpen(true);
    }
  }, [typed]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisited((current) => new Set([...current, entry.target.id]));
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button className="secret-heart" type="button" aria-label="Open a secret message" onClick={() => setSecretOpen(true)}>
        ♡
      </button>
      {visited.size >= 5 && <div className="visited-note">Thank you for reading this far.</div>}
      {secretOpen && (
        <div className="secret-message" role="status">
          <button type="button" aria-label="Close secret message" onClick={() => setSecretOpen(false)}>
            ×
          </button>
          <p>No hidden pressure. Just a hidden truth: you matter to me.</p>
        </div>
      )}
    </>
  );
}

function App() {
  useRevealOnScroll();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Yesterday />
        <Letter />
        <Reasons />
        <Promises />
        <Timeline />
        <Gallery />
        <SmileBox />
        <CallSection />
        <FinalSection />
      </main>
      <footer className="site-footer">
        <p>
          Made by {LOVE_CONFIG.yourName} for {LOVE_CONFIG.girlfriendName} · {year}
        </p>
      </footer>
      <EasterEggs />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
