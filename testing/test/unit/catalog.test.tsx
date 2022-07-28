import {Provider} from "react-redux";
const WrapperApi = require('./WrapperApi')
import {CartApi} from "../../src/client/api";
import * as React from "react";
import {initStore} from "../../src/client/store";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {render, screen} from "@testing-library/react";


describe('Товар', () => {
    it('Проверка полей', () => {
        const product = {
            id: 0,
            name: 'Банан',
            price: 11,
            color: 'pink',
            material: 'wood',
            description: 'Капец вкусный банан'
        }
        const api = new WrapperApi('/');
        const cart = new CartApi();
        const store = initStore(api, cart)
        const app = (
            <Provider store={store}>
                <ProductDetails product={product}/>
            </Provider>
        )

        render(app);
        screen.getByText('Банан')
        screen.getByText('$11')
        screen.getByText('pink');
        screen.getByText('wood');
        screen.getByText('Капец вкусный банан');
        screen.getByRole('button', {name: /add to cart/i})
    })
})