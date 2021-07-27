import {LitElement, html, css} from 'lit';

import {updateDoc} from "../firebase";
import Base from '../Base';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

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
        this.editor = null
    }
    updated() {
        if (this.editor == null) {
            ClassicEditor
                .create(document.querySelector('#editor'))
                .then(newEditor => {
                    this.editor = newEditor;
                    newEditor.setData(htmlentities.decode(this.doc.description))
                })
        } else {
            if (this.editor !== null && this.doc.description !== undefined) {
                this.editor.setData(htmlentities.decode(this.doc.description))
            }
        }

    }

    updateData() {
        const editorData = this.editor.getData();
        let pathname = window.location.pathname;
        const path = pathname.substring(1);
        updateDoc(`/documents/${path}`, editorData);
        this.editor.setData(editorData)
        this.doc.description = this.editor.getData()
    }

    render() {
        return html`
            <section>
                <header class="px-4 py-4">
                    <h1 class="text-5xl text-center">Bienvenue sur votre document</h1><br><br>
                    <p>Nom : ${this.doc.name}</p><br><br>
                    <div id="clear" class="text-center mt-6" style="border: 1px solid black">
                        <div id="editor"></div>
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
