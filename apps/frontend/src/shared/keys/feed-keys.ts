import { createQueryKeys } from "@lukemorales/query-key-factory";
import { feedService } from "../services/feed-service";

export const feedKeys = createQueryKeys("feed", {
  all: null,
  detail: (postId: number) => ({
    queryKey: [{ postId }],
    queryFn: () => feedService.detail(postId),
  }),
});
