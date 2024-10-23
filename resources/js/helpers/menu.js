import { MODULE_AGENTS } from '../constants/layout';
import MENU_ITEMS from '../constants/menu';
import { getModuleAccess } from '../helpers/getModuleAccess';


const listControlFunctionsNew = (full, company, standards, leftnav) => {
    // const { standards, leftnav } = this.props;

    // className={leftnav.control_function.id === func.id ? 'active' : ''}

    return _.map(standards, standard => {
        return {
            key: 'std-' + standard.standard_id,
            label: full ? standard.standard.expand_name : standard.standard.collapse_name,
            url: `/${company.slug}/compliance/${standard.standard.slug}`,
            parentKey: 'apps-compliance-stack',
            standard_id: standard.standard_id,
            std: standard,
        }
    })
}

const getMenuItems = (company, supplier, suppliers_count, active_supplier, standards, leftnav) => {
    // NOTE - You can fetch from server and return here as well
    // return MENU_ITEMS;

    return [
        {
            key: 'app-dashboard',
            label: 'Dashboard',
            isTitle: false,
            icon: 'uil-home-alt',
            url: '/dashboard',
            showMenu: true,
            urlKey: 'dashboard',
        },
        // {
        //     key: 'app-analytics',
        //     label: 'Analytics',
        //     isTitle: false,
        //     icon: 'uil-analytics',
        //     url: '/analytics',
        // },
        {
            key: 'apps-corporate-profile',
            label: 'Corporate Profile',
            isTitle: false,
            // badge: { variant: 'danger', text: 'New' },
            url: `/${company.slug}/corporate-profile/${active_supplier.slug}/corporate-information`,
            icon: 'uil-layer-group',
            showMenu: getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], (!_.isEmpty(supplier) && _.size(supplier?.roles) > 0) ? supplier?.roles : [], [12, 14, 19, 2, 3, 5]) && suppliers_count > 0,
            urlKey: 'corporate-profile',
            // children: listControlFunctionsNew(true, company, standards, leftnav)
        },
        {
            key: 'app-dashboard',
            label: '',
            isTitle: true,
            icon: 'uil-home-alt',
            url: '/#',
            showMenu: true,
        },
        {
            key: 'domains',
            label: 'Performance Class',
            isTitle: false,
            icon: 'uil-globe',
            url: `/${company.slug}/domains`,
            urlKey: 'domains',
            // badge: { variant: 'secondary', text: 'New' },
            showMenu: getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], (!_.isEmpty(supplier) && _.size(supplier?.roles) > 0) ? supplier?.roles : [], [12, 14, 19]),
        },
        {
            key: 'labor-categories',
            label: 'Labor Categories',
            isTitle: false,
            showMenu: getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], (!_.isEmpty(supplier) && _.size(supplier?.roles) > 0) ? supplier?.roles : [], [12, 14, 19]),
            icon: 'uil-streering',
            urlKey: 'labor-categories',
            url: `/${company.slug}/labor-categories`,
        },
        {
            key: 'apps-compliance-stack',
            label: 'ComplianceStack',
            isTitle: false,
            // badge: { variant: 'danger', text: 'New' },
            url: `/${company.slug}/compliance-stack`,
            icon: 'uil-layer-group',
            showMenu: false,
            // children: listControlFunctionsNew(true, company, standards, leftnav)
        },
        // {
        //     key: 'apps-projects',
        //     label: 'Projects',
        //     isTitle: false,
        //     icon: 'uil-briefcase',
        //     children: [
        //         {
        //             key: 'project-list',
        //             label: 'List',
        //             url: `/${company.slug}/projects/list`,
        //             parentKey: 'apps-projects',
        //         },
        //         // {
        //         //     key: 'project-create-project',
        //         //     label: 'Create Project',
        //         //     url: `/${company.slug}/workbench/projects/create`,
        //         //     parentKey: 'apps-projects',
        //         // },
        //     ],
        // },
        {
            key: 'apps-projects',
            label: 'Projects',
            isTitle: false,
            icon: 'uil-clipboard-alt',
            showMenu: false,
            url: `/${company.slug}/projects/list`,
            children: [
                // {
                //     key: 'projects-list',
                //     label: 'Projects',
                //     url: `/${companylist`,
                //     parentKey: 'apps-projects',
                // },
                // {
                //     key: 'task-list',
                //     label: 'Tasks',
                //     url: `/${company.slug}/workbench/list`,
                //     parentKey: 'apps-tasks',
                // },
                {
                    key: 'task-kanban',
                    label: 'Task Boards',
                    url: `/${company.slug}/workbench/tasks/kanban/all`,
                    parentKey: 'apps-tasks',
                },
                // {
                //     key: 'project-gantt',
                //     label: 'Chart',
                //     url: `/${company.slug}/workbench/projects/gantt/all`,
                //     // badge: { variant: 'light', text: 'New' },
                //     parentKey: 'apps-projects',
                // },
            ],
        },
        {
            key: 'apps-marketplace',
            label: 'Marketplace',
            isTitle: false,
            icon: 'uil-store',
            // showMenu: company.id === 1 || company.id === 3 ? true : false,
            showMenu: false,
            children: [
                {
                    key: 'standards',
                    label: 'Standards',
                    url: `/store/standards`,
                    parentKey: 'apps-marketplace',
                },
                {
                    key: 'saas-applications',
                    label: 'SaaS Applications',
                    url: `/store/saas-applications`,
                    parentKey: 'apps-marketplace',
                },
                {
                    key: 'toolkits',
                    label: 'Toolkits',
                    url: `/store/toolkits`,
                    parentKey: 'apps-marketplace',
                },
            ],
        },
        {
            key: 'app-organization',
            label: 'Organization',
            isTitle: false,
            icon: 'uil-document-layout-center',
            showMenu: false,
            url: '/organization',
        },
        {
            key: 'app-assets',
            label: 'Assets',
            isTitle: false,
            icon: 'uil-repeat',
            showMenu: false,
            url: '/assets',
        },
        {
            key: 'app-third-party',
            label: 'Third Parties',
            isTitle: false,
            icon: 'uil-briefcase',
            showMenu: false,
            url: '/third-parties',
        },
        {
            key: 'app-threat-trends',
            label: 'Threat Trends',
            isTitle: false,
            icon: 'uil-circle-layer',
            showMenu: false,
            url: '/threat-trends',
        },
        {
            key: 'app-agents',
            label: 'Agents',
            isTitle: false,
            icon: 'uil-users-alt',
            showMenu: false,
            url: '/agents',
            category: {
                id: MODULE_AGENTS,
                name: 'Agents',
                slug: 'agents'
            }
        },

        {
            key: 'apps-file-manager',
            label: 'File Manager',
            isTitle: false,
            icon: 'uil-folder-plus',
            showMenu: false,
            url: `/${company.slug}/filemanager/home`,
        },
        // {
        //     key: 'apps-issue-tracker',
        //     label: 'Issue Tracker',
        //     isTitle: false,
        //     icon: 'uil-bug',
        //     url: `/${company.slug}/issue-tracker`,
        // },
        {
            key: 'apps-file-assets',
            label: 'Apps',
            isTitle: false,
            icon: 'uil-box',
            showMenu: false,
            url: `/${company.slug}/assets`,
        },
        {
            key: 'apps-reports',
            label: 'Reports',
            isTitle: false,
            icon: 'uil-chart',
            showMenu: false,
            url: `/${company.slug}/reports`,
        },
        // {
        //     key: 'app-my-account',
        //     label: 'My Account',
        //     isTitle: false,
        //     icon: 'uil-user-circle',
        //     url: '/settings/user',
        // },
        {
            key: 'app-form-welcome',
            label: 'Questionnaire',
            isTitle: false,
            icon: 'uil-notebooks',
            showMenu: false,
            url: '/beta-form/welcome',
        },

        // {
        //     key: 'apps-ecommerce',
        //     label: 'Ecommerce',
        //     isTitle: false,
        //     icon: 'uil-store',
        //     children: [
        //         {
        //             key: 'ecommerce-products',
        //             label: 'Products',
        //             url: '/apps/ecommerce/products',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-details',
        //             label: 'Products Details',
        //             url: '/apps/ecommerce/details',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-orders',
        //             label: 'Orders',
        //             url: '/apps/ecommerce/orders',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-order-details',
        //             label: 'Order Details',
        //             url: '/apps/ecommerce/order/details',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-customers',
        //             label: 'Customers',
        //             url: '/apps/ecommerce/customers',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-shopping-cart',
        //             label: 'Shopping Cart',
        //             url: '/apps/ecommerce/shopping-cart',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-checkout',
        //             label: 'Checkout',
        //             url: '/apps/ecommerce/checkout',
        //             parentKey: 'apps-ecommerce',
        //         },
        //         {
        //             key: 'ecommerce-sellers',
        //             label: 'Sellers',
        //             url: '/apps/ecommerce/sellers',
        //             parentKey: 'apps-ecommerce',
        //         },
        //     ],
        // },
        // {
        //     key: 'apps-email',
        //     label: 'Email',
        //     isTitle: false,
        //     icon: 'uil-envelope',
        //     children: [
        //         {
        //             key: 'email-inbox',
        //             label: 'Inbox',
        //             url: '/apps/email/inbox',
        //             parentKey: 'apps-email',
        //         },
        //         {
        //             key: 'email-read-email',
        //             label: 'Read Email',
        //             url: '/apps/email/details',
        //             parentKey: 'apps-email',
        //         },
        //     ],
        // },

        // {
        //     key: 'apps-social',
        //     label: 'Social Feed',
        //     isTitle: false,
        //     icon: 'uil-rss',
        //     url: '/apps/social',
        // },



        // { key: 'custom', label: 'Custom', isTitle: true },
        // {
        //     key: 'pages',
        //     label: 'Pages',
        //     isTitle: false,
        //     icon: 'uil-copy-alt',
        //     children: [
        //         {
        //             key: 'page-profile',
        //             label: 'Profile',
        //             url: '/pages/profile',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-profile2',
        //             label: 'Profile 2',
        //             url: '/pages/profile2',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-invoice',
        //             label: 'Invoice',
        //             url: '/pages/invoice',
        //             parentKey: 'pages',
        //         },
        //         { key: 'page-faq', label: 'FAQ', url: '/pages/faq', parentKey: 'pages' },
        //         {
        //             key: 'page-pricing',
        //             label: 'Pricing',
        //             url: '/pages/pricing',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-maintenance',
        //             label: 'Maintenance',
        //             url: '/maintenance',
        //             target: '_blank',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-error-404',
        //             label: 'Error - 404',
        //             url: '/error-404',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-error-404-alt',
        //             label: 'Error - 404-alt',
        //             url: '/pages/error-404-alt',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-error-500',
        //             label: 'Error - 500',
        //             url: '/error-500',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-starter',
        //             label: 'Starter Page',
        //             url: '/pages/starter',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-preloader',
        //             label: 'With Preloader',
        //             url: '/pages/preloader',
        //             parentKey: 'pages',
        //         },
        //         {
        //             key: 'page-timeline',
        //             label: 'Timeline',
        //             url: '/pages/timeline',
        //             parentKey: 'pages',
        //         },
        //     ],
        // },
        // {
        //     key: 'landing',
        //     label: 'Landing',
        //     isTitle: false,
        //     icon: 'uil-globe',
        //     url: '/landing',
        //     target: '_blank',
        //     badge: { variant: 'secondary', text: 'New' },
        // },

        // { key: 'components', label: 'Components', isTitle: true },
        // {
        //     key: 'base-ui',
        //     label: 'Base UI',
        //     isTitle: false,
        //     icon: 'uil-box',
        //     children: [
        //         {
        //             key: 'base-ui-accordions',
        //             label: 'Accordions',
        //             url: '/ui/base-ui/accordions',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-alerts',
        //             label: 'Alerts',
        //             url: '/ui/base-ui/alerts',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-avatars',
        //             label: 'Avatars',
        //             url: '/ui/base-ui/avatars',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-badges',
        //             label: 'Badges',
        //             url: '/ui/base-ui/badges',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-breadcrumb',
        //             label: 'Breadcrumb',
        //             url: '/ui/base-ui/breadcrumb',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-buttons',
        //             label: 'Buttons',
        //             url: '/ui/base-ui/buttons',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-cards',
        //             label: 'Cards',
        //             url: '/ui/base-ui/cards',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-carousel',
        //             label: 'Carousel',
        //             url: '/ui/base-ui/carousel',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-dropdown',
        //             label: 'Dropdowns',
        //             url: '/ui/base-ui/dropdowns',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-embedvideo',
        //             label: 'Embed Video',
        //             url: '/ui/base-ui/embedvideo',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-grid',
        //             label: 'Grid',
        //             url: '/ui/base-ui/grid',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-listgroups',
        //             label: 'List Groups',
        //             url: '/ui/base-ui/listgroups',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-modals',
        //             label: 'Modals',
        //             url: '/ui/base-ui/modals',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-notifications',
        //             label: 'Notifications',
        //             url: '/ui/base-ui/notifications',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-offcanvas',
        //             label: 'Offcanvas',
        //             url: '/ui/base-ui/offcanvas',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-paginations',
        //             label: 'Paginations',
        //             url: '/ui/base-ui/paginations',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-popovers',
        //             label: 'Popovers',
        //             url: '/ui/base-ui/popovers',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-progress',
        //             label: 'Progress',
        //             url: '/ui/base-ui/progress',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-ribbons',
        //             label: 'Ribbons',
        //             url: '/ui/base-ui/ribbons',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-spinners',
        //             label: 'Spinners',
        //             url: '/ui/base-ui/spinners',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-tabs',
        //             label: 'Tabs',
        //             url: '/ui/base-ui/tabs',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-tooltips',
        //             label: 'Tooltips',
        //             url: '/ui/base-ui/tooltips',
        //             parentKey: 'base-ui',
        //         },
        //         {
        //             key: 'base-ui-typography',
        //             label: 'Typography',
        //             url: '/ui/base-ui/typography',
        //             parentKey: 'base-ui',
        //         },
        //     ],
        // },
        // {
        //     key: 'extended-ui',
        //     label: 'Extended UI',
        //     isTitle: false,
        //     icon: 'uil-package',
        //     children: [
        //         {
        //             key: 'extended-ui-dragdrop',
        //             label: 'Drag and Drop',
        //             url: '/ui/extended/dragdrop',
        //             parentKey: 'extended-ui',
        //         },
        //         {
        //             key: 'extended-ui-rangesliders',
        //             label: 'Range Sliders',
        //             url: '/ui/extended/rangesliders',
        //             parentKey: 'extended-ui',
        //         },
        //         {
        //             key: 'extended-ui-ratings',
        //             label: 'Ratings',
        //             url: '/ui/extended/ratings',
        //             parentKey: 'extended-ui',
        //         },
        //     ],
        // },
        // {
        //     key: 'widgets',
        //     label: 'Widgets',
        //     isTitle: false,
        //     icon: 'uil-layer-group',
        //     url: '/ui/widgets',
        // },
        // {
        //     key: 'icons',
        //     label: 'Icons',
        //     isTitle: false,
        //     icon: 'uil-streering',
        //     children: [
        //         {
        //             key: 'icon-dripicons',
        //             label: 'Dripicons',
        //             url: '/ui/icons/dripicons',
        //             parentKey: 'icons',
        //         },
        //         {
        //             key: 'icon-mdiicons',
        //             label: 'Material Design',
        //             url: '/ui/icons/mdi',
        //             parentKey: 'icons',
        //         },
        //         {
        //             key: 'icon-unicons',
        //             label: 'Unicons',
        //             url: '/ui/icons/unicons',
        //             parentKey: 'icons',
        //         },
        //     ],
        // },
        // {
        //     key: 'forms',
        //     label: 'Forms',
        //     isTitle: false,
        //     icon: 'uil-document-layout-center',
        //     children: [
        //         {
        //             key: 'form-basic',
        //             label: 'Basic Elements',
        //             url: '/ui/forms/basic',
        //             parentKey: 'forms',
        //         },
        //         {
        //             key: 'form-advanced',
        //             label: 'Form Advanced',
        //             url: '/ui/forms/advanced',
        //             parentKey: 'forms',
        //         },
        //         {
        //             key: 'form-validation',
        //             label: 'Validation',
        //             url: '/ui/forms/validation',
        //             parentKey: 'forms',
        //         },
        //         {
        //             key: 'form-wizard',
        //             label: 'Wizard',
        //             url: '/ui/forms/wizard',
        //             parentKey: 'forms',
        //         },
        //         {
        //             key: 'form-upload',
        //             label: 'File Upload',
        //             url: '/ui/forms/upload',
        //             parentKey: 'forms',
        //         },
        //         {
        //             key: 'form-editors',
        //             label: 'Editors',
        //             url: '/ui/forms/editors',
        //             parentKey: 'forms',
        //         },
        //     ],
        // },
        // {
        //     key: 'charts',
        //     label: 'Charts',
        //     isTitle: false,
        //     icon: 'uil-chart',
        //     children: [
        //         {
        //             key: 'chart-apex',
        //             label: 'Apex Charts',
        //             url: '/ui/charts/apex',
        //             parentKey: 'charts',
        //         },
        //         {
        //             key: 'chart-brite',
        //             label: 'Brite Charts',
        //             url: '/ui/charts/brite',
        //             parentKey: 'charts',
        //         },
        //         {
        //             key: 'chart-chartjs',
        //             label: 'Chartjs',
        //             url: '/ui/charts/chartjs',
        //             parentKey: 'charts',
        //         },
        //     ],
        // },
        // {
        //     key: 'tables',
        //     label: 'Tables',
        //     isTitle: false,
        //     icon: 'uil-table',
        //     children: [
        //         {
        //             key: 'table-basic',
        //             label: 'Basic Tables',
        //             url: '/ui/tables/basic',
        //             parentKey: 'tables',
        //         },
        //         {
        //             key: 'table-advanced',
        //             label: 'Advanced Tables',
        //             url: '/ui/tables/advanced',
        //             parentKey: 'tables',
        //         },
        //     ],
        // }
    ];
};

const getSharedMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    // return MENU_ITEMS;

    return [
        {
            key: 'app-form-welcome',
            label: 'Welcome',
            isTitle: false,
            icon: 'uil-award',
            url: '/beta-form/welcome',
        },
        {
            key: 'app-form-posture',
            label: '1. Posture',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/posture',
        },
        {
            key: 'app-form-aim',
            label: '2. AIM',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/aim',
        },
        {
            key: 'app-form-event',
            label: '3. Event',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/event',
        },
        {
            key: 'app-form-asset',
            label: '4. Asset',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/asset',
        },
        {
            key: 'app-form-backups',
            label: '5. Backups',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/backups',
        },
        {
            key: 'app-form-data',
            label: '6. Data & Device',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/data-and-device',
        },
        {
            key: 'app-form-incident',
            label: '7. Incident',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/incident',
        },
        {
            key: 'app-form-disclosure',
            label: 'Disclosure',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/beta-form/disclosure',
        },
        {
            key: 'app-form-thankyou',
            label: 'Thank you',
            isTitle: false,
            icon: 'uil-presentation-check',
            url: '/beta-form/thankyou',
        },
        {
            key: 'app-dashboard',
            label: 'Home',
            isTitle: false,
            icon: 'uil-home-alt',
            url: '/dashboard',
        },

    ];
};

