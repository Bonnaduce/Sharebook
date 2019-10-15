import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import './sharebook-button.js';
import './sharebook-icons.js';

class Sharebook404Warning extends PolymerElement {
  static get template() {
    return html`
    <style include="sharebook-button">

      :host {
        display: block;
        text-align: center;
        color: var(--app-secondary-color);
      }

      iron-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
      }

      h1 {
        margin: 50px 0 50px 0;
        font-weight: 300;
      }

    </style>

    <div>
      <iron-icon icon="error"></iron-icon>
      <h1>Lo sentimos, no pudimos encontrar esa p&aacute;gina</h1>
    </div>
    <sharebook-button>
      <a href="/">Ir a la p&aacute;gina principal</a>
    </sharebook-button>
`;
  }

  static get is() { return 'sharebook-404-warning'; }
}

customElements.define(Sharebook404Warning.is, Sharebook404Warning);
