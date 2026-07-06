export default function HomeSkeleton() {
  return (
    <div className="wrap home-skeleton" aria-hidden="true">
      <div className="skeleton-nav">
        <div className="skeleton-block skeleton-logo" />
        <div className="skeleton-nav-links">
          <div className="skeleton-block skeleton-pill" />
          <div className="skeleton-block skeleton-pill" />
          <div className="skeleton-block skeleton-pill" />
        </div>
      </div>

      <section className="hero home-skeleton-hero">
        <div className="hero-left skeleton-column">
          <div className="skeleton-block skeleton-tag" />
          <div className="skeleton-block skeleton-heading skeleton-heading-lg" />
          <div className="skeleton-block skeleton-heading skeleton-heading-md" />
          <div className="skeleton-block skeleton-text" />
          <div className="skeleton-block skeleton-text skeleton-text-short" />

          <div className="skeleton-stats">
            <div className="skeleton-stat">
              <div className="skeleton-block skeleton-number" />
              <div className="skeleton-block skeleton-label" />
            </div>
            <div className="skeleton-stat">
              <div className="skeleton-block skeleton-number" />
              <div className="skeleton-block skeleton-label" />
            </div>
            <div className="skeleton-stat">
              <div className="skeleton-block skeleton-number" />
              <div className="skeleton-block skeleton-label" />
            </div>
          </div>
        </div>

        <div className="profile-card skeleton-profile-card">
          <div className="avatar-row">
            <div className="skeleton-block skeleton-avatar" />
            <div className="skeleton-column skeleton-profile-copy">
              <div className="skeleton-block skeleton-name" />
              <div className="skeleton-block skeleton-role" />
            </div>
          </div>

          <div className="skeleton-block skeleton-text" />
          <div className="skeleton-block skeleton-text skeleton-text-short" />

          <div className="skeleton-chip-row">
            <div className="skeleton-block skeleton-chip" />
            <div className="skeleton-block skeleton-chip" />
            <div className="skeleton-block skeleton-chip" />
          </div>

          <div className="skeleton-action-row">
            <div className="skeleton-block skeleton-button" />
            <div className="skeleton-block skeleton-button skeleton-button-secondary" />
          </div>
        </div>
      </section>

      <section className="home-skeleton-section">
        <div className="section-head">
          <div className="skeleton-block skeleton-section-title" />
          <div className="skeleton-block skeleton-section-meta" />
        </div>

        <div className="filters">
          <div className="skeleton-block skeleton-filter" />
          <div className="skeleton-block skeleton-filter" />
          <div className="skeleton-block skeleton-filter" />
          <div className="skeleton-block skeleton-filter" />
        </div>

        <div className="grid skeleton-grid">
          <div className="card spotlight skeleton-card">
            <div className="skeleton-block skeleton-avatar skeleton-avatar-lg" />
            <div className="spot-content skeleton-column">
              <div className="skeleton-block skeleton-tag" />
              <div className="skeleton-block skeleton-name" />
              <div className="skeleton-block skeleton-role" />
              <div className="skeleton-block skeleton-text" />
              <div className="skeleton-chip-row">
                <div className="skeleton-block skeleton-chip" />
                <div className="skeleton-block skeleton-chip" />
              </div>
            </div>
          </div>

          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="card skeleton-card">
              <div className="card-top">
                <div className="skeleton-block skeleton-card-avatar" />
                <div className="skeleton-block skeleton-icon" />
              </div>
              <div className="skeleton-block skeleton-name" />
              <div className="skeleton-block skeleton-role" />
              <div className="skeleton-block skeleton-text" />
              <div className="skeleton-chip-row">
                <div className="skeleton-block skeleton-chip" />
                <div className="skeleton-block skeleton-chip" />
                <div className="skeleton-block skeleton-chip" />
              </div>
              <div className="card-footer">
                <div className="skeleton-block skeleton-label" />
                <div className="skeleton-block skeleton-button skeleton-connect-button" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
