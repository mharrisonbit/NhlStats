const isNullOrWhiteSpace = (str:string):boolean => {
    return !str || str.trim() === "";
}

export { isNullOrWhiteSpace };
