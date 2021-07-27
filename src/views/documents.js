import {LitElement, html, css} from 'lit';

import page from 'page';
import { createDocument} from "../firebase";
import Base from '../Base';
import '../components/doc-list'

class Documents extends Base {

    static get styles() {
        return css`
                :host {
                    display: block;
                }
                `;
    }

    static get properties() {
        return {
            name: {
                type: String,
                state: true
            },
            description: {
                type: String,
                state: true
            },
            docs: {
                type: Array
            }
        };
    }

    constructor() {
        super();
        this.name = '';
        this.description = '';
        this.docs = [];
    }

    createDoc(e) {
        if (this.name === '' || this.description === '') {
            alert('Nom et description vide !')
        } else {
            this.dispatchEvent(new CustomEvent('create-doc', {
                detail: {
                    name: this.name,
                    description: this.description
                }
        }))
        }
        e.preventDefault();
    }

    render() {
        return html`
            <section>
                <header class="px-4 py-4">
                    <div class="md:w-1/3">
                    <form @submit="${this.createDoc}" class="h-8 flex items-center">
                        <label class="flex-1" aria-label="Add todo input">
                            <input  @input="${e => this.name = e.target.value}"
                                    class="py-3 px-4 rounded-sm w h-full outline-none border-b-2"
                                    type="text"
                                    placeholder="Nom"
                                    name="Doc name">
                        </label>
                        <label class="flex-1" aria-label="Add todo input">
                            <input  @input="${e => this.description = e.target.value}"
                                    class="py-3 px-4 rounded-sm h-full outline-none border-b-2"
                                    type="text"
                                    placeholder="Description"
                                    name="Doc name">
                        </label>
                        <button
                                aria-label="Add"
                                class="ml-4 rounded-lg text-uppercase bg-blue-400 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
                                type="submit">Créer</button>
                    </form>
                    </div>
                </header>
                <main class="mt-4 px-4">
                    <ul class="space-y-4">
                        ${ this.docs.map(doc => html`
                            <li><doc-list .doc="${doc}"></doc-list></li>
            `           )}
                    </ul>
                </main>
            </section>
        `;
    }
}


customElements.define('doc-app', Documents);