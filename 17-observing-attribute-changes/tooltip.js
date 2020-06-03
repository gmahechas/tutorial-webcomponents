/* 
Element created             |     constructor()             -> basic initializations
Element attached to DOM     |     connectedCallback()       -> DOM initializations
Element detached from DOM   |     disconnectedCallback()      -> Cleanup work
Observed attribute updated  |     attributeChangedCallback  -> Update Data + DOM
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
        :host(.important) {
          background: var(--color-primary, #ff0); /* HEREEEE */
        }
        :host-context(p) {        
          font-weight: bold;
        }
        ::slotted(.highlight) { 
          border-bottom: 1px dotted red;
        }
        .icon {                     
          background: black;
          color: white;
          padding 0.25rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Some default</slot>
      <span class="icon">?</span>
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

  attributeChangedCallback(name, oldValue, newValue) { /* HERE */
    /* console.log(name);
    console.log(oldValue);
    console.log(newValue); */

    if(oldValue === newValue) {
      return;
    }
    if(name === 'text') {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text']
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