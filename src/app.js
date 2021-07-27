import page from 'page';
import { initFirebase } from './firebase';


initFirebase();

page('/', (ctx) => {
    ctx.name = 'home';
    document.$route = ctx;
    document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
    import('./views/home');
});

page('/register', (ctx) => {
    ctx.name = 'register-app';
    document.$route = ctx;
    document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
    import('./views/register');
});

page('/login', (ctx) => {
    ctx.name = 'login-app';
    document.$route = ctx;
    document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
    import('./views/login');
});

page('/documents', (ctx) => {
    ctx.name = 'doc-app';
    document.$route = ctx;
    document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
    import('./views/documents');
});

page('/:key', (ctx) => {
    ctx.name = 'doc-show';
    document.$route = ctx;
    document.dispatchEvent(new CustomEvent('page-changed', { detail: ctx }));
    import('./views/documents-show');
});

page();
