import { IMAGE_URL } from "@/misc/http";
import Link from "next/link";
import Image from "next/image";
import classes from "./FormCard.module.css";
import { PATH, constructPath } from "@/app/paths";
export default function FormCard({ form }: { form: Form }) {
  return (
    <Link
      className={classes["form-card"]}
      href={constructPath(PATH.FORM, form.id)}
    >
      <h2>{form.name}</h2>
      <p>{form.description}</p>
      {/* <Image src={`${IMAGE_URL}/${form.image}`} alt={form.name} fill /> */}
    </Link>
  );
}
