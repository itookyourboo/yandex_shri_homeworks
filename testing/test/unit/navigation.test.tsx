import {CartApi, ExampleApi} from "../../src/client/api";
import {BrowserRouter} from "react-router-dom";
import * as React from "react";
import {Provider} from "react-redux";
import {initStore} from "../../src/client/store";
import {Application} from "../../src/client/Application";
import {render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

const basename = '/hw/store';
// @ts-ignore
const app = (store) => (
    <BrowserRouter basename={basename}>
        <Provider store={store}>
            <Application/>
        </Provider>
    </BrowserRouter>
);

describe('Проверка навигации', () => {
    it('Ссылка на каталог', () => {
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const {getByRole} = render(app(store));
        userEvent.click(getByRole('link', {name: /catalog/i}))
        const heading = getByRole('heading', {name: /Catalog/i});
        expect(heading).toBeInTheDocument();
    })
    it('Ссылка на доставку', () => {
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const {getByRole} = render(app(store));
        userEvent.click(getByRole('link', {name: /delivery/i}))
        const heading = getByRole('heading', {name: /Delivery/i});
        expect(heading).toBeInTheDocument();
    })
    it('Ссылка на контакты', () => {
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const {getByRole} = render(app(store));
        userEvent.click(getByRole('link', {name: /contacts/i}))
        const heading = getByRole('heading', {name: /Contacts/i});
        expect(heading).toBeInTheDocument();
    })
    it('Ссылка на корзину', () => {
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const {getByRole} = render(app(store));
        userEvent.click(getByRole('link', {name: /cart/i}))
        const heading = getByRole('heading', {name: /Shopping Cart/i});
        expect(heading).toBeInTheDocument();
    })
})