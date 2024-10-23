export const getModuleAccess = (company_roles, supplier_roles, requiredRoles) => {
    const foundRole = _.find([...company_roles, ...supplier_roles], role => requiredRoles.includes(role.id));
    return !!foundRole;
}