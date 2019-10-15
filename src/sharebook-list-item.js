import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

class SharebookListItem extends PolymerElement {
  static get template() {
    return html`
    <style>

      :host {
        @apply --layout-vertical;
        @apply --layout-center-justified;
        text-align: center;
        margin: 0 48px;
      }

      sharebook-image {
        margin: 32px 0 16px;
      }

      sharebook-image::before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      .title {
        color: var(--app-primary-color);
        font-weight: bold;
      }

      .price {
        color: var(--app-secondary-color);
      }

      @media (max-width: 767px) {
        :host {
          margin: 0 12px;
        }
      }

    </style>

    <sharebook-image src="[[item.image]]" alt="[[item.title]]"></sharebook-image>
    <div class="title">[[item.title]]</div>
    <span class="price">ISBN: [[item.isbn]]</span>
`;
  }

  static get is() { return 'sharebook-list-item'; }

  static get properties() { return {

    item: Object

  }}
/*
  _formatPrice(price) {
    return price ? '$' + price.toFixed(2) : '';
  }*/
}

customElements.define(SharebookListItem.is, SharebookListItem);
