import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './sharebook-button.js';
import './sharebook-common-styles.js';
import './sharebook-form-styles.js';

class SharebookCart extends PolymerElement {
  static get template() {
    return html`
    <style include="sharebook-common-styles sharebook-button sharebook-form-styles">

      .list {
        margin: 40px 0;
      }

      .checkout-box {
        font-weight: bold;
        text-align: right;
        margin-right: 10px;
      }

      .subtotal {
        margin: 0 64px 0 24px;
      }

      @media (max-width: 767px) {

        .subtotal {
          margin: 0 0 0 24px;
        }

      }

    </style>

    <div class="main-frame">
      <div class="subsection" visible$="[[!_hasItems]]">
        <p class="empty-cart">Tu <iron-icon icon="shopping-cart"></iron-icon> est&aacute; vac&iacute;o.</p>
      </div>
      <div class="subsection" visible$="[[_hasItems]]">
        <header>
          <h1>Your Cart</h1>
          <span>([[_getPluralizedQuantity(cart.length)]])</span>
        </header>
        <div class="list">
          <dom-repeat items="[[cart]]" as="entry">
            <template>
              <sharebook-cart-item entry="[[entry]]"></sharebook-cart-item>
            </template>
          </dom-repeat>
        </div>
        <div class="checkout-box">
          <sharebook-button responsive>
            <a href="/checkout">Checkout</a>
          </sharebook-button>
        </div>
      </div>
    </div>
    `;
  }
  static get is() { return 'sharebook-cart'; }

  static get properties() { return {

    total: Number,

    cart: Array,

    visible: {
      type: Boolean,
      observer: '_visibleChanged'
    },

    _hasItems: {
      type: Boolean,
      computed: '_computeHasItem(cart.length)'
    }

  }}

  _formatTotal(total) {
    return isNaN(total) ? '' : '$' + total.toFixed(2);
  }

  _computeHasItem(cartLength) {
    return cartLength > 0;
  }

  _getPluralizedQuantity(quantity) {
    return quantity + ' ' + (quantity === 1 ? 'artículo' : 'artículos');
  }

  _visibleChanged(visible) {
    if (visible) {
      // Notify the section's title
      this.dispatchEvent(new CustomEvent('change-section', {
        bubbles: true, composed: true, detail: { title: 'Tu carrito' }}));
    }
  }

}

customElements.define(SharebookCart.is, SharebookCart);
