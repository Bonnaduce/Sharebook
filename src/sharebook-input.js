import '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="sharebook-input">
  <template>
    <style>

    sharebook-input {
        display: inline-block;
        margin: 20px 0;
      }

      sharebook-input > input::-webkit-input-placeholder {
        color: transparent;
      }

      sharebook-input > input::-moz-placeholder {
        color: transparent;
      }

      sharebook-input > input:-ms-input-placeholder {
        color: transparent;
      }

      sharebook-input > input::-ms-input-placeholder {
        color: transparent;
      }

      sharebook-input > input {
        font-size: 1em;
        font-weight: 300;
        color: var(--app-primary-color);
        border: none;
        padding: 8px 0;
        width: 100%;
        outline: none;
      }

      sharebook-input > input:invalid {
        /* reset the default style in FF */
        box-shadow: none;
      }

      sharebook-input > sharebook-md-decorator {
        display: block;
        height: 1px;
        width: 100%;
        margin: auto;
        border-top: 1px solid #ccc;
        position: relative;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }

      sharebook-input sharebook-underline {
        display: block;
        height: 2px;
        width: 100%;
        margin: auto;
        background-color: var(--app-accent-color);
        position: absolute;
        top: -1px;
        left: 0;
        -webkit-transform: scale3d(0, 1, 1);
        transform: scale3d(0, 1, 1);
        transition: -webkit-transform 0.2s ease-in;
        transition: transform 0.2s ease-in;
      }

      /* input label */
      sharebook-input > sharebook-md-decorator > label {
        display: block;
        pointer-events: none;
        opacity: 0.5;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        transition-property: opacity, -webkit-transform;
        transition-property: opacity, transform;
        transition-duration: 0.15s;
        transition-timing-function: ease-out;
        will-change: transform;
        -webkit-transform: translate3d(0px, -1.9em, 0px);
        transform: translate3d(0px, -1.9em, 0px);
      }

      /* Error message */
      sharebook-input > sharebook-md-decorator::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        font-size: 0.65em;
        color: #dd2c00;
        content: attr(error-message);
        display: none;
        white-space: nowrap;
      }

      sharebook-input > input:focus + sharebook-md-decorator > sharebook-underline {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        transition: -webkit-transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
      }

      /* Label: valid state */
      sharebook-input > input:focus + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
      }

      sharebook-input > input:optional:not(:placeholder-shown) + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
      }

      _:-ms-lang(x), sharebook-input > input + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
      }

      sharebook-input > input:optional:-moz-ui-valid + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
      }

      /* Underline */
      sharebook-input > input:not(:focus):not(:placeholder-shown):invalid + sharebook-md-decorator > sharebook-underline {
        background-color: #dd2c00;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        transition: -webkit-transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
      }

      sharebook-input > input:not(:focus):-moz-ui-invalid:invalid + sharebook-md-decorator > sharebook-underline {
        background-color: #dd2c00;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        transition: -webkit-transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
      }

      sharebook-input > input[aria-invalid='true']:not(:valid) + sharebook-md-decorator > sharebook-underline {
        background-color: #dd2c00;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        transition: -webkit-transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
      }

      /* Error message */
      sharebook-input > input:not(:focus):not(:placeholder-shown):invalid + sharebook-md-decorator::after {
        display: block;
      }

      sharebook-input > input:not(:focus):-moz-ui-invalid:invalid + sharebook-md-decorator::after {
        display: block;
      }

      sharebook-input > input[aria-invalid='true']:not(:valid) + sharebook-md-decorator::after {
        display: block;
      }

      /* Error label */
      sharebook-input > input:not(:focus):not(:placeholder-shown):invalid + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
        color: #dd2c00;
      }

      sharebook-input > input:not(:focus):-moz-ui-invalid:invalid + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
        color: #dd2c00;
      }

      sharebook-input > input[aria-invalid='true']:not(:valid) + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
        color: #dd2c00;
      }

      /* Valid label */
      sharebook-input > input:not(:focus):required:valid + sharebook-md-decorator > label {
        -webkit-transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        transform: translate3d(0px, -3.4em, 0px) scale(0.8, 0.8);
        opacity: 1;
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
