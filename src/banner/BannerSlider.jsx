import React, { useEffect, useRef, useState } from "react";

export default function BannerSlider({ items = [], height = 150 }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf;
    const speed = 0.5;

    const animate = () => {
      if (!paused) {
        el.scrollLeft += speed;

        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = 0;
        }
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  if (!items.length) return null;

  return (
    <>
      <div
        className="bannerWrap"
        style={{ ["--bh"]: `${height}px` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="bannerTrack" ref={trackRef}>
          {items.map((b, i) => (
            <a
              key={i}
              href={b.href}
              target="_blank"
              rel="noreferrer"
              className="bannerCard"
            >
              <img
                src={b.imageUrl}
                alt="banner"
                className="bannerImg"
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        

        .bannerTrack{
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .bannerTrack::-webkit-scrollbar{
          display:none;
        }

        .bannerCard{
          flex: 0 0 auto;
          width: min(420px, 82vw);
          height: var(--bh);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 10px 28px rgba(0,0,0,0.22);
        }

        .bannerImg{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }

        @media (max-width:600px){
          .bannerCard{
            width:88vw;
          }
        }
      `}</style>
    </>
  );
}