import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Logo from "../../assets/images/logo.png";
import JobDashboardRoutes from "../../routes/JobDashboardRoutes";
import jobDashboardNav from "./SideBar/jobDashboardNav";
import {
  Link,
  useRouteMatch,
  NavLink,
  useLocation,
  Redirect,
} from "react-router-dom";
import { Collapse } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import { IoChevronBack } from "react-icons/io5";

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: '100%'
  },
  drawer: {
    backgroundColor: "#4917cd",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#4917cd",
    color: "#fff",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      color: "#0000",
      backgroundColor: "#ffffff",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing(3),
    marginRight: 0,
    [theme.breakpoints.up("sm")]: {
      marginRight: 20,
    },
  },
}));

const JobPortalDashBoardLayout = (props) => {
  const userData = useSelector((state) => state.user).data || {
    profileImage: "",
  };

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { url } = useRouteMatch();
  const location = useLocation();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = (link) => {
    if(link === open) {
      return setOpen(false);
    }
    setOpen(link);
  };

  if (
    userData?.role &&
    !userData?.clientRoute?.route?.find((r) => r.path === "/job-dashboard")
  ) {
    console.log(
      "Job portal!",
      !userData?.clientRoute?.route?.find((r) => r.path === "/job-dashboard")
    );
    return <Redirect to="/" />;
  }
  if (!userData?.role) {
    return <Preloader />;
  }

  console.log("open === link", open );
  const drawer = (
    <div>
      <div className="text-center py-4">
        <Link to="/">
          <img style={{ maxWidth: "70%" }} src={Logo} alt="" />
        </Link>
      </div>
      <List>
        {jobDashboardNav.map(({ label, link, Icon, children }) => (
          <>
           <ListItem
                component={NavLink} to={url + (link === '/' ? '' : link) }
                button key={label}
                onClick={() => children ? handleClick(link) : () => { }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
                {
                  children && (open === link  ? <ExpandLess /> : <ExpandMore />)

                }
              </ListItem>

              <Collapse in={(open === link)} timeout="auto" unmountOnExit>
                <List className="pl-2" component="div" disablePadding>
                  {
                    children?.map(({link:childLink, label:ChildLabel , Icon: ChildIcon}) => (
                      <ListItem
                        component={NavLink} exact to={url + childLink}
                        button key={ChildLabel}>
                        <ListItemIcon>
                          <ChildIcon />
                        </ListItemIcon>
                        <ListItemText primary={ChildLabel} />
                      </ListItem>
                    ))
                  }

                </List>
              </Collapse>
          </>
        ))}
        {userData?.role === "instructor" && (
          <ListItem
            component={NavLink}
            exact
            to="/instructor-dashboard"
            button
            key={"instructor-dashboard"}
          >
            <ListItemIcon>
              <IoChevronBack />
            </ListItemIcon>
            <ListItemText primary={"Back"} />
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const getPageName = (url = "") => {
    return (
      url
        .replace("job-dashboard", "")
        .replace(/\//g, "")
        .replace(/-/g, " ")
        .trim() || "Dashboard"
    );
  };
  document.title =
    getPageName(location.pathname)?.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    }) + " - Phitron";
  return (
    <div className="job-dashboard">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar elevation={0} position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className="text-capitalize"
              variant="h6"
              style={{ color: "#000" }}
              noWrap
            >
              {getPageName(location.pathname)}
            </Typography>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <JobDashboardRoutes />
        </main>
      </div>
    </div>
  );
};

JobPortalDashBoardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default JobPortalDashBoardLayout;