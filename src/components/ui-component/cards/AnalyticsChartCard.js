'use client';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from './MainCard';

// assets
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ==========================|| ANALYTICS CHART CARD ||========================== //

const AnalyticsChartCard = ({ title, chartData, dropData, listData }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  let dropHtml;
  if (dropData) {
    const handleClick = (event) => {
      setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    dropHtml = (
      <>
        <Button variant="text" disableElevation size="small" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {dropData.title}
        </Button>
        <Menu
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {dropData?.options.map((option, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  let listItem;
  if (listData) {
    listItem = listData.map((item, index) => (
      <Grid item key={index} sm={12}>
        <Box
          sx={{
            color: item.color
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item>{item.icon}</Grid>
            <Grid item>
              <Typography variant="subtitle1">{item.value}%</Typography>
            </Grid>
            <Grid item>
              {item.state === 1 && <ArrowUpwardIcon fontSize="inherit" color="inherit" sx={{ mt: 0.5 }} />}
              {item.state === 0 && <ArrowDownwardIcon fontSize="inherit" color="inherit" sx={{ mt: 0.5 }} />}
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {item.percentage}%
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    ));
  }

  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center">
        {title && (
          <Grid item>
            <Typography variant="subtitle1">{title}</Typography>
          </Grid>
        )}
        <Grid item>{dropHtml}</Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item container direction="column" spacing={1} xs={12} sm={6}>
          <Box
            sx={{
              mt: 3,
              display: 'block'
            }}
          >
            {listItem}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type={chartData.options?.chart?.type}
            height={chartData.options?.chart?.height}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

AnalyticsChartCard.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.object,
  dropData: PropTypes.object,
  listData: PropTypes.array
};

export default AnalyticsChartCard;
