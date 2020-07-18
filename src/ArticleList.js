import React from "react";
import styles from "./Galery.module.css";

export default function ArticleList({ articles }) {
  return (
    <ul className={styles.position}>
      {articles.map(({ id, webformatURL, largeImageUrl }) => (
        <li className={styles.pictures} key={id}>
          <a href={largeImageUrl}>
            <img
              className={styles.tofit}
              src={webformatURL}
              alt=""
              width="150"
              height="84"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
