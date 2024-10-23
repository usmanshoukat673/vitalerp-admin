import * as actionTypes from './types';

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            activeUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
    }
}

export const setToken = token => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: {
            activeToken: token
        }
    }
}

export const clearToken = () => {
    return {
        type: actionTypes.CLEAR_TOKEN,
    }
}


export const openLeftNave = () => {
    return {
        type: actionTypes.OPEN_LEFT_NAV
    }
}


export const closeLeftNav = () => {
    return {
        type: actionTypes.CLOSE_LEFT_NAV
    }
}

export const openSubLeftNave = () => {
    return {
        type: actionTypes.OPEN_SUB_LEFT_NAV
    }
}

export const toggleSubLeftNave = open_sub => {
    return {
        type: actionTypes.TOGGLE_SUB_LEFT_NAV,
        payload: {
            open_sub: open_sub
        }
    }
}

export const toggleRightSideDocs = open_documents_menu => {
    return {
        type: actionTypes.TOGGLE_RIGHT_SIDE_DOCUMENTS,
        payload: {
            open_documents_menu: open_documents_menu
        }
    }
}

export const closeSubLeftNav = () => {
    return {
        type: actionTypes.CLOSE_SUB_LEFT_NAV
    }
}

export const toggleSideMenuXButton = sub_menu_x_btn => {
    return {
        type: actionTypes.TOGGLE_SUB_MENU_X_BUTTON,
        payload: {
            sub_menu_x_btn: sub_menu_x_btn
        }
    }
}

export const setUserNewDevice = new_device => {
    return {
        type: actionTypes.SET_USER_NEW_DEVICE,
        payload: {
            new_device: new_device
        }
    }
}

export const setDeviceAssignStatus = device_newly_assigned => {
    return {
        type: actionTypes.SET_DEVICE_ASSIGNED_STATUS,
        payload: {
            device_newly_assigned: device_newly_assigned
        }
    }
}

export const setLocationStatus = new_location => {
    return {
        type: actionTypes.SET_LOCATION_STATUS,
        payload: {
            new_location: new_location
        }
    }
}

export const setCompanies = companies => {
    return {
        type: actionTypes.SET_ORGS,
        payload: {
            companies: companies
        }
    }
}

export const setProfileCompany = company => {
    return {
        type: actionTypes.SET_PROORG,
        payload: {
            profile_company: company
        }
    }
}

export const setCompany = company => {
    return {
        type: actionTypes.SELECT_ORG,
        payload: {
            company: company
        }
    }
}
export const clearCompany = () => {
    return {
        type: actionTypes.CLEAR_COMPANY,

    }
}

export const setPWDRotation = rotation => {
    return {
        type: actionTypes.SET_PWD_ROTATION,
        payload: {
            password: rotation
        }
    }
}

export const clearPWDRotation = () => {
    return {
        type: actionTypes.CLEAR_PWD_ROTATION,
    }
}


export const selecteMKCategory = category => {
    return {
        type: actionTypes.SELECT_MK_CATEGORY,
        payload: {
            category: category
        }
    }
}

export const clearMKCategory = () => {
    return {
        type: actionTypes.CLEAR_MK_CATEGORY,
    }
}

export const selecteApp = app => {
    return {
        type: actionTypes.SELECT_APP,
        payload: {
            app: app
        }
    }
}

export const clearApp = () => {
    return {
        type: actionTypes.CLEAR_APP,
    }
}

export const setCatalogSections = sections => {
    return {
        type: actionTypes.SET_CATALOG_SECTIONS,
        payload: {
            sections: sections
        }
    }
}

export const selectCatalogSection = section => {
    return {
        type: actionTypes.SELECT_CATALOG_SECTION,
        payload: {
            section: section
        }
    }
}

export const selectCatalogParentSection = psection => {
    return {
        type: actionTypes.SELECT_CATALOG_PARENT_SECTION,
        payload: {
            psection: psection
        }
    }
}

export const unsetCatalogSections = () => {
    return {
        type: actionTypes.UNSET_CATALOG_SECTIONS,
    }
}

