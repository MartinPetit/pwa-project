import {LitElement, html, css} from 'lit';

import page from 'page';

import Base from '../Base';
import { signUser} from "../firebase";

class Login extends Base {

    static get styles() {
        return css`
                :host {
                    display: block;
                }
                `;
    }

    static get properties() {
        return {
            email: {
                type: String,
                state: true
            },
            password: {
                type: String,
                state: true
            }
        };
    }

    constructor() {
        super();
        this.email = '';
        this.password = '';
    }

    login(e) {

        if (this.email === '' || this.password === '') {
            alert('Email and password empty !')
            e.preventDefault()
            page('/login');
        }
        else {
            signUser(this.email, this.password).then((res) => {
                alert('Connexion succeed ! ')
            });
            e.preventDefault();
            page('/documents');
        }
    };



    render() {
        return html`
            <h1 class="font-bold text-center mb-6 mt-6">Connexion</h1>
            <form @submit="${this.login}" class="mt-12">
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                               for="inline-full-name">
                            Email
                        </label>
                    </div>
                    <div class="md:w-1/3">
                        <input
                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="email"
                                @input="${e => this.email = e.target.value}"
                        >
                    </div>
                </div>
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                               for="inline-password">
                            Password
                        </label>
                    </div>
                    <div class="md:w-1/3">
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                               id="inline-password" type="password" @input="${e => this.password = e.target.value}">
                    </div>
                </div>
                <div class="md:flex md:items-center">
                    <div class="md:w-1/3"></div>
                    <div class="md:w-1/3">
                        <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        `;
    }
}

customElements.define('login-app', Login);