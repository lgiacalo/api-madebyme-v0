export default {
    "type": "quiz",
    "title": "ShopFilled",
    "workspace": {
        "href": "https://api.typeform.com/workspaces/pQJdtf"
    },
    "theme": {
        "href": "https://api.typeform.com/themes/r3HGFbkl"
    },
    "settings": {
        "language": "fr",
        "progress_bar": "proportion",
        "meta": {
            "title": "ShopFilled",
            "allow_indexing": false,
            "description": "Template du shop",
            "image": {
                "href": "https://images.typeform.com/images/Ug3JKmEFnRQm"
            }
        },
        "hide_navigation": false,
        "is_public": true,
        "is_trial": false,
        "show_progress_bar": true,
        "show_typeform_branding": false,
        "are_uploads_public": false,
        "show_time_to_complete": false,
        "show_number_of_submissions": false,
        "show_cookie_consent": false,
        "show_question_number": true,
        "pro_subdomain_enabled": false,
        "capabilities": {
            "e2e_encryption": {
                "enabled": false,
                "modifiable": false
            }
        }
    },
    "thankyou_screens": [
        {
            "ref": "ending_customer_with_cash_collect",
            "title": "Parfait nous préparons votre commande",
            "type": "thankyou_screen",
            "properties": {
                "show_button": false,
                "share_icons": false,
                "button_mode": "default_redirect",
                "description": "Nous vous attendons en boutique avec un total de {{var:price}}"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ui7Tmm8GYq6R",
                "properties": {
                    "description": "urban-man-with-mobile-phone-is-shopping-in-online-store-shopping-bag-is-in-supermarket-cart4"
                }
            }
        },
        {
            "ref": "ending_customer_with_cash_delivery",
            "title": "Parfait nous préparons votre commande :)",
            "type": "thankyou_screen",
            "properties": {
                "show_button": false,
                "share_icons": false,
                "button_mode": "default_redirect",
                "description": "Paiement en espèce à la livraison de {{var:price}} (dont {{var:delivery_fees}}€ de frais)"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ui7Tmm8GYq6R",
                "properties": {
                    "description": "urban-man-with-mobile-phone-is-shopping-in-online-store-shopping-bag-is-in-supermarket-cart4"
                }
            }
        },
        {
            "ref": "ending_customer_with_cb_collect",
            "title": "Parfait nous avons bien reçu votre paiement, nous préparons votre commande :)",
            "type": "thankyou_screen",
            "properties": {
                "show_button": false,
                "share_icons": false,
                "button_mode": "default_redirect"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/t9ymqs7kELGw",
                "properties": {
                    "description": "urban-man-with-mobile-phone-is-shopping-in-online-store-shopping-bag-is-in-supermarket-cart3"
                }
            }
        },
        {
            "ref": "ending_customer_with_cb_delivery",
            "title": "Parfait nous avons bien reçu votre paiement, nous préparons votre commande :)",
            "type": "thankyou_screen",
            "properties": {
                "show_button": false,
                "share_icons": false,
                "button_mode": "default_redirect"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/t9ymqs7kELGw",
                "properties": {
                    "description": "urban-man-with-mobile-phone-is-shopping-in-online-store-shopping-bag-is-in-supermarket-cart3"
                }
            }
        },
        {
            "ref": "default_tys",
            "title": "C'est fait ! Merci pour votre temps.",
            "type": "thankyou_screen",
            "properties": {
                "show_button": false,
                "share_icons": false
            }
        }
    ],
    "welcome_screens": [
        {
            "ref": "welcome_shop",
            "title": "Bienvenue dans la boutique {{var:shop_name}}",
            "properties": {
                "show_button": true,
                "button_text": "Commencer vos achats"
            },
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/tYYKkUCQ9Ekz",
                "properties": {
                    "description": "3d-fluency-shop"
                }
            }
        }
    ],
    "fields": [
        {
            "title": "{{var:name_product_1}} à {{var:price_product_1}} € ",
            "ref": "number_product_1",
            "properties": {
                "description": "Saisissez la quantité souhaitée"
            },
            "validations": {
                "required": false
            },
            "type": "number",
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ztxXB72M5URi",
                "properties": {
                    "description": "text_picture_product1"
                }
            }
        },
        {
            "title": "{{var:name_product_2}} à {{var:price_product_2}} € ",
            "ref": "number_product_2",
            "properties": {
                "description": "Saisissez la quantité souhaitée"
            },
            "validations": {
                "required": false
            },
            "type": "number",
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ztxXB72M5URi",
                "properties": {
                    "description": "text_picture_product2"
                }
            }
        },
        {
            "title": "{{var:name_product_3}} à {{var:price_product_3}} € ",
            "ref": "number_product_3",
            "properties": {
                "description": "Saisissez la quantité souhaitée"
            },
            "validations": {
                "required": false
            },
            "type": "number",
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ztxXB72M5URi",
                "properties": {
                    "description": "text_picture_product_3"
                }
            }
        },
        {
            "title": "{{var:name_product_4}} à {{var:price_product_4}} € ",
            "ref": "number_product_4",
            "properties": {
                "description": "Saisissez la quantité souhaitée"
            },
            "validations": {
                "required": false
            },
            "type": "number",
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ztxXB72M5URi",
                "properties": {
                    "description": "text_picture_product_4"
                }
            }
        },
        {
            "title": "{{var:name_product_5}} à {{var:price_product_5}} € ",
            "ref": "number_product_5",
            "properties": {
                "description": "Saisissez la quantité souhaitée"
            },
            "validations": {
                "required": false
            },
            "type": "number",
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/ztxXB72M5URi",
                "properties": {
                    "description": "text_picture_product4"
                }
            }
        },
        {
            "title": "Quel est votre adresse email ?",
            "ref": "email_address_customer",
            "properties": {},
            "validations": {
                "required": true
            },
            "type": "email",
            "attachment": {
                "type": "image",
                "href": "https://images.typeform.com/images/CnktzFncY5B4",
                "properties": {
                    "description": "bermuda-763"
                }
            },
            "layout": {
                "type": "float",
                "attachment": {
                    "type": "image",
                    "href": "https://images.typeform.com/images/CnktzFncY5B4",
                    "properties": {
                        "brightness": 0,
                        "description": "bermuda-763"
                    }
                },
                "placement": "right"
            }
        },
        {
            "title": "Comment souhaitez-vous régler ?",
            "ref": "payment_type_customer",
            "properties": {
                "randomize": false,
                "allow_multiple_selection": false,
                "allow_other_choice": false,
                "vertical_alignment": true,
                "choices": [
                    {
                        "ref": "c767dba3-77c9-4e10-aca0-1301fb54a961",
                        "label": "En espèce"
                    },
                    {
                        "ref": "6996755c-bb98-44df-bacf-1ec13f108867",
                        "label": "Par carte bancaire"
                    }
                ]
            },
            "validations": {
                "required": true
            },
            "type": "multiple_choice"
        },
        {
            "title": "Comment voulez-vous récupérer la commande ?",
            "ref": "order_type_customer",
            "properties": {
                "description": "Les frais de livraison sont de {{var:delivery_fees}}€",
                "randomize": false,
                "allow_multiple_selection": false,
                "allow_other_choice": false,
                "vertical_alignment": true,
                "choices": [
                    {
                        "ref": "ac77462d-7f2b-473a-a671-c79a779dac65",
                        "label": "Livraison"
                    },
                    {
                        "ref": "c9a8362a-1762-415f-9111-faf859a8c588",
                        "label": "A récupérer en boutique"
                    }
                ]
            },
            "validations": {
                "required": true
            },
            "type": "multiple_choice"
        },
        {
            "title": "Bien reçu ! Pour votre livraison, veuillez nous indiquer vos prénom et nom",
            "ref": "name_customer",
            "properties": {
                "description": "Frais de livraison : {{var:delivery_fees}} €"
            },
            "validations": {
                "required": true
            },
            "type": "short_text"
        },
        {
            "title": "Et quelle est votre adresse postale ?",
            "ref": "address_customer",
            "properties": {},
            "validations": {
                "required": true
            },
            "type": "long_text"
        },
        {
            "title": "Procédez au paiement: ",
            "ref": "payment",
            "properties": {
                "description": "Nous préparons votre commande",
                "button_text": "Continuer",
                "show_button": true,
                "currency": "EUR",
                "price": {
                    "type": "variable",
                    "value": "price"
                }
            },
            "validations": {
                "required": false
            },
            "type": "payment"
        }
    ],
    "hidden": [
        "token"
    ],
    "variables": {
        "delivery_fees": 0,
        "name_product_1": "",
        "name_product_2": "",
        "name_product_3": "",
        "name_product_4": "",
        "name_product_5": "",
        "order_price": 0, // inutile ??
        "order_type": "delivery",
        "payment_type": "both",
        "price": 0,
        "price_product_1": 0,
        "price_product_2": 0,
        "price_product_3": 0,
        "price_product_4": 0,
        "price_product_5": 0,
        "score": 0,
        "shop_name": "La Boutique de tous les plaisirs",
        "version": "v0"
    },
    "logic": [
        {
            "type": "field",
            "ref": "number_product_1",
            "actions": [
                {
                    "action": "multiply",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price_product_1"
                        },
                        "value": {
                            "type": "field",
                            "value": "number_product_1"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_1"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "add",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price"
                        },
                        "value": {
                            "type": "variable",
                            "value": "price_product_1"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_1"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "email_address_customer"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "name_product_2"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "null"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "price_product_2"
                                    },
                                    {
                                        "type": "constant",
                                        "value": 0
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "number_product_2"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "number_product_2",
            "actions": [
                {
                    "action": "multiply",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price_product_2"
                        },
                        "value": {
                            "type": "field",
                            "value": "number_product_2"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_2"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "add",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price"
                        },
                        "value": {
                            "type": "variable",
                            "value": "price_product_2"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_2"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "email_address_customer"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "name_product_3"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "null"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "price_product_3"
                                    },
                                    {
                                        "type": "constant",
                                        "value": 0
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "number_product_3"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "payment_type_customer",
            "actions": [
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "order_type_customer"
                        }
                    },
                    "condition": {
                        "op": "equal",
                        "vars": [
                            {
                                "type": "variable",
                                "value": "order_type"
                            },
                            {
                                "type": "constant",
                                "value": "both"
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "name_customer"
                        }
                    },
                    "condition": {
                        "op": "equal",
                        "vars": [
                            {
                                "type": "variable",
                                "value": "order_type"
                            },
                            {
                                "type": "constant",
                                "value": "delivery"
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cash_collect"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "collect"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "payment_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c767dba3-77c9-4e10-aca0-1301fb54a961"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "payment"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "collect"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "payment_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "6996755c-bb98-44df-bacf-1ec13f108867"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "order_type_customer",
            "actions": [
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "name_customer"
                        }
                    },
                    "condition": {
                        "op": "is",
                        "vars": [
                            {
                                "type": "field",
                                "value": "order_type_customer"
                            },
                            {
                                "type": "choice",
                                "value": "ac77462d-7f2b-473a-a671-c79a779dac65"
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cash_collect"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "order_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c9a8362a-1762-415f-9111-faf859a8c588"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "cash"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "payment"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "order_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c9a8362a-1762-415f-9111-faf859a8c588"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "cb"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cash_collect"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "order_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c9a8362a-1762-415f-9111-faf859a8c588"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "payment_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c767dba3-77c9-4e10-aca0-1301fb54a961"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "payment"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "order_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c9a8362a-1762-415f-9111-faf859a8c588"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "payment_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "6996755c-bb98-44df-bacf-1ec13f108867"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "address_customer",
            "actions": [
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cash_delivery"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "cash"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "payment_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c767dba3-77c9-4e10-aca0-1301fb54a961"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "payment"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "cb"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "payment_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "6996755c-bb98-44df-bacf-1ec13f108867"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "payment",
            "actions": [
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cb_collect"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "collect"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "order_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "c9a8362a-1762-415f-9111-faf859a8c588"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cb_delivery"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "delivery"
                                    }
                                ]
                            },
                            {
                                "op": "is",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "order_type_customer"
                                    },
                                    {
                                        "type": "choice",
                                        "value": "ac77462d-7f2b-473a-a671-c79a779dac65"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "default_tys"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "email_address_customer",
            "actions": [
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "name_customer"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "delivery"
                                    }
                                ]
                            },
                            {
                                "op": "not_equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "both"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "payment_type_customer"
                        }
                    },
                    "condition": {
                        "op": "equal",
                        "vars": [
                            {
                                "type": "variable",
                                "value": "payment_type"
                            },
                            {
                                "type": "constant",
                                "value": "both"
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "order_type_customer"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "both"
                                    }
                                ]
                            },
                            {
                                "op": "not_equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "both"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "thankyou",
                            "value": "ending_customer_with_cash_collect"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "cash"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "collect"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "payment"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "payment_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "cb"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "order_type"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "collect"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "number_product_3",
            "actions": [
                {
                    "action": "multiply",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price_product_3"
                        },
                        "value": {
                            "type": "field",
                            "value": "number_product_3"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_3"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "add",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price"
                        },
                        "value": {
                            "type": "variable",
                            "value": "price_product_3"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_3"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "email_address_customer"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "name_product_4"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "null"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "price_product_4"
                                    },
                                    {
                                        "type": "constant",
                                        "value": 0
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "number_product_4"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "number_product_4",
            "actions": [
                {
                    "action": "multiply",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price_product_4"
                        },
                        "value": {
                            "type": "field",
                            "value": "number_product_4"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_4"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "add",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price"
                        },
                        "value": {
                            "type": "variable",
                            "value": "price_product_4"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_4"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "email_address_customer"
                        }
                    },
                    "condition": {
                        "op": "or",
                        "vars": [
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "name_product_5"
                                    },
                                    {
                                        "type": "constant",
                                        "value": "null"
                                    }
                                ]
                            },
                            {
                                "op": "equal",
                                "vars": [
                                    {
                                        "type": "variable",
                                        "value": "price_product_5"
                                    },
                                    {
                                        "type": "constant",
                                        "value": 0
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "number_product_5"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "name_customer",
            "actions": [
                {
                    "action": "add",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price"
                        },
                        "value": {
                            "type": "variable",
                            "value": "delivery_fees"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        },
        {
            "type": "field",
            "ref": "number_product_5",
            "actions": [
                {
                    "action": "multiply",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price_product_5"
                        },
                        "value": {
                            "type": "field",
                            "value": "number_product_5"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_5"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "add",
                    "details": {
                        "target": {
                            "type": "variable",
                            "value": "price"
                        },
                        "value": {
                            "type": "variable",
                            "value": "price_product_5"
                        }
                    },
                    "condition": {
                        "op": "greater_than",
                        "vars": [
                            {
                                "type": "field",
                                "value": "number_product_5"
                            },
                            {
                                "type": "constant",
                                "value": 0
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "email_address_customer"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }
            ]
        }
    ],
    "_links": {
        "display": "https://mabyme-shops.typeform.com/shopV0"
    }
}