export const setControlFunctions = control_functions => {
    return {
        type: actionTypes.SET_CTR_FUNCTIONS,
        payload: {
            control_functions: control_functions
        }
    }
}

export const unsetControlFunctions = () => {
    return {
        type: actionTypes.UNSET_CTR_FUNCTIONS,
    }
}

export const setParentSections = parent_sections => {
    return {
        type: actionTypes.SET_PARENT_SECTIONS,
        payload: {
            parent_sections: parent_sections
        }
    }
}

export const unsetParentSections = () => {
    return {
        type: actionTypes.UNSET_PARENT_SECTIONS,
    }
}


export const selectControlFunction = control_function => {
    return {
        type: actionTypes.SELECT_CONTROL_FUNCTION,
        payload: {
            control_function: control_function
        }
    }
}

export const selectStandard = standard => {
    return {
        type: actionTypes.SELECT_STANDARD,
        payload: {
            standard: standard
        }
    }
}

export const setFilesDocuments = documents => {
    return {
        type: actionTypes.SET_FILES_DOCUMENTS,
        payload: {
            documents: documents
        }
    }
}

export const unSetFilesDocuments = () => {
    return {
        type: actionTypes.UNSET_FILES_DOCUMENTS
    }
}

export const setMaturityLevels = maturity_levels => {
    return {
        type: actionTypes.SET_MATURITY_LEVELS,
        payload: {
            maturity_levels: maturity_levels
        }
    }
}

export const setMaturityLevel = maturity_level => {
    return {
        type: actionTypes.SET_MATURITY_LEVEL,
        payload: {
            maturity_level: maturity_level
        }
    }
}

export const unsetMaturityLevels = () => {
    return {
        type: actionTypes.UNSET_MATURITY_LEVELS,
    }
}

export const setCompStandards = standards => {
    return {
        type: actionTypes.SET_COMP_STANDARDS,
        payload: {
            standards: standards
        }
    }
}

export const unsetCompStandards = () => {
    return {
        type: actionTypes.UNSET_COMP_STANDARDS,
    }
}

export const setAssetTypes = asset_types => {
    return {
        type: actionTypes.SET_ASSET_TYPES,
        payload: {
            asset_types: asset_types
        }
    }
}

export const unsetAssetTypes = () => {
    return {
        type: actionTypes.UNSET_ASSET_TYPES,
    }
}

export const setControlModels = control_models => {
    return {
        type: actionTypes.SET_CONTROL_MODELS,
        payload: {
            control_models: control_models
        }
    }
}

export const unsetControlModels = () => {
    return {
        type: actionTypes.UNSET_CONTROL_MODELS,
    }
}

export const setSearchQuery = query => {
    return {
        type: actionTypes.SET_SEARCH_QUERY,
        payload: {
            query: query
        }
    }
}
export const unsetSearchQuery = () => {
    return {
        type: actionTypes.UNSET_SEARCH_QUERY,
    }
}

export const setSearchResults = results => {
    return {
        type: actionTypes.SET_SEARCH_RESULTS,
        payload: {
            results: results
        }
    }
}
export const unsetSearchResults = () => {
    return {
        type: actionTypes.UNSET_SEARCH_RESULTS,
    }
}

export const setCreateNewOrg = create_new_org => {
    return {
        type: actionTypes.SET_CREATE_NEW_ORG,
        payload: {
            create_new_org: create_new_org
        }
    }
}

export const setWatchDevice = device => {
    return {
        type: actionTypes.SET_WATCH_DEVICE,
        payload: {
            device: device
        }
    }
}

export const unsetWatchDevice = () => {
    return {
        type: actionTypes.UNSET_WATCH_DEVICE,
    }
}

export const setOrgsAutoDevices = auto_devices => {
    return {
        type: actionTypes.SET_ORGS_AUTO_DEVICES,
        payload: {
            auto_devices: auto_devices
        }
    }
}

export const setCompanyUsers = company_users => {
    return {
        type: actionTypes.SET_COMPANY_USERS,
        payload: {
            company_users: company_users
        }
    }
}

export const setCompanyTeams = teams => {
    return {
        type: actionTypes.SET_COMPANY_TEAMS,
        payload: {
            teams: teams
        }
    }
}

