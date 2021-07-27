import { LitElement, html, css } from 'lit';
import page from 'page';
import Base from './Base.js';

import { subscribeDocs, createDocument, getDoc } from './firebase.js';

class FireDocs extends Base {

    static get styles() {
        return css`
      :host {
        display: block;
      }
    `;
    }

    static get properties() {
        return {
            page: {
                type: String,
                state: true
            },
            docs: {
                type: Array,
                state: true
            },
            key: {
                type: String,
                state: true
            },
            doc: {
                type: Object,
                state: true
            }
        };
    }

    constructor() {
        super();
        this.docs = [];
        this.key = '';
        this.doc = {};

        document.addEventListener('page-changed', ({ detail }) => {

            this.page = detail.name;
            this.path = document.$route.path;

            this.key = this.path.substring(1);
        });

    }


    firstUpdated() {
        this.page = document.$route.name;
        this.path = document.$route.path;

        this.key = this.path.substring(1);

    }




    displayPage() {
        switch(this.page) {
            case 'register-app':
                return this.getRegisterPage();
            case 'login-app':
                return this.getLoginPage();
            case 'doc-app':
                subscribeDocs('/documents', (docs) => {
                    this.docs = docs;
                });
                return this.getDocPage();
            case 'doc-show':
                getDoc(`/documents/${this.key}`, (docs) => {
                    this.doc = docs;
                });
                return this.getDocShowPage();
            default:
                return this.getHomePage();
        }
    }

    getRegisterPage() {
        return html`<register-app></register-app>`
    }

    getLoginPage() {
        return html`<login-app></login-app>`
    }

    getHomePage() {

        return html`<home-app></home-app>`
    }

    getDocPage() {
        return html`<doc-app 
                .docs="${this.docs}"
                @create-doc=${this.handleCreateDoc}></doc-app>`
    }

    getDocShowPage() {
        return html`<doc-show .doc="${this.doc}"></doc-show>`
    }

    handleCreateDoc({ detail }) {
        createDocument(detail.name, detail.description);
    }


    displayReturn() {
        return this.page === 'register-app';
    }

    goBack() {
        page('/');
    }

    render() {
        return html`
      ${this.displayReturn()
            ? html`<button class="absolute h-12 left-2 top-0 z-10 text-white" @click="${this.goBack}">
              </button>`
            : null
        }
      ${this.displayPage()}
    `;
    }
}

customElements.define('fire-docs', FireDocs);
