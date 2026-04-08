// import { gql } from "@apollo/client";

// const GET_PRODUCTS = gql`
//     query GetProducts($)
// `;
export const GET_PRODUCT_QUERY = `
    query ($skip: Int!, $limit: Int!, $uid: String) {
        getProducts(
                pagination: { skip: $skip, limit: $limit }
                filter: { uid: $uid }
            ) {
            result {
                count
                products {
                    uid
                    enName
                    images {                
                        url
                    }

                    productAttributes {     
                        enLabel
                        values { enName }
                    }

                    detailedDescriptions {  
                        enLabel
                        values { enName }
                    }

                    deliveries {            
                        enLabel
                        values { enName }
                    }

                    serviceAndDeliveries {  
                        enLabel
                        values { enName }
                    }

                    priceAndStocks {        
                        enLabel
                        values { enName }
                    }

                    variants {              
                        mrpPrice
                        ebsItemCode
                        posItemCode
                        quantity
                        discount {
                            amount
                            value
                            type
                        }
                    }
                }
            }
        }
    }
`;
