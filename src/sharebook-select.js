import '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="sharebook-select">
  <template>
    <style>

    sharebook-select {
        display: inline-block;
        position: relative;
        /* create a layer to avoid invalidation from other controls*/
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }

      sharebook-select > sharebook-md-decorator {
        display: block;
        border-top: 1px solid #ccc;
        height: 1px;
        speak: none;
      }

      sharebook-select > sharebook-md-decorator::after {
        content: '\\25BC';
        display: block;
        position: absolute;
        bottom: calc(50% - 0.75em);
        right: 8px;
        speak: none;
        -webkit-transform: scaleY(.6);
        transform: scaleY(.6);
        color: var(--app-secondary-color);
        pointer-events: none;
      }

      sharebook-select > select {
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 8px 24px 8px 0;
        border: none;
        background-color: transparent;
        border-radius: 0;
        font-size: 1em;
        font-weight: 300;
        color: var(--app-primary-color);
        overflow: hidden;
        margin: 0;
        outline: none;
      }

      sharebook-select > select::-ms-expand {
        display: none;
      }

      sharebook-select > sharebook-md-decorator > sharebook-underline {
        display: block;
        background-color: var(--app-accent-color);
        height: 2px;
        position: relative;
        top: -1px;
        width: 100%;
        margin: auto;
        -webkit-transform: scale3d(0, 1, 1);
        transform: scale3d(0, 1, 1);
        transition: -webkit-transform 0.2s ease-in;
        transition: transform 0.2s ease-in;
      }

      sharebook-select > select:focus + sharebook-md-decorator > sharebook-underline {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        transition: -webkit-transform 0.2s ease-out;
        transition: transform 0.2s ease-out;
      }

      sharebook-select > select:focus + sharebook-md-decorator::before,
      sharebook-select > select:focus + sharebook-md-decorator::after,
      sharebook-select > select:focus {
        color: black;
      }

      /* hide the focus ring in firefox */
      sharebook-select > select:focus:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
      }

      sharebook-select > [prefix] {
        position: absolute;
        left: 0px;
        top: calc(50% - 8px);
        line-height: 16px;
        color: var(--app-secondary-color);
        pointer-events: none;
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
