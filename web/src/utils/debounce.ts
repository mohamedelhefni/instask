export const debounce = (func: Function, delay: number, { leading }: any = {}) => {
    let timerId: number;
    return (...args: any) => {
        if (!timerId && leading) {
            func(...args)
        }
        clearTimeout(timerId)

        timerId = setTimeout(() => func(...args), delay)
    }
}