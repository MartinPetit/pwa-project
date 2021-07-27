import {LitElement, html, css} from 'lit';

import Base from '../Base';

class DocList extends Base {

    static get styles() {
        return css`
      :host {
        display: block;
      }
    `;
    }

    static get properties() {
        return {
            doc: Object
        };
    }

    constructor() {
        super();
        this.doc = {};
    }

    render() {
        return html`
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Titre: ${this.doc.val().name}</div>
                    <p class="text-gray-700 text-base">
                        ${htmlentities.decode(this.doc.val().description)}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <a class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
                       href="/${this.doc.key}">
                        Editer
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define('doc-list', DocList);
