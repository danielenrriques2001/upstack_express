
const generateID = () => {
    const token = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32)
    return token + date;
}

export {
    generateID
}