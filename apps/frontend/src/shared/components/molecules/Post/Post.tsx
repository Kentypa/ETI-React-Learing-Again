import type { FC } from "react";
import type { PostType } from "../../../../mock/mock-data";
import styles from "./Post.module.css";
import { Card } from "../Card/Card";
import { Button } from "../../atoms/Button/Button";

type PostProps = Pick<PostType, "author" | "avatar" | "content" | "date">;

export const Post: FC<PostProps> = ({ author, avatar, content, date }) => {
  return (
    <Card>
      <div className={styles.header}>
        <img src={avatar} alt="avatar" className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.author}>{author}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      <p className={styles.content}>{content}</p>

      <div className={styles.actions}>
        <Button variant="secondary">Like</Button>
        <Button variant="primary">Comment</Button>
      </div>
    </Card>
  );
};
