export function sortByProperty<T>(employeeA: T, employeeB: T, propertyName: string) {
    if (employeeA[propertyName] && employeeB[propertyName] &&
        employeeA[propertyName] < employeeB[propertyName]) {
        return -1;
    }
    if (employeeA[propertyName] && employeeB[propertyName] &&
        employeeA[propertyName] > employeeB[propertyName]) {
        return 1;
    }
    return 0;
}