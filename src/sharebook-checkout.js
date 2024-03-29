import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './sharebook-button.js';
import './sharebook-common-styles.js';
import './sharebook-form-styles.js';
import './sharebook-input.js';
import './sharebook-select.js';
import './sharebook-checkbox.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class SharebookCheckout extends PolymerElement {
  static get template() {
    return html`
    <style include="sharebook-common-styles sharebook-button sharebook-form-styles sharebook-input sharebook-select sharebook-checkbox">

      .main-frame {
        transition: opacity 0.5s;
      }

      :host([waiting]) .main-frame {
        opacity: 0.1;
      }

      sharebook-input, sharebook-select {
        font-size: 16px;
      }

      sharebook-select {
        margin-bottom: 20px;
      }

      paper-spinner-lite {
        position: fixed;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
      }

      .billing-address-picker {
        margin: 28px 0;
        height: 20px;
        @apply --layout-horizontal;
      }

      .billing-address-picker > label {
        margin-left: 12px;
      }

      .grid {
        margin-top: 40px;
        @apply --layout-horizontal;
      }

      .grid > section {
        @apply --layout-flex;
      }

      .grid > section:not(:first-child) {
        margin-left: 80px;
      }

      .row {
        @apply --layout-horizontal;
        @apply --layout-end;
      }

      .column {
        @apply --layout-vertical;
      }

      .row > .flex,
      .input-row > * {
        @apply --layout-flex;
      }

      .input-row > *:not(:first-child) {
        margin-left: 8px;
      }

      .sharebook-select-label {
        line-height: 20px;
      }

      .order-summary-row {
        line-height: 24px;
      }

      .total-row {
        font-weight: 500;
        margin: 30px 0;
      }

      @media (max-width: 767px) {

        .grid {
          display: block;
          margin-top: 0;
        }

        .grid > section:not(:first-child) {
          margin-left: 0;
        }

      }

    </style>

    <div class="main-frame">
      <iron-pages id="pages" selected="[[state]]" attr-for-selected="state">
        <div state="init">
          <iron-form id="checkoutForm"
              on-iron-form-response="_didReceiveResponse"
              on-iron-form-presubmit="_willSendRequest">
            <form method="post" action="data/sample_success_response.json" enctype="application/x-www-form-urlencoded">

              <div class="subsection" visible$="[[!_hasItems]]">
                <p class="empty-cart">Tu <iron-icon icon="shopping-cart"></iron-icon> est&aacute; vac&iacute;o.</p>
              </div>

              <header class="subsection" visible$="[[_hasItems]]">
                <h1>Checkout</h1>
                <span>Sharebook</span>
              </header>

              <div class="subsection grid" visible$="[[_hasItems]]">
                <section>
                  <h2 id="accountInfoHeading">Informaci&oacute;n de la cuenta</h2>
                  <div class="row input-row">
                    <sharebook-input>
                      <input type="email" id="accountEmail" name="accountEmail"
                          placeholder="Email" autofocus required
                          aria-labelledby="accountEmailLabel accountInfoHeading">
                      <sharebook-md-decorator error-message="Email inv&aacute;lido" aria-hidden="true">
                        <label id="accountEmailLabel">Email</label>
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-input>
                  </div>
                  <div class="row input-row">
                    <sharebook-input>
                      <input type="tel" id="accountPhone" name="accountPhone" pattern="\\d{10,}"
                          placeholder="Phone Number" required
                          aria-labelledby="accountPhoneLabel accountInfoHeading">
                      <sharebook-md-decorator error-message="N&uacute;mero telef&oacute;nico inv&aacute;lido" aria-hidden="true">
                        <label id="accountPhoneLabel">N&uacute;mero telef&oacute;nico</label>
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-input>
                  </div>
                  <h2 id="shipAddressHeading">Ubicaci&oacute;n de entrega</h2>
                  <div class="row input-row">
                    <sharebook-input>
                      <input type="text" id="shipAddress" name="shipAddress" pattern=".{5,}"
                          placeholder="Address" required
                          aria-labelledby="shipAddressLabel shipAddressHeading">
                      <sharebook-md-decorator error-message="Ubicaci&oacute;n inv&aacute;lida" aria-hidden="true">
                        <label id="shipAddressLabel">Ubicaci&oacute;n</label>
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-input>
                  </div>
                  <div class="row input-row">
                    <sharebook-input>
                      <input type="text" id="shipState" name="shipState" pattern=".{2,}"
                          placeholder="State/Province" required
                          aria-labelledby="shipStateLabel shipAddressHeading">
                      <sharebook-md-decorator error-message="Piso inv&aacute;lido" aria-hidden="true">
                        <label id="shipStateLabel">Piso</label>
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-input>
                    <sharebook-input>
                      <input type="text" id="shipZip" name="shipZip" pattern=".{4,}"
                          placeholder="Zip/Postal Code" required
                          aria-labelledby="shipZipLabel shipAddressHeading">
                      <sharebook-md-decorator error-message="Extensi&oacute;n inv&aacute;lida" aria-hidden="true">
                        <label id="shipZipLabel">Extensi&oacute;n</label>
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-input>
                  </div>
                  <div class="column">
                    <label id="shipCountryLabel" class="sharebook-select-label">Edificio</label>
                    <sharebook-select>
                      <select id="shipCountry" name="shipCountry" required
                          aria-labelledby="shipCountryLabel shipAddressHeading">
                        <option value="ParquesBBVA" selected>Parque Polanco BBVA</option>
                        <option value="TorreBBVA">Torre Reforma BBVA</option>
                        <option value="CPD">CPD</option>
                      </select>
                      <sharebook-md-decorator aria-hidden="true">
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-select>
                  </div>
                  <div class="billing-address-picker">
                    <sharebook-checkbox>
                      <input type="checkbox" id="setBilling" name="setBilling"
                          checked$="[[hasBillingAddress]]" on-change="_toggleBillingAddress" disabled>
                      <sharebook-md-decorator></sharebook-md-decorator aria-hidden="true">
                    </sharebook-checkbox>
                  </div>
                </section>
                <section>
                  <h2>Informaci&oacute;n personal</h2>
                  <div class="row input-row">
                    <sharebook-input>
                      <input type="text" id="ccName" name="ccName" pattern=".{3,}"
                          placeholder="Cardholder Name" required
                          autocomplete="cc-name">
                      <sharebook-md-decorator error-message="Nombre inv&aacute;lido" aria-hidden="true">
                        <label for="ccName">Nombre completo</label>
                        <sharebook-underline></sharebook-underline>
                      </sharebook-md-decorator>
                    </sharebook-input>
                  </div>
                  <h2>Resumen de orden</h2>
                  <dom-repeat items="[[cart]]" as="entry">
                    <template>
                      <div class="row order-summary-row">
                        <div class="flex">[[entry.item.title]]</div>
                        <div class="flex">ISBN: [[entry.item.isbn]]</div>
                      </div>
                    </template>
                  </dom-repeat>
                  <div class="row total-row">
                    <div class="flex">Total</div>
                    <div>[[total]]</div>
                  </div>
                  <sharebook-button responsive id="submitBox">
                    <input type="button" on-click="_submit" value="Ordenar ahora">
                  </sharebook-button>
                </section>
              </div>
            </form>
          </iron-form>
        </div>

        <!-- Success message UI -->
        <header state="success">
          <h1>Gracias</h1>
          <p>[[response.successMessage]]</p>
          <sharebook-button responsive>
            <a href="/">Terminar</a>
          </sharebook-button>
        </header>

        <!-- Error message UI -->
        <header state="error">
          <h1>No pudimos procesar tu orden</h1>
          <p id="errorMessage">[[response.errorMessage]]</p>
          <sharebook-button responsive>
            <a href="/checkout">Intentar nuevamente</a>
          </sharebook-button>
        </header>

      </iron-pages>

    </div>

    <!-- Handles the routing for the success and error subroutes -->
    <app-route
        active="{{routeActive}}"
        data="{{routeData}}"
        route="[[route]]"
        pattern="/:state">
     </app-route>

    <!-- Show spinner when waiting for the server to repond -->
    <paper-spinner-lite active="[[waiting]]"></paper-spinner-lite>
    `;
  }
  static get is() { return 'sharebook-checkout'; }

  static get properties() { return {

    /**
     * The route for the state. e.g. `success` and `error` are mounted in the
     * `checkout/` route.
     */
    route: {
      type: Object,
      notify: true
    },

    /**
     * The total price of the contents in the user's cart.
     */
    total: Number,

    /**
     * The state of the form. Valid values are:
     * `init`, `success` and `error`.
     */
    state: {
      type: String,
      value: 'init'
    },

    /**
     * An array containing the items in the cart.
     */
    cart: Array,

    /**
     * The server's response.
     */
    response: Object,

    /**
     * If true, the user must enter a billing address.
     */
    hasBillingAddress: {
      type: Boolean,
      value: false
    },

    /**
     * If true, sharebook-checkout is currently visible on the screen.
     */
    visible: {
      type: Boolean,
      observer: '_visibleChanged'
    },

    /**
     * True when waiting for the server to repond.
     */
    waiting: {
      type: Boolean,
      readOnly: true,
      reflectToAttribute: true
    },

    /**
     * True when waiting for the server to repond.
     */
    _hasItems: {
      type: Boolean,
      computed: '_computeHasItem(cart.length)'
    }

  }}

  static get observers() { return [
    '_updateState(routeActive, routeData)'
  ]}

  _submit(e) {
    if (this._validateForm()) {
      // To send the form data to the server:
      // 2) Remove the code below.
      // 3) Uncomment `this.$.checkoutForm.submit()`.

      this.$.checkoutForm.dispatchEvent(new CustomEvent('iron-form-presubmit', {
        composed: true}));

      this._submitFormDebouncer = Debouncer.debounce(this._submitFormDebouncer,
        timeOut.after(1000), () => {
          this.$.checkoutForm.dispatchEvent(new CustomEvent('iron-form-response', {
            composed: true, detail: {
              response: {
                success: 1,
                successMessage: 'El proceso de compra ha terminado correctamente.'
              }
            }}));
        });

      // this.$.checkoutForm.submit();
    }
  }

  /**
   * Sets the valid state and updates the location.
   */
  _pushState(state) {
    this._validState = state;
    this.set('route.path', state);
  }

  /**
   * Checks that the `:state` subroute is correct. That is, the state has been pushed
   * after receiving response from the server. e.g. Users can only go to `/checkout/success`
   * if the server responsed with a success message.
   */
  _updateState(active, routeData) {
    if (active && routeData) {
      let state = routeData.state;
      if (this._validState === state) {
        this.state = state;
        this._validState = '';
        return;
      }
    }
    this.state = 'init';
  }

  /**
   * Sets the initial state.
   */
  _reset() {
    let form = this.$.checkoutForm;

    this._setWaiting(false);
    form.reset && form.reset();

    let nativeForm = form._form;
    if (!nativeForm) {
      return;
    }

    // Remove the `aria-invalid` attribute from the form inputs.
    for (let el, i = 0; el = nativeForm.elements[i], i < nativeForm.elements.length; i++) {
      el.removeAttribute('aria-invalid');
    }
  }

  /**
   * Validates the form's inputs and adds the `aria-invalid` attribute to the inputs
   * that don't match the pattern specified in the markup.
   */
  _validateForm() {
    let form = this.$.checkoutForm;
    let firstInvalid = false;
    let nativeForm = form._form;

    for (let el, i = 0; el = nativeForm.elements[i], i < nativeForm.elements.length; i++) {
      if (el.checkValidity()) {
        el.removeAttribute('aria-invalid');
      } else {
        if (!firstInvalid) {
          // announce error message
          if (el.nextElementSibling) {
            this.dispatchEvent(new CustomEvent('announce', {bubbles: true, composed: true,
              detail: el.nextElementSibling.getAttribute('error-message')}));
          }
          if (el.scrollIntoViewIfNeeded) {
            // safari, chrome
            el.scrollIntoViewIfNeeded();
          } else {
            // firefox, edge, ie
            el.scrollIntoView(false);
          }
          el.focus();
          firstInvalid = true;
        }
        el.setAttribute('aria-invalid', 'true');
      }
    }
    return !firstInvalid;
  }

  /**
   * Adds the cart data to the payload that will be sent to the server
   * and updates the UI to reflect the waiting state.
   */
  _willSendRequest(e) {
    let form = e.target;
    let body = form.request && form.request.body;

    this._setWaiting(true);

    if (!body) {
      return;
    }
    // Populate the request body where `cartItemsId[i]` is the ID and `cartItemsQuantity[i]`
    // is the quantity for some item `i`.
    body.cartItemsId = [];
    body.cartItemsQuantity = [];

    this.cart.forEach((cartItem) => {
      body.cartItemsId.push(cartItem.item.name);
      body.cartItemsQuantity.push(cartItem.quantity);
    });
  }

  /**
   * Handles the response from the server by checking the response status
   * and transitioning to the success or error UI.
   */
  _didReceiveResponse(e) {
    let response = e.detail.response;

    this.response = response;
    this._setWaiting(true);

    if (response.success) {
      this._pushState('success');
      this._reset();
      this.dispatchEvent(new CustomEvent('clear-cart', {bubbles: true, composed: true}));
    } else {
      this._pushState('error');
    }
  }

  _toggleBillingAddress(e) {
    this.hasBillingAddress = e.target.checked;

    if (this.hasBillingAddress) {
      this.$.billAddress.focus();
    }
  }

  _computeHasItem(cartLength) {
    return cartLength > 0;
  }
/*
  _formatPrice(total) {
    return isNaN(total) ? '' : '$' + total.toFixed(2);
  }

  _getEntryTotal(entry) {
    return this._formatPrice(entry.quantity);
  }
*/
  _visibleChanged(visible) {
    if (!visible) {
      return;
    }
    // Reset the UI states
    this._reset();
    // Notify the page's title
    this.dispatchEvent(new CustomEvent('change-section', {
      bubbles: true, composed: true, detail: { title: 'Checkout' }}));
  }

}

customElements.define(SharebookCheckout.is, SharebookCheckout);
