export const validateDate = (date: string): boolean => {
    const re = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    return re.test(date)
}