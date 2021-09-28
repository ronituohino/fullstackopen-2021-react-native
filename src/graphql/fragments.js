import { gql } from '@apollo/client';

export const REPO_INFO = gql`
  fragment RepositoryInfo on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl

    stargazersCount
    forksCount
    reviewCount
    ratingAverage

    url
  }
`;
