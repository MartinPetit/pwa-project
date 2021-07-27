import {LitElement, html, css} from 'lit';

import page from 'page';
import { updateDoc} from "../firebase";
import Base from '../Base';

class DocumentsShow extends Base {

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
        this.name = '';
        this.description = '';
    }

    updateData(e) {
        let data = document.getElementById('data-doc');
        if (data !== null) {
            this.doc.description = data.innerHTML;
        }

        let pathname = window.location.pathname;
        const path  = pathname.substring(1);
        e.preventDefault();
        updateDoc(`/documents/${path}`, this.doc.description);
    }



    render() {
        return html`
            <section>
                <header class="px-4 py-4">
                    <h1 class="text-5xl text-center">Bienvenue sur votre document</h1><br><br>
                    <p>Nom : ${this.doc.name}</p><br><br>
                    <div class="toolbar">
                        <button class="tool-items fa fa-underline"  onclick="document.execCommand('underline', false, '');">
                        </button>
                        <button class="tool-items fa fa-italic" onclick="document.execCommand('italic', false, '');">
                        </button>
                        <button class="tool-items fa fa-bold" onclick="document.execCommand('bold', false, '');">
                        </button>
                        <button class="tool-items fa fa-link" onclick="link()">
                        </button>
                        <button class="tool-items fa fa-scissors" onclick="document.execCommand('cut',false,'')"></button>
                        <button class="tool-items fa fa-undo" onclick="document.execCommand('undo',false,'')"></button>
                        <button class="tool-items fa fa-repeat" onclick="document.execCommand('redo',false,'')"></button>
                        <button class="tool-items fa fa-strikethrough" onclick="document.execCommand('strikeThrough',false,'')"></button>
                        <button class="tool-items fa fa-trash" onclick="document.execCommand('delete',false,'')"></button>
                        <button class="tool-items fa fa-scribd" onclick="document.execCommand('selectAll',false,'')"></button>
                        <button class="tool-items fa fa-clone" onclick="copy()"></button>
                        
                        <!-- Jutify -->

                        <button class="tool-items fa fa-align-center" onclick="document.execCommand('justifyCenter',false,'')"></button>
                        <button class="tool-items fa fa-align-left" onclick="document.execCommand('justifyLeft',false,'')"></button>
                        <button class="tool-items fa fa-align-right" onclick="document.execCommand('justifyRight',false,'')"></button>
                    </div>
                    <div class="text-center mt-6" style="border: 1px solid black">
                        <div class="editor" contenteditable id="data-doc">
                            <span>${this.doc.description}</span>
                        </div>
                    </div>
                    <div class="text-center mt-6">
                        <button class="text-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button" @click="${this.updateData}">
                            Sauvegarder
                        </button>
                    </div>
                </header>
            </section>
        `;
    }
}


customElements.define('doc-show', DocumentsShow);