const defaultPPMenus = () => {
    // NOTE - You can fetch from server and return here as well
    // return MENU_ITEMS;

    return [
        {
            key: 'app-compliance-team',
            label: 'Compliance Team',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Incident',
            label: 'Incident Response',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Disaster',
            label: 'Disaster Recovery',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Training',
            label: 'Training & Education',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Assessments',
            label: 'Assessments',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Legal',
            label: 'Legal & Regulatory',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Customer',
            label: 'Customer Questionnaires',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Certifications',
            label: 'Certifications',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-News',
            label: 'News & Updates',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-FAQs',
            label: 'FAQs and Help',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
        {
            key: 'app-Feedback',
            label: 'Feedback',
            isTitle: false,
            icon: 'uil-award',
            url: '#',
        },
    ];
};

const sampleDomains = () => {
    // NOTE - You can fetch from server and return here as well
    // return MENU_ITEMS;

    return [
        {
            key: 'app-form-welcome',
            label: 'Welcome',
            isTitle: false,
            icon: 'uil-award',
            url: '/welcome',
        },
        {
            key: 'app-form-posture',
            label: 'A.5 Security Policies',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/A.5 Security Policies',
        },
        {
            key: 'app-form-posture',
            label: 'A.6 Security Organization',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/A.6 Security Organization',
        },
        {
            key: 'app-form-posture',
            label: 'A.7 Human resource',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/A.7 Human resource',
        },
        {
            key: 'app-form-posture',
            label: 'A.8 Asset management',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/A.8 Asset management',
        },
        {
            key: 'app-form-posture',
            label: 'A.9 Access control',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/A.9 Access control',
        },
        {
            key: 'app-form-posture',
            label: 'A.10 Cryptography',
            isTitle: false,
            icon: 'uil-notebooks',
            url: '/A.10 Cryptography',
        },

    ];
};

const findAllParent = (menuItems, menuItem) => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export { getMenuItems, findAllParent, findMenuItem, getSharedMenuItems, sampleDomains, defaultPPMenus };
