import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './sharebook-button.js';
import './sharebook-category-data.js';
import './sharebook-common-styles.js';
import './sharebook-image.js';
import './sharebook-select.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';

class SharebookNew extends PolymerElement {
  static get template() {
    return html`
    <style include="sharebook-common-styles sharebook-button sharebook-select">

      :host {
        display: block;
      }

      content {
        @apply --layout-horizontal;
        @apply --layout-center-justified;
      }

      sharebook-image {
        position: relative;
        margin: 64px 32px;
        width: 50%;
        max-width: 600px;
        --sharebook-image-img: {
          @apply --layout-fit;
        };
      }

      sharebook-image::before {
        display: block;
        padding-top: 100%;
      }

      .detail {
        margin: auto;
        width: 50%;
        max-width: 400px;
        transition: opacity 0.4s;
      }

      h1 {
        font-size: 24px;
        font-weight: 500;
        line-height: 28px;
        margin: 0;
      }

      .price {
        margin: 16px 0 40px;
        font-size: 16px;
        color: var(--app-secondary-color);
      }

      .description {
        margin: 32px 0;
      }

      .description > h2 {
        margin: 16px 0;
        font-size: 13px;
      }

      .description > p {
        margin: 0;
        color: var(--app-secondary-color);
      }

      .pickers {
        @apply --layout-vertical;
        border-top: 1px solid #ccc;
      }

      sharebook-select > select {
        font-size: 16px;
        padding: 16px 24px 16px 70px;
      }

      @media (max-width: 767px) {

        content {
          @apply --layout-vertical;
          @apply --layout-center;
        }

        sharebook-image {
          margin: 0;
          width: 80%;
        }

        .detail {
          box-sizing: border-box;
          margin: 32px 0;
          padding: 0 24px;
          width: 100%;
          max-width: 600px;
        }

        h1 {
          font-size: 20px;
          line-height: 24px;
        }

        .price {
          font-size: inherit;
          margin: 12px 0 32px;
        }

      }

    </style>
    <div id="content">
      <div class="detail">
        <h1>Agregar libro nuevo</h1>
        <div class="price">Llena todos los datos solicitados</div>
        <div class="pickers">
          <input type="text" id="titulo" placeholder="T&iacute;tulo del libro" value="">
          <sharebook-select>
            <label id="sizeLabel" prefix>Categor&iacute;a</label>
            <select name="sizeSelect" id="sizeSelect" aria-labelledby="sizeLabel" required>
              <option value="none" selected disabled hidden>Selecciona una opci&oacute;n</option> 
              <option value="libros_fantasia">Fantasia</option>
              <option value="libros_drama">Drama</option>
              <option value="libros_educativos">Educativos</option>
              <option value="libros_terror">Terror</option>
            </select>
            <sharebook-md-decorator aria-hidden="true">
              <sharebook-underline></sharebook-underline>
            </sharebook-md-decorator>
          </sharebook-select>
          <input type="text" id="isbn" placeholder="ISBN" value="">
          <textarea id="desc" rows="4" cols="10" placeholder="Descripci&oacute;n"></textarea>
          <input type="text" id="urlimg" placeholder="URL de la portada (con https:\\\\)" value="">
          <input type="text" id="autor" placeholder="Autor" value="">
          <input type="text" id="editorial" placeholder="Editorial" value="">
          <input type="text" id="anio" placeholder="A&ntilde;o de publicaci&oacute;n" value="">
        </div><br><br>
        <sharebook-button responsive>
          <button on-click="_addToCatalog" aria-label="Aniadir al catalogo" align="center">A&ntilde;adir al cat&aacute;logo</button>
        </sharebook-button>
      </div>
    </div>
    `;
  }

  static get is() { return 'sharebook-new'; }

  static get properties() { return {

    item: Object,

    route: Object,

    routeData: Object,

    visible: {
      type: Boolean,
      value: true
    },

    failure: Boolean
  }}

 /* static get observers() { return [
    '_itemChanged(item, visible)'
  ]}

  _itemChanged(item, visible) {
    if (visible) {
      this._itemChangeDebouncer = Debouncer.debounce(this._itemChangeDebouncer,
        microTask, () => {
          // The item description contains escaped HTML (e.g. "&lt;br&gt;"), so we need to
          // unescape it ("<br>") and set it as innerHTML.
          let text = item ? item.description : '';
          this.$.desc.innerHTML = this._unescapeText(text);

          // Reset the select menus.
          this.$.quantitySelect.value = '1';
          this.$.sizeSelect.value = 'M';

          this.dispatchEvent(new CustomEvent('change-section', {
            bubbles: true, composed: true, detail: {
              category: item ? item.category : '',
              title: item ? item.title : '',
              description: item ? item.description.substring(0, 100) : '',
              image: item ? this.baseURI + item.image : ''
            }}));
        })
    }
  }

  _unescapeText(text) {
    let elem = document.createElement('textarea');
    elem.innerHTML = text;
    return elem.textContent;
  }

  _formatPrice(price) {
    return price ? '$' + price.toFixed(2) : '';
  }
*/
  _addToCatalog() {
    var request = new XMLHttpRequest();
    request.open("POST","http://localhost:3000/insertarLibro",false);
    request.setRequestHeader("Accept","application/json");
    request.setRequestHeader("Content-Type","application/json");
    var catname = this.$.titulo.value;
    catname = catname.replace(/\s/g,"+");

    var NuevoLibro = {
      "name": catname,
      "title":this.$.titulo.value,
      "category":this.$.sizeSelect.value,
      "isbn":this.$.isbn.value,
      "description":this.$.desc.value,
      "image":this.$.urlimg.value,
      "largeImage":this.$.urlimg.value,
      "autor":this.$.autor.value,
      "editorial":this.$.editorial.value,
      "public":this.$.anio.value
    };
    var body=JSON.stringify(NuevoLibro);

    request.send(body);
    this.respuesta = request.responseText;
    console.log("Respuesta: " + this.respuesta);
  }

  _isDefined(item) {
    return true;
  }

  _tryReconnect() {
    this.$.categoryData.refresh();
  }

  _offlineChanged(offline) {
    if (!offline) {
      this._tryReconnect();
    }
  }

  _imprime(object){
    var output = '';
    for (var property in object) {
      output += property + ': ' + object[property]+'; ';
    }
  }
}

customElements.define(SharebookNew.is, SharebookNew);
