"use client";

import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import * as yup from 'yup';
import { gridSpacing } from 'store/constant';
import SubCard from '../cards/SubCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const validationSchema = yup.object({
    comments: yup.string(),
})

export default function ApprovalCard({setData, formRef, handleApproval, advanceId}) {
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState('');
    const advances = useSelector((state) => state.advances.advances);

    const advance = advances.find(advance => advance.id === advanceId);

    const formik = useFormik({
        initialValues: {
            comments: ''
        },
        validationSchema,
        onsubmit: (values) => {
            const { comments } = values;
            handleApproval(advance.id, false, comments);
        }
    })

    return (
        // <SubCard title="Travel Advance Approval" darkTitle>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="traveler"
                            name="traveler"
                            label="Traveler"
                            multiline
                            value={advance.traveler}
                            disabled
                        />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="officialStation"
                            name="officialStation"
                            label="Official Station"
                            multiline
                            value={advance.details.officialStation.town}
                            disabled
                        />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="dateOfTravel"
                            name="dateOfTravel"
                            label="Date Of Travel"
                            multiline
                            value={advance.details.dateOfTravel}
                            disabled
                        />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="destination"
                            name="destination"
                            label="Destination"
                            multiline
                            value={advance.details.destination.town}
                            disabled
                        />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="costCenter"
                            name="costCenter"
                            label="Cost Centre"
                            multiline
                            value={advance.details.costCenter.name}
                            disabled
                        />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="purpose"
                            name="purpose"
                            label="Purpose"
                            multiline
                            value={advance.details.purpose}
                            disabled
                        />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack>
                                <TextField
                            fullWidth
                            id="totalAmount"
                            name="totalAmount"
                            label="Total Amount"
                            multiline
                            value={advance.totalAmount}
                            disabled
                        />
                            </Stack>
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item container justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="error" onClick={() => handleApproval(advance.id, true)}>
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setShowComment(true)}
                        >
                            Reject
                        </Button>
                    </Stack>
                </Grid>
                {showComment && (
                    <Grid item xs={12} md={8}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="comments"
                                name="comments"
                                label="Comments"
                                multiline
                                value={formik.values.comments}
                                onBlur={formik.handleBlur}
                                error={formik.touched.comments && Boolean(formik.errors.comments)}
                                helperText={formik.touched.comments && formik.errors.comments}
                                onChange={formik.handleChange}
                                placeholder="Provide a reason for rejection"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: '16px' }}
                            >
                                Submit Rejection
                            </Button>
                        </form>
                    </Grid>
                )}
            </Grid>
        // </SubCard>
    );
}