function timestampToDate(timestamp) {
    if(!timestamp || timestamp === '' || timestamp < 1000000000 || isNaN(timestamp)) { return " N/A"; }
    const d = new Date(timestamp * 1000);
    return (" " + d.toLocaleDateString() + " " + d.toLocaleTimeString());
}

export { timestampToDate }