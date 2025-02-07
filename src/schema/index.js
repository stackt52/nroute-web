import * as yup from 'yup';

const TADetails = yup.object({
    officialStation: yup.object().required('Official Station is required'),
    dateOfTravel: yup.date().required(),
    destination: yup.object().required('Destination is required'),
    costCenter: yup.object().required('Cost center is required'),
    purpose: yup.string().required('Purpose is required')
});

const Incidental = yup.object({
    location: yup.object().required('Location is required'),
    startDate: yup.date().default(new Date()).required('Start date is required'),
    endDate: yup.date().default(null)
        .when("startDate",
            (startDate, yup) =>
                startDate && yup.min(startDate, "End date cannot be before start date")),
    rate: yup.string().required('Rate is required'),
    amount: yup.number().required('Amount is required'),
});

export {TADetails, Incidental}