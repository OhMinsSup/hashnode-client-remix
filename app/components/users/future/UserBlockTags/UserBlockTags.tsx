import React from "react";
import styles from "./styles.module.css";
import { BlockBox } from "../BlockBox";

export default function UserBlockTags() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <BlockBox
          index={0}
          title="About Me"
          linkText="Add Bio"
          link="/settings#moreAboutYou"
          desciption={`Your bio is empty. Tell the world who you are by writing a short description about you.`}
        />
        <BlockBox
          index={1}
          title="My Tech Stack"
          linkText="Add your skills"
          link="/settings#techstack"
        />
        <BlockBox
          index={2}
          title="I am available for"
          linkText="Add Available For"
          link="/settings#availableFor"
        />
      </div>
    </div>
  );
}
