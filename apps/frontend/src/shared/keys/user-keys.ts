import { createQueryKeys } from "@lukemorales/query-key-factory";
import { userService } from "../services/user-service";

export const userKeys = createQueryKeys("user", {
  detail: (userId: number) => ({
    queryKey: [{ userId }],
    queryFn: () => userService.detail(userId),
  }),
});
