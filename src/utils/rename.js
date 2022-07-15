// USER => 'in typeform': 'in db'
export const renameUser = {
    'email_adress': 'email' , 
}

// SHOP => 'in typeform': 'in db'
export const renameShop = {
    'shop_name': 'name',
    'order_type': 'order_type',
    'price_fees': 'delivery_fees',
    'payment_type': 'payment_type' //a mettre dans la db
}

// PRODUCT => 'in typeform': 'in db'
export const renameProduct = (num) => ({
    [`name_product_${num}`]: 'name',
    [`picture_product_${num}`]: 'picture_url',
    [`price_product_${num}`]: 'price',
    [`description_product${num}`]: 'description',
})

const enumKeys = {
    // SHOP
    'order_type': {
        'A retirer sur place': 'collect',
        'Livraison': 'delivery',
        'both': 'both'
    },
    'payment_type': {
        'Carte bancaire': 'cb',
        'Espèces': 'cash',
        'both': 'both'
    },
    'currency': {
        'Euro' : 'euro'
    }
}


// TODO: DEV: prevoir les enum dans user
export const getObjetUser = (answers) => {
    const user = {}
    
    for (let i = 0; i < answers.length; i += 1) {
        const answer = answers[i];
        const keyUser = renameUser[answer.field.ref];

        if (keyUser) {
            user[keyUser] = answer[answer.type];
        }
    }
    return user;
}

export const getObjetShop = (answers) => {
    const shop = {}

    for (let i = 0; i < answers.length; i += 1) {
        const answer = answers[i];
        const keyShop = renameShop[answer.field.ref];
    
        if (keyShop) {
            if (['choice', 'choices'].includes(answer.type)) {
                shop[keyShop] = getValueEnum(keyShop, answer);
            } else {
                shop[keyShop] = answer[answer.type];
            }
        }
    }
    return shop;
}

export const getObjetProduct = (answers, num) => {
    const nameProducts = renameProduct(num);
    const product = {}
    
    for (let i = 0; i < answers.length; i += 1) {
        const answer = answers[i];
        const keyProduct = nameProducts[answer.field.ref];
        
        if (keyProduct) {
            if (['choice', 'choices'].includes(answer.type)) {
                product[keyProduct] = getValueEnum(keyProduct, answer);
            } else {
                product[keyProduct] = answer[answer.type];
            }

        }
    }
    return product;
}

// TODO: INFO: getValueEnum() uniquement un total de 2 choix avec 'both'
function getValueEnum(key, answer){
    const type = answer.type;

    if (type === 'choice' || (type === 'choices' && answer.choices.labels.length === 1)){
        return enumKeys[key][answer.choices?.labels[0] || answer.choice.label];
    } else if (type === 'choices') {
        return enumKeys[key]['both'];
    }
}
