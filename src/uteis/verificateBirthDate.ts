export const verificateBirthDate = (birth_date: string): boolean => {
    const dataSplit = birth_date.split('/')
    const birth = new Date(+dataSplit[2], +dataSplit[1] - 1, +dataSplit[0]).getTime()
    const today: number = Date.now()

    return today > birth
}