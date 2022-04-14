
export const getDate = () => {
    let today = new Date();
    let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth();

    return`${day}.${month}.${today.getFullYear()}`
}

export const getDataTable = (data) => {
    const rows = Object.keys(data);
    return rows.map(e => ({region: e, data: data[e].G}));
}

export const getSubYears = (data) => {
    const rows = Object.keys(data);
    let subYears = [];
    const arrayOfSubYears = rows.map(e => Object.keys(data[e].G['2017']));
    arrayOfSubYears.map(e => e.map(i => subYears.push(i)));
    return [...new Set(subYears)];
}

export const getUniqueYear = (arr, data) => {
    let getArrayOfYears = arr.map(e => Object.keys(data[e].G))
    let yearsArr = [];
    getArrayOfYears.map(e => e.map(i => yearsArr.push(+i)));
    return [...new Set(yearsArr)];
}