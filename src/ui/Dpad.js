export class Dpad {
    constructor() {
        this.state = { left: false, right: false, up: false, down: false };
        this._downUsed = false;
        this._bind();
    }

    _bind() {
        const map = {
            'btn-left': 'left', 'btn-right': 'right',
            'btn-up': 'up', 'btn-down': 'down',
        };
        Object.entries(map).forEach(([id, dir]) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('pointerdown', e => {
                e.preventDefault();
                this.state[dir] = true;
                el.classList.add('pressed');
            });
            ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => {
                el.addEventListener(ev, () => {
                    this.state[dir] = false;
                    el.classList.remove('pressed');
                });
            });
        });
    }

    // call once per frame — returns true only on first down press
    justDown() {
        if (this.state.down && !this._downUsed) {
            this._downUsed = true;
            return true;
        }
        if (!this.state.down) this._downUsed = false;
        return false;
    }
}