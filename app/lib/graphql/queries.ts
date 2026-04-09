// import { gql } from "@apollo/client";

// const GET_PRODUCTS = gql`
//     query GetProducts($)
// `;
export const GET_PRODUCTS = `
    query ($skip: Int!, $limit: Int!, $uid: String, $posItemCode: String, $sort: ProductStockSort) {
        getProducts(
                pagination: { skip: $skip, limit: $limit }
                filter: { uid: $uid, posItemCode: $posItemCode }
                sort: $sort
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

export const GET_PRODUCT = `
    query ($uid: String!) {
      getProducts(
        filter: { uid: $uid }
        pagination: { skip: 0, limit: 1 }
      ) {
        result {
          products {
            uid
            enName
            images {
              url
            }
            variants {
              mrpPrice
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
