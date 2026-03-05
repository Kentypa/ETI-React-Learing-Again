import axios from "axios";
import type { PostType } from "../types/post-type";

export const feedService = {
  getAll: () =>
    axios.get<PostType[]>("https://jsonplaceholder.typicode.com/posts"),
  detail: (postId: number) =>
    axios.get<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`),
};
