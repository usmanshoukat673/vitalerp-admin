import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Singup from './components/auth/signup/Signup';
import ForgotPassword from './components/auth/forgot-password/ForgotPassword';
import ResetPassword from './components/auth/forgot-password/ResetPassword';
import NotFound from './components/NotFound/NotFound';

// User is LoggedIn
import PrivateRoute from './PrivateRoute';
import PrivateOnboardingRoute from './PrivateOnboardingRoute';
import PrivateUserRoute from './PrivateUserRoute';
import AuthRoute from './AuthRoute';
import PoliciesRoute from './PoliciesRoute';
import PolicyPortalRoute from './PolicyPortalRoute';
import PrivateTokenRoute from './PrivateTokenRoute';
import PrivateFullScreenRoute from './PrivateFullScreenRoute';
import SharedWhistleRoute from './SharedWhistleRoute';
import PolicyPortalAuthRoute from './PolicyPortalAuthRoute';
import CoporateProfileManagement from './components/Corporate/CoporateProfileManagement.jsx';
import VerifyLoginEmailOTP from './components/auth/login/VerifyLoginEmailOTP.jsx';
import Agreement from './components/select-org/Agreement.jsx';
import Dashboard from './components/dashboard/index.jsx';
const SupplierSettings = React.lazy(() => import('./components/SupplierSettings/index.jsx'));
const LaborCategories = React.lazy(() => import('./components/LaborCategories/index.jsx'));
const DomainManagement = React.lazy(() => import('./components/DomainManagement/index.jsx'));
// import Dashboard from './components/dashboard/Dashboard';
 
const Profile = React.lazy(() => import('./components/user/Profile'));
const OrgProfile = React.lazy(() => import('./components/organizations/OrgProfile/OrgProfile'));
const JoinNewUser = React.lazy(() => import('./components/auth/join/JoinNewUser'));
const AcceptInvitation = React.lazy(() => import('./components/accept-invitation/AcceptInvitation'));
const ChooseOrganization = React.lazy(() => import('./components/select-org/ChooseOrganization'));
const SingupSuccess = React.lazy(() => import('./components/auth/signup/SingupSuccess'));
const ChangeCurrentPassword = React.lazy(() => import('./components/select-org/ChangeCurrentPassword'));
const VerifyOTP = React.lazy(() => import('./components/auth/login/VerifyOTP'));

const EnableMFA = React.lazy(() => import('./components/select-org/EnableMFA'));
const VerifyMFA = React.lazy(() => import('./components/select-org/VerifyMFA'));
const ChangeExpiredPassword = React.lazy(() => import('./components/select-org/ChangeExpiredPassword'));

const ConfigureMFA = React.lazy(() => import('./components/MFA/ConfigureMFA'));
const VerifyMFAOTP = React.lazy(() => import('./components/MFA/VerifyMFAOTP'));

const MSOffice365Settings = React.lazy(() => import('./components/applications/office365/MSOffice365Settings'));
const MSOffice365Callback = React.lazy(() => import('./components/applications/office365/MSOffice365Callback'));
const SearchLanding = React.lazy(() => import('./components/search/SearchLanding'));
const DeviceWatch = React.lazy(() => import('./components/DeviceWatch/DeviceWatch'));
const DeviceWatchView = React.lazy(() => import('./components/DeviceWatch/DeviceWatchView'));
const RiskRegister = React.lazy(() => import('./components/risk-register/RiskRegister'));
const RiskPlanner = React.lazy(() => import('./components/risk-register/RiskPlanner'));
const ConfirmOrganization = React.lazy(() => import('./components/setup-wizard/ConfirmOrganization'));
const AddingPeoples = React.lazy(() => import('./components/setup-wizard/AddingPeoples'));
const VerifyOrgUsers = React.lazy(() => import('./components/setup-wizard/VerifyOrgUsers'));
const AssignWork = React.lazy(() => import('./components/setup-wizard/AssignWork'));
// const ComplianceV2 = React.lazy(() => import('./components/compliance20/Projects'));

const CombinedDashboard = React.lazy(() => import('./components/dashboard/CombinedDashboard'));
const Reports = React.lazy(() => import('./components/reports/Reports'));
const WorkBench = React.lazy(() => import('./components/Tasks/WorkBench'));
const Kanban = React.lazy(() => import('./components/Tasks/Board'));

