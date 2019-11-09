/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = `subscription OnCreateComment($owner: String!) {
  onCreateComment(owner: $owner) {
    content
    postPath
    posterName
    timestamp
    owner
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment($owner: String!) {
  onUpdateComment(owner: $owner) {
    content
    postPath
    posterName
    timestamp
    owner
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment($owner: String!) {
  onDeleteComment(owner: $owner) {
    content
    postPath
    posterName
    timestamp
    owner
  }
}
`;
