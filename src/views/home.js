import {LitElement, html, css} from 'lit';

import page from 'page';

import Base from '../Base';

class Home extends Base {

    static get styles() {
        return css`
                :host {
                    display: block;
                }
                `;
    }


    constructor() {
        super();

    }

    render() {
        return html`
            <h1 class="font-bold text-center mt-12 text-5xl">Bienvenue sur FireDocs</h1><br><br>
            <p class=" text-3xl italic">
                Cet outil vous permettra de modifier facilement un google docs afin de travailler dans les meilleures conditions
            </p><br><br>
            <div class="text-center">
                <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" href="/login">
                    Se connecter
                </a>
                <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" href="/register">
                    S'inscrire
                </a>
            </div>
        `;
    }
}

customElements.define('home-app', Home);