const TaskDetailsFullScreen = React.lazy(() => import('./components/Tasks/Details/TaskDetailsFullScreen'));
const ModifyTask = React.lazy(() => import('./components/Tasks/Details/ModifyTask'));
const CreateTaskFullScreen = React.lazy(() => import('./components/Tasks/Board/CreateTaskFullScreen'));
const ProjectTaskGanttChart = React.lazy(() => import('./components/Projects/Gantt/ProjectTaskGanttChart'));
const Projects = React.lazy(() => import('./components/Projects'));
// import ProjectDashboardPage from './components/dashboard/Project';
const ProjectDetail = React.lazy(() => import('./components/Projects/Detail'));
const AddProjectFS = React.lazy(() => import('./components/Projects/Add/AddProjectFS'));
const PrivacyPolicy = React.lazy(() => import('./components/Policies/PrivacyPolicy'));
const CookiePolicy = React.lazy(() => import('./components/Policies/CookiePolicy'));
const About = React.lazy(() => import('./components/Policies/About'));
const TermsCondictions = React.lazy(() => import('./components/Policies/TermsCondictions'));
const SignupForFree = React.lazy(() => import('./components/auth/signup/SignupForFree'));
const VerifyEmailOTP = React.lazy(() => import('./components/auth/signup/VerifyEmailOTP'));
const BuildChoice = React.lazy(() => import('./components/auth/signup/BuildChoice'));
const CreateAccountPassword = React.lazy(() => import('./components/auth/signup/CreateAccountPassword'));
const Store = React.lazy(() => import('./components/store/Store'));
const Cart = React.lazy(() => import('./components/store/cart/Cart'));
const Billing = React.lazy(() => import('./components/store/billing/Billing'));
const PaymentSuccess = React.lazy(() => import('./components/store/cart/PaymentSuccess'));
const WhistleLanding = React.lazy(() => import('./components/whistleportal/WhistleLanding'));
const WhistleCreateReport = React.lazy(() => import('./components/whistleportal/WhistleCreateReport'));
const WhistleReportSent = React.lazy(() => import('./components/whistleportal/WhistleReportSent'));
const WhistleCheckReport = React.lazy(() => import('./components/whistleportal/WhistleCheckReport'));
const PolicyPanel = React.lazy(() => import('./components/policy-panel/PolicyPanel'));
const PolicyPortalLogin = React.lazy(() => import('./components/auth/pp-login/PolicyPortalLogin'));
const VerifyPPEmailOTP = React.lazy(() => import('./components/auth/pp-login/VerifyPPEmailOTP'));
const PPStandard = React.lazy(() => import('./components/policy-panel/Standard/PPStandard'));
const PPControlsPlaceholder = React.lazy(() => import('./components/policy-panel/Standard/PPControlsPlaceholder'));

