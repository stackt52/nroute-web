"use client";
// project imports
import MainCard from "components/ui-component/cards/MainCard";
import { useSelector } from "react-redux";
// material-ui
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// project imports
import EarningCard from 'components/dashboard/Default/EarningCard';
import PopularCard from 'components/dashboard/Default/PopularCard';
import TotalOrderLineChartCard from 'components/dashboard/Default/TotalOrderLineChartCard';
import TotalIncomeDarkCard from 'components/ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'components/ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from 'components/dashboard/Default/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { roles } from "constants/index";

const DashboardPage = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title={`Welcome, ${currentUser.firstName} ${currentUser.lastName}`}>
      {
        !currentUser.role.includes(roles.ADMIN) && (
          <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} userId={currentUser.id} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} userId={currentUser.id} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} userId={currentUser.id}/>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard
                  {...{
                    isLoading,
                    label: 'Total Amount Reimbursed',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />,
                    userId: currentUser.id
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
        )
      } 
    </MainCard>
  );
};

export default DashboardPage;