export const setSectionControls = controls => {
    return {
        type: actionTypes.SET_SECTION_CONTROLS,
        payload: {
            controls: controls
        }
    }
}

export const unSetSectionControls = controls => {
    return {
        type: actionTypes.UNSET_SECTION_CONTROLS,
        payload: {
            controls: controls
        }
    }
}

export const setCompanyLocations = locations => {
    return {
        type: actionTypes.SET_COMP_LOCATION,
        payload: {
            locations: locations
        }
    }
}

export const setSelectedProject = project => {
    return {
        type: actionTypes.SELECT_PROJECT,
        payload: {
            project: project
        }
    }
}

export const setAllProjects = projects => {
    return {
        type: actionTypes.SET_ALL_PROJECTS,
        payload: {
            projects: projects
        }
    }
}

export const toggleTaskEditEModel = status => {
    return {
        type: actionTypes.TOGGLE_TASK_EDIT_EMODEL,
        payload: {
            tsk_edit_emodel: status
        }
    }
}

export const toggleTslAddEModel = status => {
    return {
        type: actionTypes.TOGGLE_TASK_ADD_EMODEL,
        payload: {
            tsk_add_emodel: status
        }
    }
}

export const setBackPageURL = back_url => {
    return {
        type: actionTypes.BACK_PAGE_URL,
        payload: {
            back_url: back_url
        }
    }
}

export const setSelectedTask = task => {
    return {
        type: actionTypes.SELECT_TASK,
        payload: {
            task: task
        }
    }
}

export const setAllTasks = tasks => {
    return {
        type: actionTypes.SET_ALL_TASKS,
        payload: {
            tasks: tasks
        }
    }
}

export const setTaskToEdit = edit_task => {
    return {
        type: actionTypes.TASK_TO_EDIT,
        payload: {
            edit_task: edit_task
        }
    }
}

export const setSubTasks = sub_tasks => {
    return {
        type: actionTypes.SET_SUB_TASKS,
        payload: {
            sub_tasks: sub_tasks
        }
    }
}

export const setTaskListTypes = list_types => {
    return {
        type: actionTypes.SET_TASK_LIST_TYPE,
        payload: {
            list_types: list_types
        }
    }
}

export const setProjectProfile = profile => {
    return {
        type: actionTypes.SET_PROJECT_PROFILE,
        payload: {
            profile: profile
        }
    }
}

export const changeSidebarType = sidebarType => {
    return {
        type: actionTypes.CHANGE_SIDEBAR_TYPE,
        payload: {
            sidebarType: sidebarType
        }
    }
}

export const showRightSidebar = () => {
    return {
        type: actionTypes.SHOW_RIGHT_SIDEBAR,
    }
}

export const changePageAreaState = (centerPageAreaState) => {
    return {
        type: actionTypes.CHANGE_CENTER_PAGE_AREA,
        payload: {
            centerPageAreaState
        }
    }
}

export const toggleTreeViewArea = (tree_mode) => {
    return {
        type: actionTypes.TOGGLE_CS_AREA,
        payload: {
            tree_mode: tree_mode
        }
    }
}

export const hideRightSidebar = () => {
    return {
        type: actionTypes.HIDE_RIGHT_SIDEBAR,
    }
}

export const setLastActiveSectionId = (last_active_section_id, last_active_section_name) => {
    return {
        type: actionTypes.SET_LAST_ACTIVE_SECTION_ID,
        payload: {
            last_active_section_id: last_active_section_id,
            last_active_section_name: last_active_section_name
        }
    }
}

export const setFieldTypes = (field_types) => {
    return {
        type: actionTypes.SET_FIELD_TYPES,
        payload: {
            field_types: field_types
        }
    }
}

export const setFieldTypeToAdd = (field_type_to_add) => {
    return {
        type: actionTypes.SET_FIELD_TYPE_TO_ADD,
        payload: {
            field_type_to_add: field_type_to_add
        }
    }
}

export const setAllProjectSubjects = (subjects) => {
    return {
        type: actionTypes.SET_ALL_SUBJECTS,
        payload: {
            subjects: subjects
        }
    }
}

