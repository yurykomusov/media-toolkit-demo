const groupBy = (arr, groupFunc) => arr.reduce((previous, current, index, array, k = groupFunc(current)) => ((previous[k] || (previous[k] = [])).push(current), previous), {});

const chunk = (arr, chunkSize) =>
    arr.reduce((all, current, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!all[chunkIndex]) {
            all[chunkIndex] = []
        }

        all[chunkIndex].push(current);
        return all;
    }, []);



export { groupBy, chunk };