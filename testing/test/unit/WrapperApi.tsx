import {ProductShortInfo} from "../../src/common/types";
import {ExampleApi} from "../../src/client/api";
import {AxiosResponse} from "axios";

export class StoreFakeApi extends ExampleApi {
    async getProducts() {
        return [
            {id: 0, name: "Банан", price: 11},
            {id: 1, name: "Айфон", price: 99999}
        ] as unknown as AxiosResponse<ProductShortInfo[]>
    }
}