export const setActiveSubjectId = (active_subject_id) => {
    return {
        type: actionTypes.SET_ALL_ACTIVE_SUBJECTID,
        payload: {
            active_subject_id: active_subject_id
        }
    }
}

export const setProjectRightView = (right_bar_view) => {
    return {
        type: actionTypes.SET_PROJECT_RIGHT_VIEW,
        payload: {
            right_bar_view: right_bar_view
        }
    }
}

export const setColumnToEdit = (column_to_edit) => {
    return {
        type: actionTypes.SET_COLUMN_TO_EDIT,
        payload: {
            column_to_edit: column_to_edit
        }
    }
}

// Standard Properties 
export const setStandardTypes = (std_types) => {
    return {
        type: actionTypes.SET_STANDARD_TYPES,
        payload: {
            std_types: std_types
        }
    }
}

export const setStandardFamilies = (std_families) => {
    return {
        type: actionTypes.SET_STANDARD_FAMILIES,
        payload: {
            std_families: std_families
        }
    }
}

export const setStandardVersions = (std_versions) => {
    return {
        type: actionTypes.SET_STANDARD_VERSIONS,
        payload: {
            std_versions: std_versions
        }
    }
}

export const setStandardFocuses = (std_focuses) => {
    return {
        type: actionTypes.SET_STANDARD_FOCUSES,
        payload: {
            std_focuses: std_focuses
        }
    }
}

export const setStandardStatutes = (std_statutes) => {
    return {
        type: actionTypes.SET_STANDARD_STATUTES,
        payload: {
            std_statutes: std_statutes
        }
    }
}

export const setMarketplaceStandard = (standard) => {
    return {
        type: actionTypes.SET_MK_STANDARD,
        payload: {
            standard: standard
        }
    }
}

export const setCartItems = (items) => {
    return {
        type: actionTypes.SET_CART_ITEMS,
        payload: {
            items: items
        }
    }
}

export const setCartSummary = (summary) => {
    return {
        type: actionTypes.SET_CART_SUMMARY,
        payload: {
            summary: summary
        }
    }
}

export const resetCartSummary = () => {
    return {
        type: actionTypes.RESET_CART_SUMMARY,
    }
}

export const setStripeKey = (publishable_key) => {
    return {
        type: actionTypes.SET_STRIPE_PUBLISHABLE_KEY,
        payload: {
            publishable_key: publishable_key
        }
    }
}

export const setPackagesPopupStatus = (open) => {
    return {
        type: actionTypes.SET_PAKCAGE_STATUS,
        payload: {
            open: open
        }
    }
}


export const setPackageSummary = (summary) => {
    return {
        type: actionTypes.SET_PACKAGES_SUMMARY,
        payload: {
            summary: summary
        }
    }
}

export const resetPackageSummary = () => {
    return {
        type: actionTypes.RESET_PACKAGES_SUMMARY,
    }
}

export const setDetailsPanelType = (details_panel_type) => {
    return {
        type: actionTypes.SET_DETAILS_PANEL_TYPE,
        payload: {
            details_panel_type: details_panel_type
        }
    }
}

export const setParentDomain = (parent_domain) => {
    return {
        type: actionTypes.SET_PARENT_DOMAIN,
        payload: {
            parent_domain: parent_domain
        }
    }
}

export const setSubDomain = (sub_domain) => {
    return {
        type: actionTypes.SET_PARENT_SUB_DOMAIN,
        payload: {
            sub_domain: sub_domain
        }
    }
}

export const setStandardInfo = (standard_info) => {
    return {
        type: actionTypes.SET_STANDARD_INFO,
        payload: {
            standard_info: standard_info
        }
    }
}

export const setDomainInfo = (domain_info) => {
    return {
        type: actionTypes.SET_DOMAIN_INFO,
        payload: {
            domain_info: domain_info
        }
    }
}

export const setDomainDocuments = (domain_documents) => {
    return {
        type: actionTypes.SET_DOMAIN_DOCUMENTS,
        payload: {
            domain_documents: domain_documents
        }
    }
}

