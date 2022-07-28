import {CartApi, ExampleApi} from "../../src/client/api";
const WrapperApi = require('./WrapperApi')
import * as React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {CartState} from "../../src/common/types";
import {initStore} from "../../src/client/store";
import {render} from "@testing-library/react";
import {Cart} from "../../src/client/pages/Cart";
import '@testing-library/jest-dom/extend-expect';
import "@testing-library/jest-dom";

const cartData = {
    0: {
        name: 'Банан',
        price: 11,
        count: 8
    }
}

function renderer(initialState: CartState) {
    const api = new WrapperApi('/hw/store');
    const cart = new CartApi();
    cart.setState(initialState)
    const store = initStore(api, cart)
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>
        </Provider>
    )
}

describe('Корзина', () => {
    it('Корзина пуста', () => {
        const app = renderer({});
        const {getByText} = render(app);
        expect(getByText(/Cart is empty/)).toBeInTheDocument();

    })
    it('В корзине что-то есть', () => {
        const app = renderer(cartData);
        const {getByText} = render(app);
        expect(getByText("Банан")).toBeInTheDocument();
    })
})