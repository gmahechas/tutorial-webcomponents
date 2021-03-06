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
  }

  connectedCallback() {

    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = '(?)';
    this.appendChild(tooltipIcon);

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);