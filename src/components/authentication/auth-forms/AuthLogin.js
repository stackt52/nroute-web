"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// third party
import * as Yup from "yup";

// project imports
import AnimateButton from "components/ui-component/extended/AnimateButton";
import { login } from "store/slices/authSlice";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ ...others }) => {
  const theme = useTheme();
  const router = useRouter();

  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(true);

    const [loginError, setLoginError] = React.useState(null);


  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "admin@example.com",
      password: "admin123",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(login(values));
        if (login.fulfilled.match(resultAction)) {
          setLoginError(null);
          router.push("/dashboard");
        } else {
          setLoginError(resultAction.payload);
        }
      } catch (error) {
        setLoginError("An error occurred. Please try again.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...others}>
      <FormControl
        fullWidth
        error={Boolean(formik.touched.email && formik.errors.email)}
        sx={{ ...theme.typography.customInput }}
      >
        <InputLabel htmlFor="outlined-adornment-email-login">
          Email Address
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={formik.values.email}
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{}}
        />
        {formik.touched.email && formik.errors.email && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {formik.errors.email}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={Boolean(formik.touched.password && formik.errors.password)}
        sx={{ ...theme.typography.customInput }}
      >
        <InputLabel htmlFor="outlined-adornment-password-login">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{}}
          label="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <FormHelperText error id="standard-weight-helper-text-password-login">
            {formik.errors.password}
          </FormHelperText>
        )}
      </FormControl>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Keep me logged in"
          />
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            component={Link}
            href="/forgot-password"
            color="secondary"
            sx={{ textDecoration: "none" }}
          >
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      {loginError && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{loginError}</FormHelperText>
        </Box>
      )}

      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            color="secondary"
            type="submit"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            variant="contained"
          >
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
};

export default JWTLogin;