export const setDomainControls = (domain_controls) => {
    return {
        type: actionTypes.SET_DOMAIN_CONTROLS,
        payload: {
            domain_controls: domain_controls
        }
    }
}

export const setDomainActivites = (domain_activities) => {
    return {
        type: actionTypes.SET_DOMAIN_ACTIVITIES,
        payload: {
            domain_activities: domain_activities
        }
    }
}

export const setControl = (control) => {
    return {
        type: actionTypes.SET_CONTROL,
        payload: {
            control: control
        }
    }
}

export const setControlInfo = (control_info) => {
    return {
        type: actionTypes.SET_CONTROL_INFO,
        payload: {
            control_info: control_info
        }
    }
}

export const setControlDocuments = (control_documents) => {
    return {
        type: actionTypes.SET_CONTROL_DOCUMENTS,
        payload: {
            control_documents: control_documents
        }
    }
}

export const setControlActivites = (control_activities) => {
    return {
        type: actionTypes.SET_CONTROL_ACTIVITIES,
        payload: {
            control_activities: control_activities
        }
    }
}

export const setControlMappings = (control_mappings) => {
    return {
        type: actionTypes.SET_CONTROL_MAPPINGS,
        payload: {
            control_mappings: control_mappings
        }
    }
}

export const setControlQuestions = (control_questions) => {
    return {
        type: actionTypes.SET_CONTROL_QUESTIONS,
        payload: {
            control_questions: control_questions
        }
    }
}


export const setOpenDocument = (open_document) => {
    return {
        type: actionTypes.OPEN_DOCUMENT,
        payload: {
            open_document: open_document
        }
    }
}

export const setCreateDocument = (create_document) => {
    return {
        type: actionTypes.SET_CREATE_DOCUMENT,
        payload: {
            create_document: create_document
        }
    }
}

export const setRenameDocument = (rename_document) => {
    return {
        type: actionTypes.SET_RENAME_DOCUMENT,
        payload: {
            rename_document: rename_document
        }
    }
}

export const setDeleteDocument = (delete_document) => {
    return {
        type: actionTypes.SET_DELETE_DOCUMENT,
        payload: {
            delete_document: delete_document
        }
    }
}

export const setUnlinkDocument = (unlink_document) => {
    return {
        type: actionTypes.SET_UNLINK_DOCUMENT,
        payload: {
            unlink_document: unlink_document
        }
    }
}

export const setUploadDocument = (upload_document) => {
    return {
        type: actionTypes.SET_UPLOAD_DOCUMENT,
        payload: {
            upload_document: upload_document
        }
    }
}

export const setLinkDocuments = (link_documents) => {
    return {
        type: actionTypes.SET_LINK_DOCUMENT,
        payload: {
            link_documents: link_documents
        }
    }
}

export const selectLanCategory = category => {
    return {
        type: actionTypes.SELECT_LAN_CATEGORY,
        payload: {
            category: category
        }
    }
}

export const selectLanDetailsPanelType = details_panel_type => {
    return {
        type: actionTypes.SET_LAN_DETAILS_PANEL_TYPE,
        payload: {
            details_panel_type: details_panel_type
        }
    }
}

export const selectLanAssets = lan_assets => {
    return {
        type: actionTypes.SET_LAN_ASSETS,
        payload: {
            lan_assets: lan_assets
        }
    }
}

export const selectLanParentAsset = parent_asset => {
    return {
        type: actionTypes.SET_LAN_PARENT_ASSET,
        payload: {
            parent_asset: parent_asset
        }
    }
}

export const selectLanChildAsset = sub_asset => {
    return {
        type: actionTypes.SET_LAN_CHILD_ASSET,
        payload: {
            sub_asset: sub_asset
        }
    }
}

export const toggleCreateRecord = create_record => {
    return {
        type: actionTypes.SET_CREATE_RECORD,
        payload: {
            create_record: create_record
        }
    }
}

export const saveRecord = record => {
    return {
        type: actionTypes.SET_RECORD,
        payload: {
            record: record
        }
    }
}

