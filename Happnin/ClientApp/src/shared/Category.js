
export function Category(categoryId) {
    switch(categoryId){
        case 0:
            return 'Music'
        case 1:  
            return 'Festival'
        case 2: 
            return 'Comedy'
        case 3: 
            return 'Culture'
        case 4: 
            return 'Other'
        case 5: 
            return 'Product'
        default:
            return 'Other'
    }
};