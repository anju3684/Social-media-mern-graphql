import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    onError() {
      console.log(error);
    },
    update(cache, result) {
      cache.updateQuery({ query:FETCH_POSTS_QUERY  }, ({ getPosts }) => {
        return { getPosts: getPosts.concat(result.data.createPost) };
      });
      values.body = "";
    },
    onCompleted() {
      console.log("completed");
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World!"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error?true:false}
    
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
    {
      error && (
        <div className="ui error message" style={{marginBottom:20}}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )
    }
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