export const saveRecordDetails = record_details => {
    return {
        type: actionTypes.SET_RECORD_DETAILS,
        payload: {
            record_details: record_details
        }
    }
}

export const saveModuleDetails = module_details => {
    return {
        type: actionTypes.SET_MODULE_DETAILS,
        payload: {
            module_details: module_details
        }
    }
}

export const setDeleteRelatedRecord = delete_related_record => {
    return {
        type: actionTypes.SET_DELETE_RELATED_RECORD,
        payload: {
            delete_related_record: delete_related_record
        }
    }
}

export const setDeleteRecord = delete_record => {
    return {
        type: actionTypes.SET_DELETE_RECORD,
        payload: {
            delete_record: delete_record
        }
    }
}

export const setRelatedRecord = assign_related_record => {
    return {
        type: actionTypes.SET_ASSIGN_RELATED_RECORD,
        payload: {
            assign_related_record: assign_related_record
        }
    }
}

export const selectTemplate = template => {
    return {
        type: actionTypes.SELECT_TEMPLATE,
        payload: {
            template: template
        }
    }
}

export const selectTemplates = templates => {
    return {
        type: actionTypes.SELECT_TEMPLATES,
        payload: {
            templates: templates
        }
    }
}
export const selectPrimaryItem = primary_item => {
    return {
        type: actionTypes.SELECT_PRIMARY_ITEM,
        payload: {
            primary_item: primary_item
        }
    }
}

export const setPortalUser = portalUser => {
    return {
        type: actionTypes.SET_PORTAL_USER,
        payload: {
            portalUser: portalUser
        }
    }
}

export const clearPortalUser = () => {
    return {
        type: actionTypes.CLEAR_PORTAL_USER,
    }
}

export const setSharedStandards = shared_standards => {
    return {
        type: actionTypes.SET_SHARED_STANDARD,
        payload: {
            shared_standards: shared_standards
        }
    }
}
export const setSharedCompany = shared_company => {
    return {
        type: actionTypes.SET_POLICY_PORTAL_COMPANY,
        payload: {
            shared_company: shared_company
        }
    }
}

export const setPortalToken = portalToken => {
    return {
        type: actionTypes.SET_PORTAL_TOKEN,
        payload: {
            portalToken: portalToken
        }
    }
}

export const clearPortalToken = () => {
    return {
        type: actionTypes.CLEAR_PORTAL_TOKEN,
    }
}

export const setCompanyPolicyPortal = policy_portal => {
    return {
        type: actionTypes.SET_COMPANY_PORTAL,
        payload: {
            policy_portal: policy_portal
        }
    }
}

export const setPortalActiveStandard = active_standard => {
    return {
        type: actionTypes.SET_PP_ACTIVE_STANDARD,
        payload: {
            active_standard: active_standard
        }
    }
}
export const setPortalActiveDomains = active_domains => {
    return {
        type: actionTypes.SET_PP_ACTIVE_DOMAINS,
        payload: {
            active_domains: active_domains
        }
    }
}

export const setPortalActiveParentDomains = active_parent_domain => {
    return {
        type: actionTypes.SET_PP_ACTIVE_PARENT_DOMAINS,
        payload: {
            active_parent_domain: active_parent_domain
        }
    }
}

export const setSupplier = supplier => {
    return {
        type: actionTypes.SET_SUPPLIER,
        payload: {
            supplier: supplier
        }
    }
}

export const setAddOfficeLocationDialog = addOfficeLocationDialog => {
    return {
        type: actionTypes.SET_ADD_OFFICE_LOCATION_DIALOG,
        payload: {
            addOfficeLocationDialog: addOfficeLocationDialog
        }
    }
}

export const setAddPointOfContactDialog = addPointOfContactDialog => {
    return {
        type: actionTypes.SET_ADD_POINT_OF_CONTACT_DIALOG,
        payload: {
            addPointOfContactDialog: addPointOfContactDialog
        }
    }
}

export const setAddLaborCategoryDialog = addLaborCategoryDialog => {
    return {
        type: actionTypes.SET_ADD_LABOR_CATEGORY_DIALOG,
        payload: {
            addLaborCategoryDialog: addLaborCategoryDialog
        }
    }
}

