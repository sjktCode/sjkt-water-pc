import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query getProducts($page: PageInput!, $name: String) {
        getProducts(page: $page, name: $name) {
            code
            message
            page {
                total
                pageNum
                pageSize
            }
            data {
                id
                limitBuyNumber
                name
                coverUrl
                bannerUrl
                desc
                originalPrice
                stock
                status
                preferentialPrice
            }
        }
    }
`;

export const COMMIT_PRODUCT = gql`
    mutation commitProductInfo($params: PartialProductInput!, $id: String) {
        commitProductInfo(params: $params, id: $id) {
            code
            message
        }
    }
`;

export const GET_PRODUCT = gql`
    query getProductInfo($id: String!) {
        getProductInfo(id: $id) {
            code
            message
            data {
                id
                limitBuyNumber
                name
                type
                coverUrl
                bannerUrl
                desc
                originalPrice
                stock
                preferentialPrice
                cards {
                    id
                    name
                    type
                    time
                    validityDay
                    course {
                        name
                        id
                    }
                }
            }
        }
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: String!) {
        deleteProduct(id: $id) {
            code
            message
        }
    }
`;

export const GET_PRODUCT_TYPES = gql`
    query getProductTypes {
        getProductTypes {
            data {
                key
                title
            }
        }
    }
`;
