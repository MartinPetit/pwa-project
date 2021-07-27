import { LitElement, html, css } from 'lit';

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
        <h1 class="text-lg font-medium"></h1>
      <table class="table-auto">
          <tbody>
          <tr>
              <td>${this.doc.val().name}</td>
              <td>${this.doc.val().description}</td>
              <td><a class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
                     href="/${this.doc.key}">
                  Editer
              </a>
              </td>
          </tr>
          </tbody>
      </table>
    `;
    }
}

customElements.define('doc-list', DocList);