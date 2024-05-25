import { IMAGE_URL } from "@/misc/http";
import Link from "next/link";
import Image from "next/image";
import classes from "./FormCard.module.css";
import { AvailablePaths, PATH, constructPath } from "@/app/paths";
import { Form } from "@/misc/types";
import { useAppContext } from "@/stores/appContext";
import { useState } from "react";

export default function FormCard({ form }: { form: Form }) {
  const { addBookmark, removeBookmark, isBookmarked } = useAppContext();

  const toggleBookmark = (id: string) => {
    if (isBookmarked(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };
    return (
      <>
    <Link
      className={classes["form-card"]}
      href={constructPath(AvailablePaths.FORM, form.id)}
    >
      <div className={classes["form-card-image"]}>
        <Image
          src={`${IMAGE_URL}/${form.image}`}
          alt={form.name}
          fill
          sizes="(max-width: 766px) 100%, 33vw"
          placeholder="blur"
          blurDataURL="/blur.jpg"
        />
      </div>
      <div className={classes["form-card-details"]}>
        <h2 className={classes["form-card-title"]}>{form.name}</h2>
        <p>{form.description ?? "No description"}</p>
      </div>
    </Link>
      <button onClick={toggleBookmark.bind(null, form.id)}>{!isBookmarked(form.id) ? "Bookmark" : "Is bookmarked!"}</button>
      </>
  );
}
