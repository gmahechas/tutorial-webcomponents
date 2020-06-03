/* 
constructor()             -> basic initializations
connectedCallback()       -> DOM initializations
disconnectedCallback()      -> Cleanup work
attributeChangedCallback  -> Update Data + DOM
*/

class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }
        ::slotted(.highlight) { /* HEREEEE */
          border-bottom: 1px dotted red;
        }
      </style>
      <slot>Some default</slot>
      <span>(?)</span>
    `;
  }

  connectedCallback() {

    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    this.style.position = 'relative';

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);