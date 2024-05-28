import { IMAGE_URL } from "@/misc/http";
import Link from "next/link";
import Image from "next/image";
import classes from "./FormCard.module.css";
import { AvailablePaths, PATH, constructPath } from "@/app/paths";
import { Form } from "@/misc/types";
import BookmarkIcon from "../UI/Bookmark";

export default function FormCard({ form }: { form: Form }) {
  return (
    <div className={classes["form-card"]}>
      <Link href={constructPath(AvailablePaths.FORM, form.id)}>
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
      </Link>
      <div className={classes["form-card-details"]}>
        <h2 className={classes["form-card-title"]}>{form.name}</h2>
        <p>{form.description ?? "No description"}</p>
      </div>
      <BookmarkIcon id={form.id} />
    </div>
  );
}
