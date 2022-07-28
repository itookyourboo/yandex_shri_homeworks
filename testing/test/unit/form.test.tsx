import {CheckoutFormData} from "../../src/common/types";
import {render, screen} from "@testing-library/react";
import {Form} from "../../src/client/components/Form";
import * as React from "react";
import userEvent from "@testing-library/user-event";
import {expect} from "@jest/globals";

const initForm = () => {
    const onSubmit = jest.fn((_: CheckoutFormData) => {});
    const {getByRole} = render(<Form onSubmit={onSubmit}/>);
    const Name = getByRole('textbox', {name: /name/i});
    const Phone = getByRole('textbox', {name: /phone/i});
    const Address = getByRole('textbox', {name: /address/i});
    const Button = getByRole('button', {name: /checkout/i})

    return {Name, Phone, Address, Button, onSubmit};
}

describe("Проверка формы", () => {
    it("Пустая форма", () => {
            const {Button, onSubmit} = initForm();
            Button.click();
            expect(onSubmit.mock.calls.length).toBe(0);
            screen.logTestingPlaygroundURL();
        }
    )
    it("Неправильный телефон", () => {
        const {Name, Phone, Address, Button, onSubmit} = initForm();
        userEvent.type(Name, 'Антохолий');
        userEvent.type(Phone, "228");
        userEvent.type(Address, "Адресссс");
        Button.click();
        expect(onSubmit.mock.calls.length).toBe(0);
    })
    it("Правильный телефон", () => {
        const {Name, Phone, Address, Button, onSubmit} = initForm();
        userEvent.type(Name, 'Антохолий');
        userEvent.type(Phone, "89270004466");
        userEvent.type(Address, "Адресссс");
        Button.click();
        expect(onSubmit.mock.calls.length).toBe(1);
    })
})