import React, { Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router";

const JobApplications = React.lazy(() =>
  import("../views/pages/JobDashboard/JobApplications")
);
const PrimaryScreening = React.lazy(() =>
  import("../views/pages/JobDashboard/PrimaryScreening")
);
const PrimaryInterview = React.lazy(() =>
  import("../views/pages/JobDashboard/PrimaryInterview")
);
const TalentPool = React.lazy(() =>
  import("../views/pages/JobDashboard/TalentPool")
);
const IntTalentPool = React.lazy(() =>
  import("../views/pages/JobDashboard/IntTalentPool")
);
const JpiReview = React.lazy(() =>
  import("../components/JobPortal/JpiReview/JpiReview")
);
const AddJob = React.lazy(() =>
  import("../components/Forms/JobPortal/AddJob/AddJob")
);
const AddJobDetails = React.lazy(() =>
  import("../components/Forms/JobPortal/AddJobDetails/AddJobDetails")
);
const JobCircular = React.lazy(() =>
  import("../components/Forms/JobPortal/JobCircular/JobCirculars")
);

const ScheduleDashboard = React.lazy(() =>
  import("../views/pages/JobDashboard/ScheduleDashboard")
);

const GotHired = React.lazy(() => import("../views/pages/JobDashboard/GotHired")) ;

const JobDashboardRoutes = () => {
  let { path } = useRouteMatch();

  return (
    <Suspense fallback={""}>
      <Switch>
        <Route exact path={`${path}`} component={ScheduleDashboard} />
        <Route
          path={`${path}/primary-screening`}
          component={PrimaryScreening}
        />
        <Route
          path={`${path}/primary-interview`}
          component={PrimaryInterview}
        />
        <Route
          path={`${path}/talent-pool`}
          component={TalentPool}
        />
        <Route
          path={`${path}/int-talent-pool`}
          component={IntTalentPool}
        />
        <Route
          path={`${path}/jpi-review`}
          component={JpiReview}
        />
        <Route
          path={`${path}/add-job`}
          component={AddJobDetails}
        />
        {/* <Route
          path={`${path}/add-job-details`}
          component={AddJobDetails}
        /> */}
        <Route
          path={`${path}/job-circular`}
          component={JobCircular}
        />
         <Route
          path={`${path}/got-hired`}
          component={GotHired}
        />
        <Route
          path={`${path}/job-applications`}
          component={JobApplications}
        />
      </Switch>
    </Suspense>
  );
};

export default JobDashboardRoutes;
