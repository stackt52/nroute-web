'use client';

import React, {useEffect, useRef} from 'react';

// material-ui
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import DepartmentDetails from './DepartmentDetails';
import Review from '../summary/Review';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import EmployeeDetails from "../employee/EmployeeDetails";
import {useDispatch} from "../../../../../store";
import {setSubmitCallback} from "../../../../../store/slices/dialog";
import {StepButton} from "@mui/material";

// step options
const steps = ['Department details', 'Employees', 'Summary'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, departmentData, setDepartmentData, departmentRef, employeeData, setEmployeeData, employeeRef) => {
    switch (step) {
        case 0:
            return (
                <DepartmentDetails
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    departmentData={departmentData}
                    setDepartmentData={setDepartmentData}
                    formRef={employeeRef}
                />
            );
        case 1:
            return (
                <EmployeeDetails
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    employeeData={employeeData}
                    setEmployeeData={setEmployeeData}
                />
            );
        case 2:
            return <Review/>;
        default:
            throw new Error('Unknown step');
    }
};

const NewDepartment = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [departmentData, setDepartmentData] = React.useState({});
    const [employeeData, setEmployeeData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);

    const departmentRef = useRef(null);
    const employeeRef = useRef(null);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
    };

    const handleStep = (index) => {
        switch (index) {
            case 0:
                departmentRef.current.click();
                break;
            case 1:
                employeeRef.current.click();
                break
            default:
                break;
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const label = activeStep === steps.length - 1 ? 'Submit' : 'Next'
        dispatch(setSubmitCallback({submitCallback: handleNext, submitButtonLabel: label}));
    }, [activeStep]);

    return (
        <>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label, index) => {
                    const labelProps = {};

                    if (index === errorIndex) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Error
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepButton color="inherit" onClick={() => handleStep(index)}>
                                {label}
                            </StepButton>
                            {/*<StepLabel {...labelProps}>{label}</StepLabel>*/}
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            New department created.
                        </Typography>
                        <Typography variant="subtitle1">
                            You have successfully created a new department!.
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setDepartmentData({});
                                        setEmployeeData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{my: 3, ml: 1}}
                                >
                                    Reset
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </>
                ) : (
                    <>
                        {getStepContent(
                            activeStep,
                            handleNext,
                            handleBack,
                            setErrorIndex,
                            departmentData,
                            setDepartmentData,
                            departmentRef,
                            employeeData,
                            setEmployeeData,
                            employeeRef)
                        }
                        {activeStep === steps.length - 1 && (
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{my: 3, ml: 1}}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleNext} sx={{my: 3, ml: 1}}>
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </>
                )}
            </>
        </>
    );
};

export default NewDepartment;
