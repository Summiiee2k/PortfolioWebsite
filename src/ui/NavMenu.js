export class NavMenu {
    constructor(teleportFn) {
        this._teleport = teleportFn;
        this._open = false;
        this._build();
    }

    _build() {
        // inject styles
        const style = document.createElement('style');
        style.textContent = `
      #nav-toggle {
        position: fixed;
        top: 20px; right: 20px;
        background: rgba(0,255,136,0.12);
        border: 1px solid rgba(0,255,136,0.4);
        color: #00ff88;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        z-index: 200;
        letter-spacing: 2px;
        transition: background 0.2s, border-color 0.2s;
        user-select: none;
      }
      #nav-toggle:hover {
        background: rgba(0,255,136,0.22);
        border-color: #00ff88;
      }
      #nav-menu {
        display: none;
        position: fixed;
        top: 56px; right: 20px;
        background: rgba(5,5,20,0.96);
        border: 1px solid rgba(0,255,136,0.3);
        border-radius: 10px;
        overflow: hidden;
        z-index: 200;
        min-width: 190px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        animation: navSlideIn 0.18s ease;
      }
      #nav-menu.open { display: block; }
      @keyframes navSlideIn {
        from { opacity:0; transform: translateY(-8px); }
        to   { opacity:1; transform: translateY(0); }
      }
      .nav-header {
        padding: 10px 16px 8px;
        font-family: 'Courier New', monospace;
        font-size: 10px;
        color: rgba(0,255,136,0.5);
        letter-spacing: 3px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 16px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #ccddee;
        cursor: pointer;
        transition: background 0.15s, color 0.15s;
        border-bottom: 1px solid rgba(255,255,255,0.04);
      }
      .nav-item:last-child { border-bottom: none; }
      .nav-item:hover {
        background: rgba(0,255,136,0.1);
        color: #00ff88;
      }
      .nav-item .nav-icon { font-size: 15px; width: 20px; text-align: center; }
      .nav-item .nav-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        margin-left: auto;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .nav-item.active .nav-dot { opacity: 1; background: #00ff88; }
    `;
        document.head.appendChild(style);

        // toggle button
        const toggle = document.createElement('div');
        toggle.id = 'nav-toggle';
        toggle.innerHTML = '◈ NAVIGATE';
        toggle.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggle);

        // menu panel
        const menu = document.createElement('div');
        menu.id = 'nav-menu';
        menu.innerHTML = `
      <div class="nav-header">JUMP TO ZONE</div>
    `;

        const zones = [
            { icon: '🏠', label: 'Home', key: 'hero' },
            { icon: '👤', label: 'About', key: 'about' },
            { icon: '🎓', label: 'Education', key: 'education' },
            { icon: '⚙️', label: 'Skills', key: 'skills' },
            { icon: '🏢', label: 'Experience', key: 'experience' },
            { icon: '🟢', label: 'Projects', key: 'projects' },
            { icon: '🎮', label: 'Hobbies', key: 'hobbies' },
            { icon: '📬', label: 'Contact', key: 'contact' },
            { icon: '🥚', label: '???', key: 'easter' },
        ];

        zones.forEach(z => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.dataset.zone = z.key;
            item.innerHTML = `
        <span class="nav-icon">${z.icon}</span>
        <span>${z.label}</span>
        <span class="nav-dot"></span>
      `;
            item.addEventListener('click', () => {
                this._teleport(z.key);
                this.close();
            });
            menu.appendChild(item);
        });

        document.body.appendChild(menu);
        this._menu = menu;
        this._toggle = toggle;
        this._items = menu.querySelectorAll('.nav-item');
    }

    toggle() {
        this._open = !this._open;
        this._menu.classList.toggle('open', this._open);
        this._toggle.innerHTML = this._open ? '✕ CLOSE' : '◈ NAVIGATE';
    }

    close() {
        this._open = false;
        this._menu.classList.remove('open');
        this._toggle.innerHTML = '◈ NAVIGATE';
    }

    setActive(zoneKey) {
        this._items.forEach(item => {
            item.classList.toggle('active', item.dataset.zone === zoneKey);
        });
    }
}