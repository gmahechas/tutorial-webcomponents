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
    const template = document.getElementById('tooltip-template');
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.zIndex = '10';
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);