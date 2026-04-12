export const GET_PRODUCTS = `
    query (
        $skip: Int!
        $limit: Int!
        $sort: ProductStockSort
        $filter: ProductFilterInput
    ) {
        getProducts(
                filter: $filter
                pagination: { skip: $skip, limit: $limit }
                sort: $sort
            ) {
            message
            statusCode
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
                            percentage
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
        message
        statusCode
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
                percentage
              }
            }
          }
        }
      }
    }
`;
