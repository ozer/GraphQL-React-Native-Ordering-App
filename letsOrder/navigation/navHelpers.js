// THESE HELPERS WERE PLANNED TO USE IN SETTING NAVIGATION REDUCER UP BUT SINCE WE DO NOT HAVE ANY REDUCER IT IS POINTLESS.
export const hasProp = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export const getCurrentRouteName = function (nav) {
    if (!hasProp(nav, 'index') || !hasProp(nav, 'routes')) return nav.routeName;
    return getCurrentRouteName(nav.routes[nav.index]);
}

export const getActionRouteName = function (action) {
    const hasNestedAction = Boolean(
        hasProp(action, 'action') && hasProp(action, 'type') && typeof action.action !== 'undefined',
    );

    const nestedActionWillNavigate = Boolean(hasNestedAction && action.action.type === NavigationActions.NAVIGATE);

    if (hasNestedAction && nestedActionWillNavigate) {
        return getActionRouteName(action.action);
    }

    return action.routeName;
}
