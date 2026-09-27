import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultContent, validateContent } from './content';
import type { AppContent, Slide } from './types';

const STORAGE_KEY = 'fscc-kiosk-content';

const getOverviewPages = (slides: Slide[]) => slides.filter((slide) => slide.onOverview !== false);

function App() {
  const [content, setContent] = useState<AppContent>(defaultContent);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isOverview, setIsOverview] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [overviewPage, setOverviewPage] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);

  const overviewSlides = useMemo(() => getOverviewPages(content.slides), [content.slides]);
  const currentSlide = content.slides[activeSlideIndex] ?? content.slides[0];
  const currentDuration = currentSlide?.duration ?? content.settings.defaultDuration;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      const validated = validateContent(parsed);
      if (validated) {
        setContent(validated);
      }
    } catch {
      // ignore invalid persisted content and keep fallback
    }
  }, []);

  useEffect(() => {
    if (!isOverview && isPlaying) {
      const timer = window.setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.05 * playbackSpeed;

          if (next >= currentDuration) {
            setActiveSlideIndex((index) => {
              const nextIndex = (index + 1) % content.slides.length;
              return nextIndex;
            });
            setProgress(0);
            setTransitionKey((key) => key + 1);
            return 0;
          }

          return next;
        });
      }, 50);

      return () => window.clearInterval(timer);
    }
  }, [currentDuration, content.slides.length, isOverview, isPlaying, playbackSpeed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsPlaying((value) => !value);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextSlide();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPreviousSlide();
      }

      if (event.key === 'Escape' || event.key === 'Home') {
        event.preventDefault();
        setIsOverview(true);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setIsOverview(false);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOverview(true);
      }

      if (event.key === '1') setPlaybackSpeed(1);
      if (event.key === '2') setPlaybackSpeed(2);
      if (event.key === '3') setPlaybackSpeed(3);
      if (event.key === '4') setPlaybackSpeed(4);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const goToNextSlide = useCallback(() => {
    setActiveSlideIndex((index) => {
      const nextIndex = (index + 1) % content.slides.length;
      return nextIndex;
    });
    setProgress(0);
    setTransitionKey((key) => key + 1);
  }, [content.slides.length]);

  const goToPreviousSlide = useCallback(() => {
    setActiveSlideIndex((index) => {
      const prevIndex = (index - 1 + content.slides.length) % content.slides.length;
      return prevIndex;
    });
    setProgress(0);
    setTransitionKey((key) => key + 1);
  }, [content.slides.length]);

  const openSlide = useCallback((index: number) => {
    setActiveSlideIndex(index);
    setIsOverview(false);
    setProgress(0);
    setTransitionKey((key) => key + 1);
  }, []);

  const goToOverview = useCallback(() => {
    setIsOverview(true);
    setProgress(0);
    setPlaybackSpeed(1);
  }, []);

  const pageCount = Math.max(1, Math.ceil(overviewSlides.length / 3));
  const visibleSlides = overviewSlides.slice(overviewPage * 3, overviewPage * 3 + 3);

  useEffect(() => {
    if (overviewPage >= pageCount) {
      setOverviewPage(0);
    }
  }, [overviewPage, pageCount]);

  return (
    <div
      className="app-shell"
      style={
        {
          ['--accent' as string]: content.settings.accentColor,
          ['--bg' as string]: content.settings.backgroundColor,
        } as React.CSSProperties
      }
    >
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">FSCC</span>
          <div>
            <div className="eyebrow">Dynamic Church Kiosk</div>
            <div className="title-small">First Slavic Christian Church</div>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="ghost-button" onClick={goToOverview}>Overview</button>
          <button className="ghost-button" onClick={() => setIsPlaying((value) => !value)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </header>

      {isOverview ? (
        <main className="overview-page">
          <div className="overview-header">
            <div>
              <p className="eyebrow">FEATURED</p>
              <h1>{content.title}</h1>
            </div>
            <div className="pagination-cluster">
              <button
                className="pager-button"
                disabled={overviewPage === 0}
                onClick={() => setOverviewPage((page) => Math.max(page - 1, 0))}
              >
                Previous
              </button>
              <div className="pager-dots">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    className={`pager-dot ${overviewPage === index ? 'active' : ''}`}
                    aria-label={`Go to page ${index + 1}`}
                    onClick={() => setOverviewPage(index)}
                  />
                ))}
              </div>
              <button
                className="pager-button"
                disabled={overviewPage >= pageCount - 1}
                onClick={() => setOverviewPage((page) => Math.min(page + 1, pageCount - 1))}
              >
                Next
              </button>
            </div>
          </div>

          <div className="overview-grid">
            {visibleSlides.map((slide, idx) => (
              <button
                key={slide.id}
                className="overview-card"
                style={{
                  background:
                    slide.surface === 'accent'
                      ? 'linear-gradient(135deg, rgba(14,133,181,0.95), rgba(14,133,181,0.65))'
                      : slide.surface === 'light'
                        ? '#f4f4f4'
                        : slide.surface === 'dark'
                          ? '#1b1b1b'
                          : 'linear-gradient(135deg, rgba(24,24,24,0.9), rgba(14,133,181,0.28))',
                }}
                onClick={() => openSlide(content.slides.indexOf(slide))}
              >
                {slide.media?.[0] && (
                  <div className="overview-media">
                    {slide.media[0].type === 'image' ? (
                      <img src={slide.media[0].src} alt={slide.media[0].alt || slide.title} />
                    ) : (
                      <video src={slide.media[0].src} muted loop autoPlay playsInline />
                    )}
                  </div>
                )}
                <div className="overview-card-content">
                  <div className="overview-kicker">{slide.kind ?? 'announcement'}</div>
                  <h2>{slide.title}</h2>
                  {slide.subheading && <p>{slide.subheading}</p>}
                  <div className="tag-row">
                    {slide.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      ) : (
        <main className="slide-stage">
          <div key={transitionKey} className="slide-panel surface-${currentSlide.surface ?? 'automatic'}">
            <div className="media-layer">
              {currentSlide.media?.[0] && currentSlide.media[0].type === 'image' ? (
                <img src={currentSlide.media[0].src} alt={currentSlide.media[0].alt || currentSlide.title} />
              ) : currentSlide.media?.[0] ? (
                <video src={currentSlide.media[0].src} muted loop autoPlay playsInline />
              ) : null}
            </div>

            <div className="content-overlay">
              <div className="eyebrow-row">
                <span className="eyebrow">{currentSlide.kind ?? 'Announcement'}</span>
              </div>

              <div className="slide-title-wrap">
                <h2>{currentSlide.title}</h2>
              </div>

              {currentSlide.subheading && <h3>{currentSlide.subheading}</h3>}

              <div className="body-block">
                {currentSlide.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {currentSlide.cta && (
                <a className="cta-button" href={currentSlide.cta.href} target="_blank" rel="noreferrer">
                  {currentSlide.cta.label}
                </a>
              )}

              <div className="tag-row">
                {currentSlide.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="progress-wrap">
              <div
                className="progress-bar"
                style={{ width: `${(progress / currentDuration) * 100}%` }}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
