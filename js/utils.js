const groupBy = (arr, groupFunc) => arr.reduce((previous, current, index, array, k = groupFunc(current)) => ((previous[k] || (previous[k] = [])).push(current), previous), {});

export { groupBy };