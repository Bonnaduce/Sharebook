import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './sharebook-category-data.js';
import './sharebook-common-styles.js';
import './sharebook-image.js';
import './sharebook-list-item.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';

class SharebookList extends PolymerElement {
  static get template() {
    return html`
    <style include="sharebook-common-styles">

      .hero-image {
        position: relative;
        height: 320px;
        overflow: hidden;
        margin-bottom: 32px;
      }

      .hero-image {
        --sharebook-image-img: {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -9999px;
          right: -9999px;
          max-width: none;
        };
      }

      .grid {
        @apply --layout-horizontal;
        @apply --layout-wrap;
        @apply --layout-justified;
        margin: 0 10px 32px 10px;
        padding: 0;
        list-style: none;
      }

      .grid li {
        -webkit-flex: 1 1;
        flex: 1 1;
        -webkit-flex-basis: 33%;
        flex-basis: 33%;
        max-width: 33%;
      }

      .grid a {
        display:block;
        text-decoration: none;
      }

      @media (max-width: 767px) {
        .hero-image {
          display: none;
        }

        .grid  li {
          -webkit-flex-basis: 50%;
          flex-basis: 50%;
          max-width: 50%;
        }
      }

    </style>

    <!--
      app-route provides the name of the category.
    -->
    <app-route
        route="[[route]]"
        pattern="/:category"
        data="{{routeData}}"></app-route>

    <!--
    sharebook-category-data provides the category data for a given category name.
    -->
    <sharebook-category-data
        id="categoryData"
        category-name="[[routeData.category]]"
        category="{{category}}"
        failure="{{failure}}"></sharebook-category-data>

    <sharebook-image
        alt="[[category.title]]"
        src="[[category.image]]"
        placeholder-img="[[category.placeholder]]" class="hero-image"></sharebook-image>

    <header>
      <h1>[[category.title]]</h1>
      <span>[[_getPluralizedQuantity(category.items.length)]]</span>
    </header>

    <ul class="grid" hidden$="[[failure]]">
      <dom-repeat items="[[_getListItems(category.items)]]" initial-count="4">
        <template>
          <li>
            <a href$="[[_getItemHref(item)]]"><sharebook-list-item item="[[item]]"></sharebook-list-item></a>
          </li>
        </template>
      </dom-repeat>
    </ul>

    <!--
    sharebook-network-warning shows a warning message when the items can't be rendered due
      to network conditions.
    -->
    <sharebook-network-warning
        hidden$="[[!failure]]"
        offline="[[offline]]"
        on-try-reconnect="_tryReconnect"></sharebook-network-warning>

  </template>
  `;
}

  static get is() { return 'sharebook-list'; }

  static get properties() { return {

    category: Object,

    route: Object,

    routeData: Object,

    visible: {
      type: Boolean,
      value: false
    },

    offline: {
      type: Boolean,
      observer: '_offlineChanged'
    },

    failure: Boolean

  }}

  static get observers() { return [
    '_categoryChanged(category, visible)'
  ]}

  connectedCallback() {
    super.connectedCallback();
    this.isAttached = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.isAttached = false;
  }

  _getListItems(items) {
    // Return placeholder items when the items haven't loaded yet.
    return items || [{},{},{},{},{},{},{},{},{},{}];
  }

  _getItemHref(item) {
    // By returning null when `itemId` is undefined, the href attribute won't be set and
    // the link will be disabled.
    return item.name ? ['/detail', this.category.name, item.name].join('/') : null;
  }

  _getPluralizedQuantity(quantity) {
    if (!quantity) {
      return '';
    }
    let pluralizedQ = quantity === 1 ? 'item' : 'items';
    return  '(' + quantity + ' ' + pluralizedQ + ')';
  }

  _categoryChanged(category, visible) {
    if (!visible) {
      return;
    }
    this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
      microTask, () => {
        if (category) {
          // Notify the category and the page's title
          this.dispatchEvent(new CustomEvent('change-section', {
            bubbles: true, composed: true, detail: {
              category: category.name,
              title: category.title,
              image: this.baseURI + category.image
            }}));
        } else {
          this.dispatchEvent(new CustomEvent('show-invalid-url-warning', {
            bubbles: true, composed: true}));
        }
      });
  }

  _tryReconnect() {
    this.$.categoryData.refresh();
  }

  _offlineChanged(offline) {
    if (!offline && this.isAttached) {
      this._tryReconnect();
    }
  }

}

customElements.define(SharebookList.is, SharebookList);
