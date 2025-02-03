// menu import
import dashboardPage from './dashboard-page';
import pages from './pages';
import travelPage from "./travel-page";
import retirementPage from "./retirement-page";
import settingPage from "./setting-page";
import travelAuthPage from "./travel-auth-page";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        dashboardPage,
        // travelPage,
        travelAuthPage,
        retirementPage,
        settingPage,
        // pages
    ]
};

export default menuItems;
