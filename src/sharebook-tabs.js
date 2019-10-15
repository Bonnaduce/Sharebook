import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { IronSelectableBehavior } from '@polymer/iron-selector/iron-selectable.js';
import './sharebook-tabs-overlay.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class SharebookTabs extends mixinBehaviors(
  [IronSelectableBehavior], PolymerElement) {

  static get template() {
    return html`
    <style>
      :host {
        @apply --layout;
        @apply --layout-center-center;
      }

      #container {
        position: relative;
      }

      sharebook-tabs-overlay {
        @apply --sharebook-tab-overlay;
      }
    </style>
    <div id="container">
      <sharebook-tabs-overlay id="overlay"></sharebook-tabs-overlay>
      <slot></slot>
    </div>
    `;
  }

  static get is() { return 'sharebook-tabs'; }

  static get observers() { return [
    '_onSelectedItemChanged(selectedItem)'
  ]}

  _onSelectedItemChanged(selectedItem) {
    if (selectedItem === undefined && this.selected) return;
    this.$.overlay.target = selectedItem;
  }
}

customElements.define(SharebookTabs.is, SharebookTabs);
