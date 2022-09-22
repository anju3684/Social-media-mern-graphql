import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache) {
      setConfirmOpen(false);
      cache.updateQuery({ query:FETCH_POSTS_QUERY  }, ({ getPosts }) => {
        return { getPosts: getPosts.filter((p)=>p.id!==postId) };
      });
      if (callback) callback();
    },
    variables: {
      postId
    }
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;