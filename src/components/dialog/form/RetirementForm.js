'use client';

import React, {useEffect, useState} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


// third-party
import * as yup from 'yup';
import {useFormik} from 'formik';

// project imports
import {gridSpacing} from 'store/constant';
import InputLabel from 'components/ui-component/extended/Form/InputLabel';
import Incidental from "../../ui-component/ta/incidental/Incidental";
import AddIncidental from "../../ui-component/ta/incidental/AddIncidental";
import TotalCard from "../../ui-component/ta/TotalCard";

// yup validation-schema
const validationSchema = yup.object({
    officialStation: yup.string().required('Official Station is Required'),
    email: yup.string().email('Enter a valid email').required('Email is Required'),
    phoneNumber: yup.string().min(10, 'Phone number should be of minimum 10 characters').required('Phone is Required'),
});

// ==============================|| RETIREMNT DETAILS ||============================== //

const RetirementForm = () => {
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            invoiceNumber: '',
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerAddress: '',
            orderStatus: 'pending'
        },
        validationSchema,
        onSubmit: (values) => {
            if (values) {
                setOpen(true);
            }
        }
    });

    // array of products
    const initialProducsData = [
        {
            id: 1,
            product: 'Logo Design',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            quantity: 6,
            amount: 200.0,
            total: 1200.0
        },
        {
            id: 2,
            product: 'Landing Page',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            quantity: 7,
            amount: 100.0,
            total: 700.0
        },
        {
            id: 3,
            product: 'Admin Template',
            description: 'lorem ipsum dolor sit amat, connecter adieu siccing eliot',
            quantity: 5,
            amount: 150.0,
            total: 750.0
        }
    ];

    const [allAmounts, setAllAmounts] = useState({
        subTotal: 0,
        appliedTaxValue: 0.1,
        appliedDiscountValue: 0.05,
        taxesAmount: 0,
        discountAmount: 0,
        totalAmount: 0
    });
    const [productsData, setProductsData] = useState(initialProducsData);

    const [valueBasic, setValueBasic] = React.useState(new Date());
    const [addItemClicked, setAddItemClicked] = useState(false);

    // calculates costs when order-details change
    useEffect(() => {
        const amounts = {
            subTotal: 0,
            appliedTaxValue: 0.1,
            appliedDiscountValue: 0.05,
            taxesAmount: 0,
            discountAmount: 0,
            totalAmount: 0
        };
        productsData.forEach((item) => {
            amounts.subTotal += item.total;
        });
        amounts.taxesAmount = amounts.subTotal * amounts.appliedTaxValue;
        amounts.discountAmount = (amounts.subTotal + amounts.taxesAmount) * amounts.appliedDiscountValue;
        amounts.totalAmount = amounts.subTotal + amounts.taxesAmount - amounts.discountAmount;
        setAllAmounts(amounts);
    }, [productsData]);

    // to delete row in order details
    const deleteProductHandler = (id) => {
        setProductsData(productsData.filter((item) => item.id !== id));
    };

    // Dialog Handler
    const handleDialogOk = () => {
        setOpen(false);
        formik.resetForm();
    };

    // add item handler
    const handleAddItem = (addingData) => {
        setProductsData([
            ...productsData,
            {
                id: addingData.id,
                product: addingData.name,
                description: addingData.desc,
                quantity: addingData.selectedQuantity,
                amount: addingData.amount,
                total: addingData.totalAmount
            }
        ]);

        setAddItemClicked(false);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <InputLabel required>Invoice Number</InputLabel>
                        <TextField
                            id="invoiceNumber"
                            name="invoiceNumber"
                            value={formik.values.invoiceNumber}
                            onBlur={formik.handleBlur}
                            error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                            helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
                            onChange={formik.handleChange}
                            fullWidth
                            placeholder="Invoice #"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <InputLabel required>Customer Name</InputLabel>
                        <TextField
                            fullWidth
                            id="customerName"
                            name="customerName"
                            value={formik.values.customerName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                            helperText={formik.touched.customerName && formik.errors.customerName}
                            placeholder="Alex Z."
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <InputLabel required>Customer Email</InputLabel>
                        <TextField
                            type="email"
                            fullWidth
                            id="customerEmail"
                            name="customerEmail"
                            value={formik.values.customerEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
                            helperText={formik.touched.customerEmail && formik.errors.customerEmail}
                            placeholder="alex@company.com"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <InputLabel required>Customer Contact Numer</InputLabel>
                        <TextField
                            type="number"
                            fullWidth
                            id="customerPhone"
                            name="customerPhone"
                            value={formik.values.customerPhone}
                            onBlur={formik.handleBlur}
                            error={formik.touched.customerPhone && Boolean(formik.errors.customerPhone)}
                            helperText={formik.touched.customerPhone && formik.errors.customerPhone}
                            onChange={formik.handleChange}
                            placeholder="+ 00 00000 00000"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack>
                        <InputLabel required>Customer Address</InputLabel>
                        <TextField
                            fullWidth
                            id="customerAddress"
                            name="customerAddress"
                            value={formik.values.customerAddress}
                            onBlur={formik.handleBlur}
                            error={formik.touched.customerAddress && Boolean(formik.errors.customerAddress)}
                            helperText={formik.touched.customerAddress && formik.errors.customerAddress}
                            onChange={formik.handleChange}
                            multiline
                            placeholder="Enter Address"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack>
                        <InputLabel required>Invoice Date</InputLabel>
                        <TextField
                            value={valueBasic}
                            onBlur={formik.handleBlur}
                            onChange={e =>  setValueBasic(e.target.value)}
                            placeholder="End Date"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack>
                        <InputLabel required>Status</InputLabel>
                        <Select
                            id="orderStatus"
                            name="orderStatus"
                            defaultValue={formik.values.orderStatus}
                            value={formik.values.orderStatus}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="refund">Refund</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                        </Select>
                        {formik.errors.orderStatus &&
                            <FormHelperText error>{formik.errors.orderStatus}</FormHelperText>}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                <Incidental productsData={productsData} deleteProductHandler={deleteProductHandler}/>

                {addItemClicked ? (
                    <Grid item xs={12}>
                        <AddIncidental handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked}/>
                    </Grid>
                ) : (
                    <Grid item>
                        <Button variant="text" onClick={() => setAddItemClicked(true)}>
                            + Add Item
                        </Button>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Divider/>
                </Grid>

                <TotalCard productsData={productsData} allAmounts={allAmounts}/>

                <Grid item xs={12}>
                    <Stack>
                        <InputLabel required>Terms and Condition:</InputLabel>
                        <TextField
                            fullWidth
                            id="customerAddress"
                            name="customerAddress"
                            defaultValue="I acknowledge terms and conditions."
                            multiline
                            placeholder="Enter Address"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item sx={{display: 'flex', justifyContent: 'flex-end'}} xs={12}>
                    <Button variant="contained" type="submit">
                        Add Invoice
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RetirementForm;
