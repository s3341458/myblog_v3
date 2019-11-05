import React, { useState } from "react"
import { Auth } from "aws-amplify"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { createComment } from "../graphql/mutations"

const POST_COMMENT = gql`
  ${createComment}
`

//const POST_COMMENT = gql`
//mutation createComment($content: String!) {
//createComment(
//input: {
//content: $content
//postPath: "hello-world"
//timestamp: "2019-08-14T16:00:00-07:00"
//}
//) {
//id
//content
//owner
//postPath
//timestamp
//}
//}
//`

function CommentForm(props) {
  let input
  const postComment = useMutation(POST_COMMENT)[0]
  const [currentUser, setCurrentUser] = useState(null)

  Auth.currentUserInfo().then(user => {
    console.log("debug here", user)
    console.log(props, "debug here");
    if (!currentUser) {
      setCurrentUser(user)
    }
  })

  return currentUser ? (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          postComment({
            variables: {
              input: {
                content: input.value,
                postPath: props.currentPath.replace(/\//g, ""),
                timestamp: new Date().toISOString(),
                posterName:
                  currentUser.attributes.given_name +
                  currentUser.attributes.family_name,
              },
            },
          })
          input.value = ""
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  ) : (
    <button
      onClick={() =>
        Auth.federatedSignIn({
          provider: "Facebook",
          scope: "email, public_profile",
        })
      }
    >
      Sign In With Facebook
    </button>
  )
}

export default CommentForm
