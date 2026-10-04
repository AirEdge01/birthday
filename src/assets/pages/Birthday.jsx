import React, { useState, useRef, useEffect } from "react";
import birthday1Img from "../birthday1.jpg";
import birthday2Img from "../birthday2.jpg";
import birthday3Img from "../birthday3.jpg";
import birthday4Img from "../birthday4.jpg";
import birthday5Img from "../birthday5.jpg";

const CelebrationPage = () => {
    const [revealed, setRevealed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [lightbox, setLightbox] = useState(null);
    const [heroSlide, setHeroSlide] = useState(0);
    const [confetti, setConfetti] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const audioRef = useRef(null);
    const touchStartX = useRef(0);

    const data = {
        name: "Adeola",
        tag: "In Her Honor",
        line: "Some bonds aren't written in blood, she's the daughter my heart chose for itself.",
        letter: `Adeola,

I've watched you grow into someone genuinely remarkable, sharp, kind, and quietly strong in ways most people never notice. Friendship like ours isn't common, and I don't take it for granted.

Today is yours. Every bit of it. Here's to the version of you that keeps showing up, keeps shining, and keeps making the people around you better just by being in the room.

Happy birthday. I'm proud of you.`,
        music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        editorialStrip: [
            "ADEOLA",
            "IN HER HONOR",
            "CHAPTER NO. 2026",
            "QUIET STRENGTH & GRACE",
            "RADIANT & UNSTOPPABLE",
        ],
        photos: [
            { url: birthday1Img, title: "PORTRAIT I", caption: "Grace in every step" },
            { url: birthday2Img, title: "PORTRAIT II", caption: "A presence that lights up the room" },
            { url: birthday3Img, title: "PORTRAIT III", caption: "Quiet strength & timeless elegance" },
            { url: birthday4Img, title: "PORTRAIT IV", caption: "Moments worth treasuring forever" },
            { url: birthday5Img, title: "PORTRAIT V", caption: "Pure joy, beautiful soul" },
        ],
        highlights: [
            { num: "01", title: "Unwavering Loyalty", desc: "The kind of friend who shows up, every single time, without being asked." },
            { num: "02", title: "Quiet Resilience", desc: "Carries weight most people never see, and still finds room to smile." },
            { num: "03", title: "Radiant Warmth", desc: "Makes every room a little brighter just by walking into it." },
        ],
    };

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 120);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (lightbox !== null) return;
        const timer = setInterval(() => {
            setHeroSlide((prev) => (prev + 1) % data.photos.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [lightbox, data.photos.length]);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        playing ? audioRef.current.pause() : audioRef.current.play().catch(() => { });
        setPlaying(!playing);
    };

    const nextHero = () => setHeroSlide((p) => (p + 1) % data.photos.length);
    const prevHero = () => setHeroSlide((p) => (p - 1 + data.photos.length) % data.photos.length);

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (deltaX > 50) prevHero();
        if (deltaX < -50) nextHero();
    };

    const handleOpenSeal = () => {
        setRevealed(true);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2600);
    };

    return (
        <div className="ev-editorial-page">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg-canvas: #f6f3ec;
          --bg-card: #fffdf8;
          --forest-dark: #22301c;
          --forest-mid: #2f4425;
          --forest-soft: #4c5a41;
          --brass-gold: #b08d47;
          --brass-light: rgba(176, 141, 71, 0.2);
          --text-muted: #7c7664;
          --border-subtle: rgba(38, 51, 31, 0.12);
          --font-heading: 'Fraunces', serif;
          --font-sans: 'Jost', sans-serif;
        }

        html, body { width: 100%; min-height: 100vh; background-color: var(--bg-canvas); color: var(--forest-dark); overflow-x: hidden; font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }

        .ev-editorial-page { min-height: 100vh; width: 100%; background: var(--bg-canvas); display: flex; flex-direction: column; align-items: center; position: relative; padding-bottom: 60px; }

        /* Top Bar, floats over hero */
        .ev-top-nav {
          position: absolute; top: 0; left: 0; right: 0; z-index: 20;
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(18px, 3vw, 28px) clamp(20px, 5vw, 56px);
        }
        .ev-brand-mark { font-family: var(--font-heading); font-weight: 600; font-size: 1rem; letter-spacing: 1px; color: #f6f3ec; text-shadow: 0 2px 10px rgba(0,0,0,0.4); }
        .ev-audio-btn {
          display: flex; align-items: center; gap: 9px;
          border: 1px solid rgba(246,243,236,0.5); color: #f6f3ec;
          padding: 7px 16px; border-radius: 3px; font-size: 0.68rem; letter-spacing: 1.6px; text-transform: uppercase;
          cursor: pointer; background: rgba(34,48,28,0.3); backdrop-filter: blur(6px); transition: all 0.3s ease;
        }
        .ev-audio-btn:hover { background: var(--brass-gold); border-color: var(--brass-gold); color: #22301c; }
        .ev-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brass-gold); }
        .ev-dot.on { animation: evPulse 1s ease-in-out infinite; }
        @keyframes evPulse { 0%,100% { opacity:.35 } 50% { opacity:1 } }

        /* FULL-PAGE HERO CAROUSEL */
        .ev-hero {
          position: relative; width: 100%; height: 100vh; min-height: 560px;
          overflow: hidden; display: flex; align-items: flex-end;
        }
        .ev-hero-slide {
          position: absolute; inset: 0; opacity: 0;
          transition: opacity 1.4s ease, transform 6s ease;
          transform: scale(1.08);
        }
        .ev-hero-slide.active { opacity: 1; transform: scale(1); }
        .ev-hero-slide img {
          width: 100%; height: 100%; object-fit: contain; object-position: center center;
          display: block; background: rgba(15, 17, 13, 0.18);
        }
        .ev-hero-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(20,24,16,0.35) 0%, rgba(20,24,16,0.2) 35%, rgba(20,24,16,0.85) 100%);
        }

        .ev-hero-content {
          position: relative; z-index: 5; width: 100%;
          padding: 0 clamp(20px, 6vw, 70px) clamp(60px, 9vh, 100px);
          text-align: center; color: #f6f3ec;
        }
        .ev-hero-content > * { opacity: 0; transform: translateY(26px); }
        .ev-hero-content.loaded .ev-h-tag { animation: evSlideUp 0.9s ease forwards 0.15s; }
        .ev-hero-content.loaded .ev-h-title { animation: evSlideUp 1s ease forwards 0.35s; }
        .ev-hero-content.loaded .ev-h-rule { animation: evSlideUp 0.8s ease forwards 0.6s; }
        .ev-hero-content.loaded .ev-h-line { animation: evSlideUp 0.9s ease forwards 0.75s; }
        .ev-hero-content.loaded .ev-h-warm { animation: evSlideUp 0.9s ease forwards 0.95s; }
        .ev-hero-content.loaded .ev-h-controls { animation: evSlideUp 0.9s ease forwards 1.15s; }
        @keyframes evSlideUp { to { opacity: 1; transform: translateY(0); } }

        .ev-h-tag { font-size: 0.72rem; letter-spacing: 4px; text-transform: uppercase; color: #e3cb96; margin-bottom: 14px; }
        .ev-h-title { font-family: var(--font-heading); font-weight: 600; font-size: clamp(3.4rem, 13vw, 8rem); line-height: 0.92; text-shadow: 0 10px 40px rgba(0,0,0,0.4); }
        .ev-h-rule { width: 52px; height: 1px; background: var(--brass-gold); margin: 22px auto; }
        .ev-h-line { font-family: var(--font-heading); font-style: italic; font-size: clamp(1rem, 2.1vw, 1.3rem); max-width: 560px; margin: 0 auto 16px; line-height: 1.7; color: #ece7da; }
        .ev-h-warm { font-size: clamp(1.1rem, 2.6vw, 1.7rem); font-family: var(--font-heading); font-weight: 500; color: #f6f3ec; margin-bottom: clamp(28px, 5vh, 44px); }
        .ev-h-warm span { color: var(--brass-gold); }

        .ev-h-controls { display: flex; align-items: center; justify-content: center; gap: clamp(16px, 3vw, 30px); }
        .ev-h-arrow {
          width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(246,243,236,0.4);
          background: rgba(246,243,236,0.08); color: #f6f3ec; display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; cursor: pointer; backdrop-filter: blur(6px); transition: all 0.3s ease; flex-shrink: 0;
        }
        .ev-h-arrow:hover { background: var(--brass-gold); border-color: var(--brass-gold); color: #22301c; }
        .ev-h-dots { display: flex; gap: 8px; }
        .ev-h-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(246,243,236,0.4); cursor: pointer; transition: all 0.3s ease; }
        .ev-h-dot.active { width: 24px; border-radius: 6px; background: var(--brass-gold); }

        .ev-scroll-cue {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%); z-index: 5;
          font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(246,243,236,0.75);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .ev-scroll-cue::after {
          content: ""; width: 1px; height: 26px; background: rgba(246,243,236,0.5);
          animation: evScrollCue 1.6s ease-in-out infinite;
        }
        @keyframes evScrollCue { 0%,100% { transform: scaleY(0.4); opacity: .4; } 50% { transform: scaleY(1); opacity: 1; } }

        /* Ticker Strip */
        .ev-ticker-wrap { width: 100vw; overflow: hidden; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 12px 0; margin-bottom: clamp(40px, 7vh, 80px); background: rgba(176, 141, 71, 0.06); white-space: nowrap; }
        .ev-ticker-track { display: inline-block; animation: evTicker 30s linear infinite; }
        .ev-ticker-item { font-size: 0.68rem; letter-spacing: 4px; text-transform: uppercase; color: var(--forest-mid); margin: 0 32px; font-weight: 500; }
        @keyframes evTicker { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }

        /* Photo Gallery Section */
        .ev-gallery-section { width: 100%; max-width: 980px; padding: 0 20px; margin-bottom: clamp(60px, 9vh, 90px); }
        .ev-section-label { font-size: 0.7rem; letter-spacing: 3.5px; text-transform: uppercase; color: var(--brass-gold); margin-bottom: 8px; font-weight: 500; text-align: center; }
        .ev-section-heading { font-family: var(--font-heading); font-style: italic; font-weight: 500; font-size: clamp(1.4rem, 3vw, 1.9rem); text-align: center; color: var(--forest-dark); margin-bottom: clamp(28px, 5vh, 44px); }

        .ev-gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: clamp(12px, 2vw, 18px); }
        .ev-g-tile { position: relative; border-radius: 6px; overflow: hidden; cursor: pointer; aspect-ratio: 4/5; border: 1px solid var(--border-subtle); animation: evFade 0.7s ease both; }
        .ev-g-tile img {
          width: 100%; height: 100%; object-fit: cover; object-position: center top;
          display: block; transition: transform 0.6s ease;
        }
        .ev-g-tile:hover img { transform: scale(1.08); }
        .ev-g-tile-cap {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 14px 12px;
          background: linear-gradient(to top, rgba(34,48,28,0.88), transparent); color: #f6f3ec; font-family: var(--font-heading); font-style: italic; font-size: 0.88rem;
        }
        @keyframes evFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

        /* Highlights */
        .ev-highlights-section { width: 100%; max-width: 860px; padding: 0 20px; margin-bottom: clamp(60px, 9vh, 90px); }
        .ev-highlights-title { font-family: var(--font-heading); font-weight: 500; font-style: italic; font-size: clamp(1.4rem, 3vw, 1.9rem); text-align: center; color: var(--forest-dark); margin-bottom: clamp(32px, 5vh, 48px); }
        .ev-highlights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: clamp(20px, 3vw, 32px); }
        .ev-highlight-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; padding: clamp(24px, 3vw, 32px) clamp(20px, 3vw, 26px); animation: evFade 0.8s ease both; transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .ev-highlight-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(38, 51, 31, 0.1); }
        .ev-highlight-num { font-family: var(--font-heading); font-size: clamp(2.2rem, 4vw, 2.8rem); color: var(--brass-light); line-height: 1; margin-bottom: 10px; font-weight: 600; }
        .ev-highlight-card h3 { font-family: var(--font-heading); font-size: clamp(1.05rem, 2vw, 1.2rem); font-weight: 600; color: var(--forest-mid); margin-bottom: 8px; }
        .ev-highlight-card p { font-size: 0.86rem; line-height: 1.65; color: var(--forest-soft); }

        /* Letter / Envelope */
        .ev-envelope-section { width: 100%; max-width: 620px; padding: 0 20px; display: flex; flex-direction: column; align-items: center; position: relative; }
        .ev-letter-card { width: 100%; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; padding: clamp(32px, 5vw, 52px); box-shadow: 0 18px 50px rgba(38, 51, 31, 0.08); position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; overflow: hidden; }
        .ev-wax-seal { width: 62px; height: 62px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #c9a460, #93702e 75%); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.15rem; color: #fdf7ea; cursor: pointer; box-shadow: 0 8px 20px rgba(147, 112, 46, 0.35); transition: transform 0.3s ease; }
        .ev-wax-seal:hover { transform: scale(1.06) rotate(-3deg); }
        .ev-seal-hint { font-size: 0.68rem; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; margin-top: 14px; }
        .ev-letter-wrapper { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 1s ease, opacity 0.7s ease; text-align: left; width: 100%; }
        .ev-letter-wrapper.open { max-height: 900px; opacity: 1; margin-top: 22px; }
        .ev-letter-body { font-family: var(--font-heading); font-size: clamp(1.02rem, 2.2vw, 1.22rem); line-height: 1.85; color: #2e3a26; white-space: pre-line; border-left: 2px solid var(--brass-gold); padding-left: clamp(18px, 3vw, 28px); }

        .ev-confetti-piece { position: absolute; top: 42%; left: 50%; width: 7px; height: 10px; opacity: 0; pointer-events: none; border-radius: 1px; animation: evConfettiBurst 1.8s ease-out forwards; }
        @keyframes evConfettiBurst { 0% { opacity: 1; transform: translate(-50%, -50%) rotate(0deg) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--tr)) scale(0.6); } }

        /* Lightbox */
        .ev-modal-overlay { position: fixed; inset: 0; background: rgba(20, 24, 16, 0.92); display: flex; align-items: center; justify-content: center; z-index: 400; padding: 20px; animation: evLbFade 0.25s ease; }
        @keyframes evLbFade { from { opacity: 0; } to { opacity: 1; } }
        .ev-modal-overlay img { max-width: 100%; max-height: 80vh; border-radius: 4px; box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5); }
        .ev-modal-close { position: absolute; top: 24px; right: 28px; color: var(--bg-canvas); font-size: 1.6rem; cursor: pointer; opacity: 0.85; }

        .ev-footer-text { text-align: center; font-size: 0.66rem; letter-spacing: 2.5px; color: var(--text-muted); text-transform: uppercase; margin-top: clamp(20px, 4vh, 40px); padding-bottom: clamp(20px, 4vh, 40px); }

        @media (max-width: 600px) {
          .ev-hero { height: 100vh; min-height: 620px; }
          .ev-h-arrow { width: 36px; height: 36px; }
        }
      `}</style>

            {/* Top Bar */}
            <header className="ev-top-nav">
                <span className="ev-brand-mark">{data.name}</span>
                <button className="ev-audio-btn" onClick={toggleAudio}>
                    <span className={`ev-dot ${playing ? "on" : ""}`} />
                    {playing ? "Playing" : "Play Song"}
                </button>
                <audio ref={audioRef} src={data.music} loop />
            </header>

            {/* FULL HERO CAROUSEL */}
            <section className="ev-hero" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                {data.photos.map((item, i) => (
                    <div key={i} className={`ev-hero-slide ${i === heroSlide ? "active" : ""}`}>
                        <img src={item.url} alt={`${data.name} ${i + 1}`} />
                    </div>
                ))}
                <div className="ev-hero-scrim" />

                <div className={`ev-hero-content ${loaded ? "loaded" : ""}`}>
                    <div className="ev-h-tag">{data.tag}</div>
                    <h1 className="ev-h-title">{data.name}</h1>
                    <div className="ev-h-rule" />
                    <p className="ev-h-line">"{data.line}"</p>
                    <p className="ev-h-warm">Wishing you a birthday as <span>radiant</span> as you are 🎂</p>

                    <div className="ev-h-controls">
                        <div className="ev-h-arrow" onClick={prevHero}>‹</div>
                        <div className="ev-h-dots">
                            {data.photos.map((_, i) => (
                                <span key={i} className={`ev-h-dot ${i === heroSlide ? "active" : ""}`} onClick={() => setHeroSlide(i)} />
                            ))}
                        </div>
                        <div className="ev-h-arrow" onClick={nextHero}>›</div>
                    </div>
                </div>

                <div className="ev-scroll-cue">Scroll</div>
            </section>

            {/* Ticker Strip */}
            <div className="ev-ticker-wrap">
                <div className="ev-ticker-track">
                    {data.editorialStrip.concat(data.editorialStrip).map((item, idx) => (
                        <span key={idx} className="ev-ticker-item">✦ {item}</span>
                    ))}
                </div>
            </div>

            {/* Photo Gallery, separate browsable section */}
            <section className="ev-gallery-section">
                <div className="ev-section-label">Her Gallery</div>
                <h2 className="ev-section-heading">Moments Captured</h2>
                <div className="ev-gallery-grid">
                    {data.photos.map((item, i) => (
                        <div key={i} className="ev-g-tile" style={{ animationDelay: `${i * 0.1}s` }} onClick={() => setLightbox(i)}>
                            <img src={item.url} alt={item.title} />
                            <div className="ev-g-tile-cap">{item.caption}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Highlights */}
            <section className="ev-highlights-section">
                <h2 className="ev-highlights-title">Moments Worth Celebrating</h2>
                <div className="ev-highlights-grid">
                    {data.highlights.map((h, i) => (
                        <div key={i} className="ev-highlight-card" style={{ animationDelay: `${i * 0.12}s` }}>
                            <div className="ev-highlight-num">{h.num}</div>
                            <h3>{h.title}</h3>
                            <p>{h.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Envelope / Personal Note */}
            <section className="ev-envelope-section">
                <div className="ev-letter-card">
                    {confetti &&
                        [...Array(26)].map((_, i) => {
                            const angle = Math.random() * 360;
                            const dist = 90 + Math.random() * 140;
                            const tx = Math.cos((angle * Math.PI) / 180) * dist;
                            const ty = Math.sin((angle * Math.PI) / 180) * dist - 60;
                            return (
                                <span
                                    key={i}
                                    className="ev-confetti-piece"
                                    style={{
                                        "--tx": `${tx}px`,
                                        "--ty": `${ty}px`,
                                        "--tr": `${Math.random() * 360}deg`,
                                        background: i % 3 === 0 ? "#2f4425" : "#b08d47",
                                        animationDelay: `${Math.random() * 0.15}s`,
                                    }}
                                />
                            );
                        })}

                    {!revealed && (
                        <>
                            <div className="ev-wax-seal" onClick={handleOpenSeal}>A</div>
                            <p className="ev-seal-hint">Tap to open</p>
                        </>
                    )}

                    <div className={`ev-letter-wrapper ${revealed ? "open" : ""}`}>
                        <p className="ev-letter-body">{data.letter}</p>
                    </div>
                </div>
            </section>

            <footer className="ev-footer-text">A Private Celebration · {data.name}</footer>

            {/* Lightbox */}
            {lightbox !== null && (
                <div className="ev-modal-overlay" onClick={() => setLightbox(null)}>
                    <span className="ev-modal-close">&times;</span>
                    <img src={data.photos[lightbox].url} alt="" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
};

export default CelebrationPage;