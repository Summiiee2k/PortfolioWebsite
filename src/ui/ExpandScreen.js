export class ExpandScreen {
    constructor() {
        this._overlay = document.getElementById('expand-screen');
        this._content = document.getElementById('expand-content');
        this._scene = null;
        this._cards = [];
        this._index = 0;
        this._mode = null;

        document.addEventListener('keydown', e => {
            if (!this._overlay.classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.stopPropagation(); // prevent player movement
                e.preventDefault();
                if (this._mode === 'about') {
                    if (e.key === 'ArrowRight') this._navigate(1);
                    else this._navigate(-1);
                }
                if (this._mode === 'hobby') {
                    this._galleryNav(e.key === 'ArrowRight' ? 1 : -1);
                }
            }
        });
    }

    setScene(scene) { this._scene = scene; }

    // ── ABOUT MODE ───────────────────────────────────────────────────
    openAbout(cards, startIndex = 0) {
        this._mode = 'about';
        this._cards = cards;
        this._index = startIndex;
        this._renderAbout();
        this._show();
    }

    _renderAbout() {
        const card = this._cards[this._index];
        const total = this._cards.length;
        const accent = card.accentColor;

        this._content.innerHTML = `
      <div class="ex-close" id="ex-close-btn">✕ ESC</div>

      <div class="ex-about-nav">
        <button class="ex-nav-btn" id="ex-prev"
          ${this._index === 0 ? 'disabled' : ''}>&#9664; PREV</button>
        <span class="ex-counter">${this._index + 1} / ${total}</span>
        <button class="ex-nav-btn" id="ex-next"
          ${this._index === total - 1 ? 'disabled' : ''}>NEXT &#9654;</button>
      </div>

      <div class="ex-about-header" style="border-left: 4px solid ${accent}">
        <span class="ex-icon">${card.icon}</span>
        <h1 class="ex-title" style="color:${accent}">${card.title}</h1>
      </div>

      <div class="ex-paragraphs">
        ${card.paragraphs.map(p =>
            `<p class="ex-para">${p}</p>`
        ).join('')}
      </div>

      <div class="ex-tags">
        ${card.tags.map(t =>
            `<span class="ex-tag" style="border-color:${accent};color:${accent}">${t}</span>`
        ).join('')}
      </div>

      <div class="ex-dots">
        ${this._cards.map((_, i) =>
            `<span class="ex-dot ${i === this._index ? 'active' : ''}"
            style="${i === this._index ? `background:${accent}` : ''}"></span>`
        ).join('')}
      </div>
    `;

        document.getElementById('ex-close-btn')
            .addEventListener('click', () => this.close());
        const prev = document.getElementById('ex-prev');
        const next = document.getElementById('ex-next');
        if (prev) prev.addEventListener('click', () => this._navigate(-1));
        if (next) next.addEventListener('click', () => this._navigate(1));
    }

    _navigate(dir) {
        const newIndex = this._index + dir;
        if (newIndex < 0 || newIndex >= this._cards.length) return;
        this._index = newIndex;
        this._renderAbout();
    }

    // ── HOBBY MODE ───────────────────────────────────────────────────
    openHobby(hobbyData) {
        this._mode = 'hobby';
        this._hobbyData = hobbyData;
        this._galIndex = 0;
        this._renderHobby();
        this._show();
    }

    _renderHobby() {
        const h = this._hobbyData;
        const accent = h.accentColor;
        const gal = h.gallery || [];
        const video = h.youtubeId || null;

        this._content.innerHTML = `
      <div class="ex-close" id="ex-close-btn">✕ ESC</div>

      <div class="ex-about-header" style="border-left: 4px solid ${accent}">
        <span class="ex-icon">${h.icon}</span>
        <h1 class="ex-title" style="color:${accent}">${h.label}</h1>
      </div>

      <p class="ex-sub" style="color:${accent}">${h.subtitle}</p>

      ${gal.length > 0 ? `
        <div class="ex-gallery">
          <div class="ex-gallery-frame" id="ex-gal-frame">
            ${this._galleryItem(gal[0], accent)}
          </div>
          ${gal.length > 1 ? `
            <div class="ex-gallery-nav">
              <button class="ex-nav-btn" id="gal-prev">&#9664;</button>
              <span class="ex-counter" id="gal-count">1 / ${gal.length}</span>
              <button class="ex-nav-btn" id="gal-next">&#9654;</button>
            </div>
            <div class="ex-gallery-dots" id="gal-dots">
              ${gal.map((_, i) =>
            `<span class="ex-dot ${i === 0 ? 'active' : ''}"
                  style="${i === 0 ? `background:${accent}` : ''}"></span>`
        ).join('')}
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${video ? `
        <div class="ex-video-section">
          <p class="ex-video-label" style="color:${accent}">▶ VIDEO</p>
          <div class="ex-video-wrap">
            <iframe
              src="https://www.youtube.com/embed/${video}?rel=0"
              frameborder="0"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write;
                     encrypted-media; gyroscope; picture-in-picture">
            </iframe>
          </div>
        </div>
      ` : ''}

      <div class="ex-paragraphs">
        ${(h.paragraphs || []).map(p =>
            `<p class="ex-para">${p}</p>`
        ).join('')}
      </div>

      <div class="ex-tags">
        ${(h.tags || []).map(t =>
            `<span class="ex-tag" style="border-color:${accent};color:${accent}">${t}</span>`
        ).join('')}
      </div>
    `;

        document.getElementById('ex-close-btn')
            .addEventListener('click', () => this.close());

        if (gal.length > 1) {
            document.getElementById('gal-prev')
                .addEventListener('click', () => this._galleryNav(-1));
            document.getElementById('gal-next')
                .addEventListener('click', () => this._galleryNav(1));
        }
    }

    _galleryItem(item, accent) {
        if (item.type === 'image' && item.src) {
            return `<img src="${item.src}" class="ex-gallery-img" alt="${item.caption || ''}" />`;
        }
        // placeholder
        return `
      <div class="ex-gallery-placeholder" style="border-color:${accent}">
        <span class="ex-placeholder-icon">${item.placeholderIcon || '📷'}</span>
        <p class="ex-placeholder-label">${item.caption || 'PHOTO COMING SOON'}</p>
      </div>
    `;
    }

    _galleryNav(dir) {
        const gal = this._hobbyData.gallery || [];
        this._galIndex = Math.max(0, Math.min(gal.length - 1, this._galIndex + dir));
        const accent = this._hobbyData.accentColor;

        const frame = document.getElementById('ex-gal-frame');
        if (frame) frame.innerHTML = this._galleryItem(gal[this._galIndex], accent);

        const count = document.getElementById('gal-count');
        if (count) count.textContent = `${this._galIndex + 1} / ${gal.length}`;

        const dots = document.querySelectorAll('#gal-dots .ex-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this._galIndex);
            dot.style.background = i === this._galIndex ? accent : '';
        });
    }

    // ── SHARED ───────────────────────────────────────────────────────
    _show() {
        this._overlay.classList.add('active');
        if (this._scene) this._scene.scene.pause();
    }

    close() {
        // kill any youtube iframe to stop video playing
        const iframe = this._overlay.querySelector('iframe');
        if (iframe) iframe.src = iframe.src;

        this._overlay.classList.remove('active');
        if (this._scene) this._scene.scene.resume();
    }
}