import { gql } from '@apollo/client';
import { REPO_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPO_INFO}

  query {
    repositories {
      edges {
        node {
          ...RepositoryInfo
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  ${REPO_INFO}

  query get_repo($id:ID!) {
    repository(id: $id){
      ...RepositoryInfo
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
