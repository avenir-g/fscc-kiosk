import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'settings' | 'editor'>('settings');
  const [editorDraft, setEditorDraft] = useState<Slide | null>(null);

  const overviewSlides = useMemo(() => getOverviewPages(content.slides), [content.slides]);
  const currentSlide = content.slides[activeSlideIndex] ?? content.slides[0];
  const currentDuration = currentSlide?.duration ?? content.settings.defaultDuration;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      const validated = validateContent(parsed);
      if (validated) {
        setContent(validated);
      }
    } catch {
      // safe fallback
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
        setOverviewPage((page) => Math.min(page + 1, Math.max(0, Math.ceil(overviewSlides.length / 3) - 1)));
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setOverviewPage((page) => Math.max(page - 1, 0));
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

      if (event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        setModalTab('settings');
        setIsModalOpen(true);
      }

      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        const selected = content.slides[activeSlideIndex] ?? content.slides[0];
        setEditorDraft(
          selected
            ? {
                ...selected,
                body: [...selected.body],
                tags: [...selected.tags],
                media: selected.media ? selected.media.map((item) => ({ ...item })) : [],
              }
            : null,
        );
        setModalTab('editor');
        setIsModalOpen(true);
      }

      if (event.key === '1') setPlaybackSpeed(1);
      if (event.key === '2') setPlaybackSpeed(2);
      if (event.key === '3') setPlaybackSpeed(3);
      if (event.key === '4') setPlaybackSpeed(4);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex, content.slides, overviewSlides.length]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // fail quietly
    }
  }, [content]);

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

  const updateGlobalSetting = <K extends keyof AppContent['settings']>(
    key: K,
    value: AppContent['settings'][K],
  ) => {
    setContent((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }));
  };

  const updateEditorField = <K extends keyof Slide>(field: K, value: Slide[K]) => {
    setEditorDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const applyEditorChanges = useCallback(() => {
    if (!editorDraft) return;
    setContent((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) => (slide.id === editorDraft.id ? { ...slide, ...editorDraft } : slide)),
    }));
    setIsModalOpen(false);
    setEditorDraft(null);
  }, [editorDraft]);

  const pageCount = Math.max(1, Math.ceil(overviewSlides.length / 3));
  const visibleSlides = overviewSlides.slice(overviewPage * 3, overviewPage * 3 + 3);

  useEffect(() => {
    if (overviewPage >= pageCount) setOverviewPage(0);
  }, [overviewPage, pageCount]);

  return (
    <div
      className={`app-shell ${content.settings.theme}`}
      style={
        {
          ['--accent' as string]: content.settings.accentColor,
          ['--bg' as string]: content.settings.backgroundColor,
          ['--stage-pad-top' as string]: `${content.settings.stagePadding.top}px`,
          ['--stage-pad-right' as string]: `${content.settings.stagePadding.right}px`,
          ['--stage-pad-bottom' as string]: `${content.settings.stagePadding.bottom}px`,
          ['--stage-pad-left' as string]: `${content.settings.stagePadding.left}px`,
          ['--card-gap' as string]: `${content.settings.cardGap}px`,
        } as CSSProperties
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
          <button className="icon-button" onClick={() => setOverviewPage((page) => Math.max(page - 1, 0))}>←</button>
          <span className="page-indicator">{overviewPage + 1}/{pageCount}</span>
          <button className="icon-button" onClick={() => setOverviewPage((page) => Math.min(page + 1, pageCount - 1))}>→</button>
          <button className="ghost-button" onClick={() => { setModalTab('settings'); setIsModalOpen(true); }}>⚙</button>
          <button className="ghost-button" onClick={() => { const selected = content.slides[activeSlideIndex] ?? content.slides[0]; setEditorDraft(selected ? { ...selected, body: [...selected.body], tags: [...selected.tags], media: selected.media ? selected.media.map((item) => ({ ...item })) : [] } : null); setModalTab('editor'); setIsModalOpen(true); }}>✎</button>
        </div>
      </header>

      {isOverview ? (
        <main className="overview-page">
          <div className="overview-grid">
            {visibleSlides.map((slide) => (
              <button
                key={slide.id}
                className={`overview-card layout-${slide.layout ?? 'medium'}`}
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
          <div key={transitionKey} className={`slide-panel surface-${currentSlide.surface ?? 'automatic'}`}>
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
                  <p key={`${currentSlide.id}-${line}`}>{line}</p>
                ))}
              </div>

              {currentSlide.cta && (
                <a className="cta-button" href={currentSlide.cta.href} target="_blank" rel="noreferrer">
                  {currentSlide.cta.label}
                </a>
              )}

              {currentSlide.qr?.enabled && (
                <div className="qr-floating" style={{ right: currentSlide.qr.offset ?? 18, bottom: currentSlide.qr.offset ?? 18, width: currentSlide.qr.size ?? 160 }}>
                  <span>QR</span>
                </div>
              )}

              <div className="tag-row">
                {currentSlide.tags.map((tag) => (
                  <span key={`${currentSlide.id}-${tag}`}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${(progress / currentDuration) * 100}%` }} />
            </div>
          </div>
        </main>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="panel editor-panel" onClick={(event) => event.stopPropagation()}>
            <div className="panel-header">
              <h3>{modalTab === 'settings' ? 'Kiosk Settings' : 'Edit Slide'}</h3>
              <button className="close-button" onClick={() => setIsModalOpen(false)} aria-label="Close panel">×</button>
            </div>

            <div className="modal-tabs">
              <button className={modalTab === 'settings' ? 'tab-button active' : 'tab-button'} onClick={() => setModalTab('settings')}>Settings</button>
              <button className={modalTab === 'editor' ? 'tab-button active' : 'tab-button'} onClick={() => setModalTab('editor')}>Edit Slide</button>
            </div>

            {modalTab === 'settings' ? (
              <div className="settings-stack">
                <div className="settings-section">
                  <h4>General</h4>
                  <div className="settings-grid">
                    <label>
                      Default duration
                      <input type="number" min={5} max={60} value={content.settings.defaultDuration} onChange={(event) => updateGlobalSetting('defaultDuration', Number(event.target.value) || 12)} />
                    </label>
                    <label>
                      Theme
                      <select value={content.settings.theme} onChange={(event) => updateGlobalSetting('theme', event.target.value as 'light' | 'dark')}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </label>
                    <label>
                      Accent color
                      <input type="color" value={content.settings.accentColor} onChange={(event) => updateGlobalSetting('accentColor', event.target.value)} />
                    </label>
                    <label>
                      Background color
                      <input type="color" value={content.settings.backgroundColor} onChange={(event) => updateGlobalSetting('backgroundColor', event.target.value)} />
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h4>Layout</h4>
                  <div className="settings-grid">
                    <label>
                      Top padding
                      <input type="number" value={content.settings.stagePadding.top} onChange={(event) => updateGlobalSetting('stagePadding', { ...content.settings.stagePadding, top: Number(event.target.value) || 0 })} />
                    </label>
                    <label>
                      Right padding
                      <input type="number" value={content.settings.stagePadding.right} onChange={(event) => updateGlobalSetting('stagePadding', { ...content.settings.stagePadding, right: Number(event.target.value) || 0 })} />
                    </label>
                    <label>
                      Bottom padding
                      <input type="number" value={content.settings.stagePadding.bottom} onChange={(event) => updateGlobalSetting('stagePadding', { ...content.settings.stagePadding, bottom: Number(event.target.value) || 0 })} />
                    </label>
                    <label>
                      Left padding
                      <input type="number" value={content.settings.stagePadding.left} onChange={(event) => updateGlobalSetting('stagePadding', { ...content.settings.stagePadding, left: Number(event.target.value) || 0 })} />
                    </label>
                    <label>
                      Card gap
                      <input type="number" value={content.settings.cardGap} onChange={(event) => updateGlobalSetting('cardGap', Number(event.target.value) || 12)} />
                    </label>
                    <label>
                      Default media motion
                      <select value={content.settings.defaultMediaMotion} onChange={(event) => updateGlobalSetting('defaultMediaMotion', event.target.value as 'zoom-pan' | 'ken-burns' | 'static')}>
                        <option value="zoom-pan">Zoom + Pan</option>
                        <option value="ken-burns">Ken Burns</option>
                        <option value="static">Static</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h4>Birthday</h4>
                  <div className="settings-grid">
                    <label>
                      Enable birthday slide
                      <input type="checkbox" checked={content.settings.birthdayConfig.enabled} onChange={(event) => updateGlobalSetting('birthdayConfig', { ...content.settings.birthdayConfig, enabled: event.target.checked })} />
                    </label>
                    <label>
                      Date/title
                      <input value={content.settings.birthdayConfig.date ?? ''} onChange={(event) => updateGlobalSetting('birthdayConfig', { ...content.settings.birthdayConfig, date: event.target.value })} />
                    </label>
                    <label className="full-width">
                      Names (comma separated)
                      <input value={content.settings.birthdayConfig.names.join(', ')} onChange={(event) => updateGlobalSetting('birthdayConfig', { ...content.settings.birthdayConfig, names: event.target.value.split(',').map((n) => n.trim()).filter(Boolean) })} />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              editorDraft && (
                <div className="editor-grid">
                  <label className="full-width">
                    Slide title
                    <input value={editorDraft.title} onChange={(event) => updateEditorField('title', event.target.value)} />
                  </label>
                  <label className="full-width">
                    Subheading
                    <input value={editorDraft.subheading ?? ''} onChange={(event) => updateEditorField('subheading', event.target.value)} />
                  </label>
                  <label className="full-width">
                    Body (one line per entry)
                    <textarea rows={6} value={editorDraft.body.join('\n')} onChange={(event) => updateEditorField('body', event.target.value.split('\n').map((line) => line.trim()).filter(Boolean))} />
                  </label>
                  <label className="full-width">
                    Tags (comma separated)
                    <input value={editorDraft.tags.join(', ')} onChange={(event) => updateEditorField('tags', event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))} />
                  </label>
                  <label>
                    Kind
                    <input value={editorDraft.kind ?? 'event'} onChange={(event) => updateEditorField('kind', event.target.value)} />
                  </label>
                  <label>
                    Duration
                    <input type="number" min={5} max={60} value={editorDraft.duration ?? content.settings.defaultDuration} onChange={(event) => updateEditorField('duration', Number(event.target.value) || content.settings.defaultDuration)} />
                  </label>
                  <label className="full-width">
                    CTA label
                    <input value={editorDraft.cta?.label ?? ''} onChange={(event) => updateEditorField('cta', { label: event.target.value, href: editorDraft.cta?.href ?? 'https://fscchurch.com/' })} />
                  </label>
                  <label className="full-width">
                    CTA URL
                    <input value={editorDraft.cta?.href ?? ''} onChange={(event) => updateEditorField('cta', { label: editorDraft.cta?.label ?? 'Learn More', href: event.target.value })} />
                  </label>
                </div>
              )
            )}

            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              {modalTab === 'editor' && <button className="primary-button" onClick={applyEditorChanges}>Save</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
