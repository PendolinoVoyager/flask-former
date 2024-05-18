import React from "react";
import { TextComponent as ITextComponent } from "@/misc/types"; 
import styles from "../FormComponent.module.css";

const TextComponentAnswer: React.FC<ITextComponent> = ({ label }) => {
  return (
    <div className={styles.textComponent}>
      <label className={styles.label}>{label}</label>
      <input className={styles.answerInput} type="text" />
    </div>
  );
};

export default TextComponentAnswer;
