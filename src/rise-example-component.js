import { PolymerElement, html } from "@polymer/polymer";
import { rConfig } from "./rise-example-component-config.js";

export default class RiseExampleComponent extends PolymerElement {

  static get template() {
    return html`[[value]]`;
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    }
  }

  // Event name constants
  static get EVENT_CONFIGURED() {
    return "configured";
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();

    // eslint-disable-next-line no-console
    console.log("newComponentName config", rConfig);

    if (RisePlayerConfiguration.isConfigured()) {
      this._init();
    } else {
      window.addEventListener( "rise-components-ready", () => this._init(), { once: true });
    }
  }

  _init() {
    this._sendEvent(RiseExampleComponent.EVENT_CONFIGURED);
  }

  _sendEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent(event);
  }

}

customElements.define("rise-example-component", RiseExampleComponent);