const Main = () => (
    <Switch>

        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/' component={Login} />
        <AuthRoute exact path='/signup' component={Singup} />

        {/* <AuthRoute exact path='/signup-for-free' component={SignupForFree} /> */}
        {/* <AuthRoute exact path='/signup-for-free/verify/:email' component={VerifyEmailOTP} /> */}
        {/* <AuthRoute exact path='/build-choice/:email' component={BuildChoice} /> */}
        {/* <AuthRoute exact path='/create-account/:email' component={CreateAccountPassword} /> */}

        <AuthRoute exact path='/password-recovery' component={ForgotPassword} />
        <AuthRoute exact path='/reset-password/:resettoken' component={ResetPassword} />
        <AuthRoute exact path='/signup/success/:email' component={SingupSuccess} />
        <AuthRoute exact path='/join/:_token/:email' component={JoinNewUser} />

        {/* <PolicyPortalAuthRoute exact path='/:portal_link/policy-panels-login' component={PolicyPortalLogin} />
        <PolicyPortalAuthRoute exact path='/:portal_link/policy-panels/:email/:unique_id' component={VerifyPPEmailOTP} />
        <PolicyPortalRoute exact path='/policy-panels/:portal_link/introduction' component={PolicyPanel} />
        <PolicyPortalRoute exact path='/policy-panels/:portal_link/pp/:standard_name' component={PPStandard} />
        <PolicyPortalRoute exact path='/policy-panels/:portal_link/pp/:standard_name/:domain_name' component={PPControlsPlaceholder} /> */}

        {/* <SharedWhistleRoute exact path='/whistle/:id' component={WhistleLanding} />
        <SharedWhistleRoute exact path='/whistle/r/:id' component={WhistleCreateReport} />
        <SharedWhistleRoute exact path='/whistle/c/:id' component={WhistleCheckReport} />
        <SharedWhistleRoute exact path='/whistle/s/:id/:report_id' component={WhistleReportSent} /> */}

        <PoliciesRoute exact path='/privacy-policy' component={PrivacyPolicy} />
        <PoliciesRoute exact path='/cookie-policy' component={CookiePolicy} />
        <PoliciesRoute exact path='/terms' component={TermsCondictions} />
        <PoliciesRoute exact path='/about' component={About} />

        {/* User is LoggedIn*/}
        <PrivateOnboardingRoute exact path='/select-organization/:action?' component={ChooseOrganization} />
        <PrivateOnboardingRoute exact path='/user/change-password' component={ChangeCurrentPassword} />
        <PrivateOnboardingRoute exact path='/user/password-expired' component={ChangeExpiredPassword} />
        <PrivateOnboardingRoute exact path='/user/agreement' component={Agreement} />
        <PrivateOnboardingRoute exact path='/user/enable-mfa' component={EnableMFA} />
        <PrivateOnboardingRoute exact path='/user/verify-phone/:token' component={VerifyMFA} />
        <PrivateOnboardingRoute exact path='/accept/:_token/:email' component={AcceptInvitation} />

        <PrivateTokenRoute exact path='/verify-login-email-otp' component={VerifyLoginEmailOTP} />
        <PrivateTokenRoute exact path='/verify-otp/:token/:unique_id' component={VerifyOTP} />
        <PrivateTokenRoute exact path='/configure-mfa' component={ConfigureMFA} />
        <PrivateTokenRoute exact path='/verify-mfa-otp' component={VerifyMFAOTP} />

        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        {/* <PrivateRoute exact path='/analytics' component={ProjectDashboardPage} /> */}

        <PrivateUserRoute exact path='/settings/user/:action?/:action_id?' component={Profile} />
        <PrivateRoute exact path='/:name/organization-settings/general' component={CombinedDashboard} />
        <PrivateRoute exact path='/:name/organization-settings/locations' component={CombinedDashboard} />
        <PrivateRoute exact path='/:name/organization-settings/suppliers' component={CombinedDashboard} />


        <PrivateRoute exact path='/:name/organization-settings/profile' component={OrgProfile} />
        <PrivateRoute exact path='/:name/organization-settings/activities' component={CombinedDashboard} />
        <PrivateRoute exact path='/:name/organization-settings/user-accounts/invite-user' component={CombinedDashboard} />
        <PrivateRoute exact path='/:name/organization-settings/preferences' component={CombinedDashboard} />
        <PrivateRoute exact path='/:name/organization-settings/notifications' component={CombinedDashboard} />

        {/* <PrivateRoute exact path='/:name/files/:document_id' component={FileManager} />

        <PrivateRoute exact path='/:name/filemanager/home' component={Files} />
        <PrivateRoute exact path='/:name/filemanager/task-files/:document_id' component={Files} />
        <PrivateRoute exact path='/:name/filemanager/project-files/:document_id' component={Files} />
        <PrivateRoute exact path='/:name/filemanager/myfiles/:document_id' component={Files} />
        <PrivateRoute exact path='/:name/filemanager/section/:section_id' component={Files} />
        <PrivateRoute exact path='/:name/filemanager/recent' component={Files} />
        <PrivateRoute exact path='/:name/filemanager/all-domains' component={Files} /> */}

        {/* <PrivateRoute exact path='/:name/projects/list' component={Projects} /> */}
        {/* <PrivateRoute exact path='/:name/projects/details/:id' component={ProjectDetail} /> */}
        {/* <PrivateRoute exact path='/:name/workbench/projects/list' component={WorkBench} /> */}

        {/* <PrivateRoute exact path='/:name/workbench/projects/gantt/:selected_project' component={ProjectTaskGanttChart} /> */}

        {/* <PrivateFullScreenRoute exact path='/:name/projects/create' component={AddProjectFS} /> */}
        {/* <PrivateRoute exact path='/:name/workbench/projects/details/:project_id' component={WorkBench} /> */}

        {/* <PrivateRoute exact path='/:name/workbench/list' component={WorkBench} /> */}
        {/* <PrivateRoute exact path='/:name/workbench/tasks/kanban/:selected_project' component={Kanban} /> */}
        {/* <PrivateRoute exact path='/:name/workbench/list/add' component={WorkBench} /> */}
        {/** <PrivateRoute exact path='/:name/workbench/list/details/:task_id' component={WorkBench} /> */}
        {/* <PrivateFullScreenRoute exact path='/:name/workbench/tasks/details/:task_id' component={TaskDetailsFullScreen} /> */}
        {/* <PrivateFullScreenRoute exact path='/:name/workbench/task/modify/:task_id' component={ModifyTask} /> */}
        {/* <PrivateFullScreenRoute exact path='/:name/workbench/task/add/:status?' component={CreateTaskFullScreen} /> */}

        {/* <PrivateRoute exact path='/:name/device-watch' component={DeviceWatch} /> */}
        {/* <PrivateRoute exact path='/:name/device-watch/view/:name?' component={DeviceWatchView} /> */}

        <PrivateRoute exact path='/store/:store_type' component={Store} />
        <PrivateRoute exact path='/store/subscription/products' component={Cart} />
        <PrivateRoute exact path='/store/subscription/payment/success' component={PaymentSuccess} />
        {/* <PrivateRoute exact path='/store/subscription/payment/canceled' component={Cart} /> */}
        <PrivateRoute exact path='/store/subscription/billing' component={Billing} />

        {/* Vital ERP Form */}
        <PrivateRoute exact path='/:name/corporate-profile/:supplier_name/corporate-information' component={CoporateProfileManagement} />
        <PrivateRoute exact path='/:name/corporate-profile/:supplier_name/capability' component={CoporateProfileManagement} />
        <PrivateRoute exact path='/:name/corporate-profile/:supplier_name/socioenomic' component={CoporateProfileManagement} />
        <PrivateRoute exact path='/:name/corporate-profile/:supplier_name/security-and-certifications' component={CoporateProfileManagement} />
        <PrivateRoute exact path='/:name/corporate-profile/:supplier_name/past-performance' component={CoporateProfileManagement} />

        {/*  Vital ERP labor categories  */}
        <PrivateRoute exact path='/:name/labor-categories' component={LaborCategories} />

        {/*  Vital ERP Supplier Settings  */}
        <PrivateRoute exact path='/:supplier_name/supplier-settings/general' component={SupplierSettings} />
        <PrivateRoute exact path='/:supplier_name/supplier-settings/locations' component={SupplierSettings} />
        <PrivateRoute exact path='/:supplier_name/supplier-settings/users' component={SupplierSettings} />

        {/* Vital ERP Domains */}
        <PrivateRoute exact path='/:name/domains' component={DomainManagement} />
        {/* <PrivateRoute exact path='/:name/all/suppliers' component={DomainManagement} /> */}

        <PrivateRoute exact path='/:name/onboarding/confirm-organization' component={ConfirmOrganization} />
        <PrivateRoute exact path='/:name/onboarding/organization-users' component={VerifyOrgUsers} />
        <PrivateRoute exact path='/:name/onboarding/adding-peoples' component={AddingPeoples} />
        <PrivateRoute exact path='/:name/onboarding/assign-responsibilities' component={AssignWork} />

        <PrivateRoute exact path='/:name/application/office365/settings' component={MSOffice365Settings} />
        <PrivateRoute exact path='/application/office365/settings/callback' component={MSOffice365Callback} />

        <PrivateRoute exact path='/:name/search' component={SearchLanding} />

        <PrivateRoute exact path='/:name/issue-tracker' component={RiskRegister} />
        <PrivateRoute exact path='/:name/poam' component={RiskPlanner} />

        <PrivateRoute exact path='/:name/reports' component={Reports} />

        {/*Page Not Found*/}
        <Route component={NotFound} />
    </Switch>
);
export default Main;