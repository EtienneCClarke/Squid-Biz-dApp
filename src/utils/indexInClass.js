function indexInClass(collection, target) {
    for(let i = 0; i < collection.length; i++) {
        if(collection[i].classList.contains(target)) return i;
    }
    return -1;
}

export { indexInClass }
