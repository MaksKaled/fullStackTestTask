
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DirectorsTable from "./Postgres-tables/DirectorsTable";

function Dashboard() {


  return (
    <DashboardLayout>
      <SoftBox
      display="flex"
      flexDirection="column"
      minHeight="93vh"
      >
      <DashboardNavbar />
      <SoftBox flex="1" py={3}>
        <SoftBox mb={3}>
          
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              
            </Grid>
            <Grid item xs={12} lg={5}>
              
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
          <DirectorsTable />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
           
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox position="sticky" bottom={0}>
      <Footer />
      </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
