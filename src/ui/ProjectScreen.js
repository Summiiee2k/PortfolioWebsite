export class ProjectScreen {
    constructor() {
        this._screen = document.getElementById('project-screen');
        this._card = document.getElementById('project-card-content');
        this._scene = null;

        // ESC key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.close();
        });
    }

    setScene(scene) { this._scene = scene; }

    open(proj) {
        const metricsHtml = (proj.metrics || [])
            .map(m => `<span class="metric">${m}</span>`).join('');
        const stackHtml = (proj.stack || [])
            .map(s => `<span class="stack-tag">${s}</span>`).join('');
        const demoBtn = proj.demo
            ? `<a href="${proj.demo}" target="_blank" class="btn btn-demo">
           Live Demo ↗
         </a>`
            : '';

        this._card.innerHTML = `
      <button class="btn-exit" id="close-proj-btn">✕  ESC</button>
      <div class="proj-year">${proj.year}</div>
      <h1 class="proj-title">${proj.title}</h1>
      <p class="proj-desc">${proj.description}</p>
      ${metricsHtml ? `<div class="metrics">${metricsHtml}</div>` : ''}
      <div class="stack">${stackHtml}</div>
      <div class="project-buttons">
        <a href="${proj.github}" target="_blank" class="btn btn-github">
          View on GitHub ↗
        </a>
        ${demoBtn}
      </div>
    `;

        document.getElementById('close-proj-btn')
            .addEventListener('click', () => this.close());

        this._screen.classList.add('active');
        if (this._scene._music) this._scene._music.fadeDown();
        if (this._scene) this._scene.scene.pause();

    }

    close() {
        this._screen.classList.remove('active');
        if (this._scene._music) this._scene._music.fadeUp();
        if (this._scene) this._scene.scene.resume();

    }
}