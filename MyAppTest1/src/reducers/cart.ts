export default (state = [], payload: any) => {
    switch (payload) {
        case 'add':
            return [...state, payload.item];
        default:
            return state;
    }
}