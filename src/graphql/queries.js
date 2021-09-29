import { gql } from '@apollo/client';
import { REPO_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPO_INFO}

  query repos(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...RepositoryInfo
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  ${REPO_INFO}

  query get_repo($id: ID!) {
    repository(id: $id) {
      ...RepositoryInfo
    }
  }
`;

export const GET_REPO_REVIEWS = gql`
  query get_repo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      reviews(first: $first, after: $after) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            user {
              username
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;

export const CHECK_AUTH = gql`
  query {
    authorizedUser {
      id
    }
  }
`;
