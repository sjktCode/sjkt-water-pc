import { gql } from '@apollo/client';

export const GET_CARDS = gql`
    query getCards($courseId: String!) {
        getCards(courseId: $courseId) {
            code
            message
            data {
                id
                name
                type
                time
                validityDay
                course {
                    id
                    name
                }
            }
        }
    }
`;

export const COMMIT_CARD = gql`
    mutation commitCardInfo($params: CardInput!, $courseId: String!, $id: String!) {
        commitCardInfo(params: $params, courseId: $courseId, id: $id) {
            code
            message
        }
    }
`;

export const DELETE_CARD = gql`
    mutation deleteCard($id: String!) {
        deleteCard(id: $id) {
            code
            message
        }
    }
`;
