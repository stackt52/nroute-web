// third-party
import {createSlice} from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';
import {dispatch} from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    customers: [],
    orders: [],
    products: [],
    productreviews: [],
    invoices: []
};

const  orders = [
        {
            id: "790841",
            name: "Joseph William 1",
            company: "Toronto",
            type: "Credit Card",
            qty: 2500,
            date: "12.07.2018",
            status: 3
        },
        {
            id: "790842",
            name: "Anshan Handgun 2",
            company: "Toronto",
            type: "Paytm",
            qty: 5000,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "798699",
            name: "Larry Doe 3",
            company: "Toronto",
            type: "Net Banking",
            qty: 2500,
            date: "12.07.2018",
            status: 1
        },
        {
            id: "790752",
            name: "Sara Soudan 4",
            company: "Toronto",
            type: "Upi",
            qty: 5000,
            date: "12.07.2018",
            status: 1
        },
        {
            id: "790955",
            name: "Joseph William 5",
            company: "Toronto",
            type: "Credit Card",
            qty: 2500,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "790785",
            name: "Anshan Handgun 6",
            company: "Toronto",
            type: "Upi",
            qty: 5000,
            date: "12.07.2018",
            status: 3
        },
        {
            id: "800837",
            name: "Larry Doe 7",
            company: "Toronto",
            type: "Paytm",
            qty: 2500,
            date: "12.07.2018",
            status: 3
        },
        {
            id: "810365",
            name: "Sara Soudan 8",
            company: "Toronto",
            type: "Net Banking",
            qty: 5000,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "810814",
            name: "Sara Soudan 20",
            company: "Toronto",
            type: "Upi",
            qty: 2500,
            date: "12.07.2018",
            status: 1
        },
        {
            id: "820385",
            name: "Joseph William 9",
            company: "Toronto",
            type: "Net Banking",
            qty: 5000,
            date: "12.07.2018",
            status: 1
        },
        {
            id: "820885",
            name: "Anshan Handgun 10",
            company: "Toronto",
            type: "Credit Card",
            qty: 2500,
            date: "12.07.2018",
            status: 1
        },
        {
            id: "830390",
            name: "Larry Doe 11",
            company: "Toronto",
            type: "Paytm",
            qty: 5000,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "830879",
            name: "Sara Soudan 12",
            company: "Toronto",
            type: "Upi",
            qty: 2500,
            date: "12.07.2018",
            status: 3
        },
        {
            id: "900111",
            name: "Joseph William 13",
            company: "Toronto",
            type: "Upi",
            qty: 5000,
            date: "12.07.2018",
            status: 3
        },
        {
            id: "900836",
            name: "Anshan Handgun 14",
            company: "Toronto",
            type: "Credit Card",
            qty: 2500,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "900112",
            name: "Larry Doe 15",
            company: "Toronto",
            type: "Paytm",
            qty: 5000,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "900871",
            name: "Sara Soudan 16",
            company: "Toronto",
            type: "Upi",
            qty: 2500,
            date: "12.07.2018",
            status: 1
        },
        {
            id: "910232",
            name: "Joseph William 17",
            company: "Toronto",
            type: "Upi",
            qty: 5000,
            date: "12.07.2018",
            status: 2
        },
        {
            id: "910886",
            name: "Anshan Handgun 18",
            company: "Toronto",
            type: "Credit Card",
            qty: 2500,
            date: "12.07.2018",
            status: 3
        },
        {
            id: "910232",
            name: "Larry Doe 19",
            company: "Toronto",
            type: "Net Banking",
            qty: 5000,
            date: "12.07.2018",
            status: 2
        }
    ];

const slice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getCustomersSuccess(state, action) {
            state.customers = action.payload;
        },

        // GET ORDERS
        getOrdersSuccess(state, action) {
            state.orders = action.payload;
        },

        // GET PRODUCTS
        getProductsSuccess(state, action) {
            state.products = action.payload;
        },

        // GET PRODUCT REVIEWS
        getProductReviewsSuccess(state, action) {
            state.productreviews = action.payload;
        },

        // GET INVOICE DATA
        getInvoiceSuccess(state, action) {
            state.invoices = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCustomers() {
    return async () => {
        try {
            const response = await axios.get('/api/customer/list');
            dispatch(slice.actions.getCustomersSuccess(response.data.customers));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOrders() {
    return async () => {
        try {
            // const response = await axios.get('/api/customer/order/list');
            // dispatch(slice.actions.getOrdersSuccess(response.data.orders));
            dispatch(slice.actions.getOrdersSuccess(orders));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getInvoice() {
    return async () => {
        try {
            const response = await axios.get('/api/invoice/list');
            dispatch(slice.actions.getInvoiceSuccess(response.data.invoice));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProducts() {
    return async () => {
        try {
            const response = await axios.get('/api/customer/product/list');
            dispatch(slice.actions.getProductsSuccess(response.data.products));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProductReviews() {
    return async () => {
        try {
            const response = await axios.get('/api/customer/product/reviews');
            dispatch(slice.actions.getProductReviewsSuccess(response.data.productreviews));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
