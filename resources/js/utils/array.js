// @flow
const groupByFields = (array, f) => {
    /*
    params description :
        f : function which returnf the array of fields
        e.g. :  (item) => {
            return [itemField1, itemField2];
        }
        array : array of data to group e.g. : [{...}, {...}]
    */
    var groups = {};
    array.forEach((o) => {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map((group) => {
        return groups[group];
    });
};

const extractIds = (domain) => {
    // Check if domain is provided and has the expected structure
    if (domain && Array.isArray(domain.sections)) {
        // Use map to extract all id values and return them as an array
        return domain.sections.map(section => section.id);
    } else {
        // Return an empty array if the structure is not as expected
        return [];
    }
};

const extractIdsFromDomains = (domains) => {
    let ids = [];
    _.forEach(domains, domain => {
        ids = ids.concat(extractIds(domain));
    });
    return ids;
};

const msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt', 'odt', 'odp', 'ods', 'rtf'];

const controlBaselinePriorytToLabels = (inputArray) => {
    const labelMap = {
        1: 'Low',
        2: 'Mod',
        3: 'High',
    };
    return inputArray.map(value => labelMap[value['baseline_priority']]).filter(Boolean);
};

const activityFrom = (act) => {
    if (act.page == 'control') {
        return `${act.control?.name} ${act.control?.number}`;
    }
    else if (act.page == 'sub_domain' || act.page == 'domain') {
        return `${act.section?.name}`;
    }
    else if (act.page == 'standard') {
        return `${act.standard?.name}`;
    }
}

export { groupByFields, extractIds, msFiles, extractIdsFromDomains, controlBaselinePriorytToLabels, activityFrom };

