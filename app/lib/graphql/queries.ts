export const GET_PRODUCTS = `
    query ($filter: ProductFilterInput, $pagination: PaginationInput, $sort: ProductStockSort) {
         getProducts(filter: $filter, pagination: $pagination, sort: $sort) {
            message            
            statusCode
            
            result {
                count

                products {
                    uid
                    isActive
                    enName
                    bnName
                    slug
                    inventoryStockUid
                    isStockAvilable
                    isDiscountPercentageShowable
                    vatPercentage
                    isFavorite

                    category {
                        uid
                        enName
                    }

                    images {
                        url
                        signedUrl
                        name
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
                        isAvailable

                        discount {
                            amount
                            type
                            value
                            percentage
                            applicableFor
                            isApplicableForShoppingCart                            
                        }                        
                    }
                }

                filterOptions {
                    key
                    values {
                        bnName
                        enName
                    }
                }

                priceFilterOption {
                    max
                    min
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
                isAvailable          
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
            
            
            inventoryStockUid
            isStockAvilable
            isDiscountPercentageShowable
            vatPercentage
            isFavorite
          }
        }
      }
    }
`;