export const setEditLaborCategoryDialog = editLaborCategoryDialog => {
    return {
        type: actionTypes.SET_EDIT_LABOR_CATEGORY_DIALOG,
        payload: {
            editLaborCategoryDialog: editLaborCategoryDialog
        }
    }
}

export const setAddDomainDialog = addDomainDialog => {
    return {
        type: actionTypes.SET_ADD_DOMAIN_DIALOG,
        payload: {
            addDomainDialog: addDomainDialog
        }
    }
}

export const setEditDomainDialog = editDomainDialog => {
    return {
        type: actionTypes.SET_EDIT_DOMAIN_DIALOG,
        payload: {
            editDomainDialog: editDomainDialog
        }
    }
}

export const setAddSupplierLocationDialog = addSupplierLocationDialog => {
    return {
        type: actionTypes.SET_ADD_SUPPLIER_LOCATION_DIALOG,
        payload: {
            addSupplierLocationDialog: addSupplierLocationDialog
        }
    }
}

export const setEditSupplierLocationDialog = editSupplierLocationDialog => {
    return {
        type: actionTypes.SET_EDIT_SUPPLIER_LOCATION_DIALOG,
        payload: {
            editSupplierLocationDialog: editSupplierLocationDialog
        }
    }
}

export const setAddSupplierUserDialog = addSupplierUserDialog => {
    return {
        type: actionTypes.SET_ADD_SUPPLIER_USER_DIALOG,
        payload: {
            addSupplierUserDialog: addSupplierUserDialog
        }
    }
}

export const setEditSupplierUserDialog = editSupplierUserDialog => {
    return {
        type: actionTypes.SET_EDIT_SUPPLIER_USER_DIALOG,
        payload: {
            editSupplierUserDialog: editSupplierUserDialog
        }
    }
}

export const setStates = states => {
    return {
        type: actionTypes.SET_STATES,
        payload: {
            states: states
        }
    }
}

export const setCountries = countries => {
    return {
        type: actionTypes.SET_COUNTRIES,
        payload: {
            countries: countries
        }
    }
}

export const setNaicsCodes = naics_codes => {
    return {
        type: actionTypes.SET_NAICS_CODES,
        payload: {
            naics_codes: naics_codes
        }
    }
}

export const setEthnicities = ethnicities => {
    return {
        type: actionTypes.SET_ETHNICITIES,
        payload: {
            ethnicities: ethnicities
        }
    }
}

export const setCompliantReqs = compliant_reqs => {
    return {
        type: actionTypes.SET_COMPLIANT_REQS,
        payload: {
            compliant_reqs: compliant_reqs
        }
    }
}

export const setSecurityLevels = security_levels => {
    return {
        type: actionTypes.SET_SECURITY_LEVELS,
        payload: {
            security_levels: security_levels
        }
    }
}

export const setAssignDomainDialog = assignDomainDialog => {
    return {
        type: actionTypes.SET_ASSIGN_DOMAIN_DIALOG,
        payload: {
            assignDomainDialog: assignDomainDialog
        }
    }
}

export const setActiveSupplier = active_supplier => {
    return {
        type: actionTypes.SET_ACTIVE_SUPPLIER,
        payload: {
            active_supplier: active_supplier
        }
    }
}

export const setCPActiveTab = cp_active_tab => {
    return {
        type: actionTypes.SET_CP_ACTIVE_TAB,
        payload: {
            cp_active_tab: cp_active_tab
        }
    }
}

export const setSuppliersCount = suppliers_count => {
    return {
        type: actionTypes.SET_SUPPLIERS_COUNT,
        payload: {
            suppliers_count: suppliers_count
        }
    }
}

export const setCompanySuppliers = company_suppliers => {
    return {
        type: actionTypes.SET_COMPANY_SUPPLIERS,
        payload: {
            company_suppliers: company_suppliers
        }
    }
}

export const setCorporateProfileStatus = corporate_profile_status => {
    return {
        type: actionTypes.SET_CORPORATE_PROFILE_STATUS,
        payload: {
            corporate_profile_status: corporate_profile_status
        }
    }
}