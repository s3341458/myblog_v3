import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const POST_COMMENT = gql`
  mutation createComment($content: String!) {
    createComment(
      input: {
        content: $content
        postPath: "hello-world"
        timestamp: "2019-08-14T16:00:00-07:00"
      }
    ) {
      id
      content
      owner
      postPath
      timestamp
    }
  }
`

function CommentForm() {
  let input
  const postComment = useMutation(POST_COMMENT)[0]

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          postComment({ variables: { content: input.value  } })
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
  )
}

export default CommentForm
