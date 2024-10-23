import { combineReducers } from "redux";
import user_reducer from './user';
import token_reducer from './token';
import leftnav_reducer from './leftnav';
import orgs_reducer from './orgs';
import password_reducer from './password';
import marketplace_reducer from './marketplace';
import applications_reducer from './applications';
import sections_reducer from './sections';
import files_reducer from './files';
import compliance_reducer from './compliance';
import search_reducer from './search';
import devicewatch_reducer from './devicewatch';
import locations_reducer from './locations';
import tasks_reducer from './tasks';
import projects_reducer from './projects';
import cart_reducer from "./cart";
import mpackages_reducer from "./mpackages";
import lanscape_reducer from "./lanscape";
import policyportal_reducer from "./policyportal";
import supplier_reducer from "./supplier";
import corporate_reducer from "./corporate";
import validvalues_reducer from "./validvalues";
import domains_reducer from "./domains";

const rootReducer = combineReducers({
    user: user_reducer,
    token: token_reducer,
    leftnav: leftnav_reducer,
    orgs: orgs_reducer,
    supplier: supplier_reducer,
    password: password_reducer,
    marketplace: marketplace_reducer,
    applications: applications_reducer,
    catalog_sections: sections_reducer,
    files: files_reducer,
    compliance: compliance_reducer,
    search: search_reducer,
    devicewatch: devicewatch_reducer,
    locations: locations_reducer,
    tasks: tasks_reducer,
    projects: projects_reducer,
    cart: cart_reducer,
    mpackages: mpackages_reducer,
    lanscape: lanscape_reducer,
    corporate: corporate_reducer,
    policyportal: policyportal_reducer,
    validvalues: validvalues_reducer,
    domains: domains_reducer
});

export default rootReducer;
