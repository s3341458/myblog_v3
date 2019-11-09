/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = `query GetComment($postPath: String!, $timestamp: AWSDateTime!) {
  getComment(postPath: $postPath, timestamp: $timestamp) {
    content
    postPath
    posterName
    timestamp
    owner
  }
}
`;
export const listComments = `query ListComments(
  $postPath: String
  $timestamp: ModelStringKeyConditionInput
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listComments(
    postPath: $postPath
    timestamp: $timestamp
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      content
      postPath
      posterName
      timestamp
      owner
    }
    nextToken
  }
}
`;
