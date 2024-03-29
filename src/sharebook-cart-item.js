import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './sharebook-icons.js';
import './sharebook-image.js';
import './sharebook-select.js';

class SharebookCartItem extends PolymerElement {

  static get template() {
    return html`
    <style include="sharebook-select">

      :host {
        @apply --layout-horizontal;
        position: relative;
        margin-bottom: 24px;
      }

      sharebook-image {
        width: 72px;
        height: 72px;
      }

      sharebook-select > select {
        font-size: 16px;
        padding-left: 40px;
      }

      sharebook-select > sharebook-md-decorator {
        font-size: 12px;
        border: none;
      }

      .name {
        @apply --layout-flex-auto;
        line-height: 20px;
        font-weight: 500;
        float: left;
        width: calc(100% - 438px);
        margin-top: 26px;
        margin-right: 30px;
      }

      .name a {
        display: inline-block;
        max-width: 100%;
        text-decoration: none;
        color: var(--app-primary-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price, .size {
        display: inline-block;
        white-space: nowrap;
        color: var(--app-secondary-color);
      }

      .size {
        min-width: 70px;
        width: 144px;
      }

      .size > span {
        margin-left: 10px;
      }

      .price {
        min-width: 70px;
        width: 100px;
      }

      .quantity {
        min-width: 80px;
        width: 160px;
      }

      .delete-button {
        width: 34px;
        height: 34px;
        color: var(--app-secondary-color);
        position: absolute;
        top: 18px;
        right: 0;
      }

      .flex {
        @apply --layout-horizontal;
        @apply --layout-flex-auto;
        margin-left: 24px;
      }

      .detail {
        @apply --layout-horizontal;
        @apply --layout-center;
        margin-top: 26px;
        margin-right: 30px;
        height: 20px;
      }

      @media (max-width: 767px) {
        .flex {
          @apply --layout-vertical;
          margin-left: 10px;
        }

        .name {
          margin-top: 16px;
          margin-right: 0;
          width: calc(100% - 40px);
        }

        .detail {
          @apply --layout-self-end;
          margin: 10px 10px 0 0;
        }

        .quantity, .size, .price {
          text-align: right;
          width: auto;
        }

        .delete-button {
          top: 8px;
        }
      }

      @media (max-width: 360px) {
        .name {
          margin-top: 0;
        }

        .detail {
          @apply --layout-vertical;
          @apply --layout-start;
          @apply --layout-self-start;
          height: auto;
          margin-top: 0;
        }

        .delete-button {
          top: -6px;
        }

        sharebook-select > select {
          padding: 2px 24px 2px 40px;
        }

        .quantity, .size, .price {
          text-align: left;
          width: auto;
        }
      }

    </style>

    <a href\$="/detail/[[entry.item.category]]/[[entry.item.name]]" title\$="[[entry.item.title]]">
      <sharebook-image src="[[entry.item.image]]" alt="[[entry.item.title]]"></sharebook-image>
    </a>
    <div class="flex">
      <div class="name">
        <a href\$="/detail/[[entry.item.category]]/[[entry.item.name]]">[[entry.item.title]]</a>
      </div>
      <div class="detail">
        <!--
          Use on-click instead of on-tap to prevent the next cart item to be focused
        -->
        <paper-icon-button class="delete-button" icon="close" aria-label\$="Delete item [[entry.item.title]]" on-click="_removeItem"></paper-icon-button>
      </div>
    </div>
    `;
  }

  static get is() { return 'sharebook-cart-item'; }

  static get properties() { return {

    entry: Object

  }}

  _quantityChange() {
    this._setCartItem(parseInt(this.$.quantitySelect.value, 10));
  }

  _setCartItem(quantity) {
    this.dispatchEvent(new CustomEvent('set-cart-item', {
      bubbles: true, composed: true, detail: {
        item: this.entry.item,
        quantity: quantity,
        size: this.entry.size
      }}));
  }

  _formatPrice(price) {
    return price ? '$' + price.toFixed(2) : '';
  }

  _removeItem() {
    this._setCartItem(0);
  }

}

customElements.define(SharebookCartItem.is, SharebookCartItem);
