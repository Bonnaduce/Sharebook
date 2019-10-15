import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './sharebook-ripple-container.js';

class SharebookTab extends PolymerElement {
  static get template() {
    return html`
    <style>
      [hidden] {
        display: none !important;
      }

      :host {
        display: inline-block;
        position: relative;
      }

      #overlay {
        pointer-events: none;
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        @apply --sharebook-tab-overlay;
      }

      :host(.sharebook-tabs-overlay-static-above) #overlay {
        display: block;
      }
    </style>
    <div id="overlay"></div>
    <sharebook-ripple-container>
      <slot></slot>
    </sharebook-ripple-container>
    `;
  }
  static get is() { return 'sharebook-tab'; }
}

customElements.define(SharebookTab.is, SharebookTab);
