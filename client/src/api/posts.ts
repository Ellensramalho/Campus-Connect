import axiosInstace from "./axiosInstance";

// Criar postagem
export const addPost = async (title: string, content: string | undefined, token: string, tags?: string[]) => {
  const res = await axiosInstace.post("/api/post", 
    { title, content, tags },
    {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    }
  );

  return res.data;
}

// Deletar postagens
export const deletePost = async (post_id: string | undefined, token: string) => {
  const res = await axiosInstace.delete(`/api/post/${post_id}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Editar postagens 
export const editPost = async (post_id: string | undefined, title: string, content: string | undefined, token: string, tags?: string[]) => {
  const res = await axiosInstace.patch(`/api/post/${post_id}`, 
    { title, content, tags },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Listar postagens no feed
export const loadPosts = async (token: string) => {
  const res = await axiosInstace.get("/api/post", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Listar postagens do usuário
export const LoadMyPosts = async (token: string) => {
  const res = await axiosInstace.get("/api/post/author", 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Salvar postagem
export const SavePosts = async (post_id: string, token: string) => {
  const res = await axiosInstace.post(`/api/post/${post_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Listar postagens salvas
export const GetSavedPosts = async (token: string) => {
  const res = await axiosInstace.get(`/api/post/saveds`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Dar Like nos posts
export const likePosts = async (
  post_id: string | undefined,
  token: string
) => {
  const res = await axiosInstace.post(
    `/api/post/like/${post_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data.data;
};

// Retirar like
export const removeLikePost = async (
  user_id: string | undefined,
  post_id: string,
  token: string
) => {
  const res = await axiosInstace.delete("/api/post/unlike", {
    data: {
      user_id,
      post_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Listar comentários de uma publicação
export const loadComments = async (post_id: string | undefined, token: string) => {
  const res = await axiosInstace.get(`/api/comment/post/${post_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//Criar comentáio
export const createComents = async (
  content: string,
  post_id: string,
  token: string
) => {
  const res = await axiosInstace.post(
    `/api/comment/post/${post_id}`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Editar comentário
export const editComment = async (
  commentId: string | undefined,
  content: string,
  token: string
) => {
  const res = await axiosInstace.patch(
    `/api/comment/${commentId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Deletar comentário
export const deleteComment = async (comment_id: string | undefined, token: string) => {
  const res = await axiosInstace.delete(`/api/comment/${comment_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}

// Dar Like nos comentários
export const likeComment = async (user_id: string | undefined, comment_id: string | undefined, token: string) => {
  const res = await axiosInstace.post("/api/comment/like", {
    user_id,
    comment_id,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

// Listar respostas de comentários
export const loadResponses = async (comment_id: string | undefined, token: string) => {
  const res = await axiosInstace.get(`/api/responses/comment/${comment_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Deletar respostas de comentário
export const deleteResponse = async (response_id: string, token: string) => {
  const res = await axiosInstace.delete(`/api/response/${response_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Responder Comentário
export const responseComment = async (comment_id: string | undefined, content: string, token: string) => {
  const res = await axiosInstace.post(`/api/response/comment/${comment_id}`,
    {
      content
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}
