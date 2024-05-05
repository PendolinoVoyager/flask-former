import { IMAGE_URL, fetchForm } from "@/misc/http";
import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import { AvailablePaths, PATH, constructPath } from "@/app/paths";
import Link from "next/link";
type _LocalProps = {
  params: {
    slug: string;
  };
};
export default async function FormPage({ params }: _LocalProps) {
  const form = await fetchForm(params.slug);

  console.log(form);
  if (form instanceof Error) {
    notFound();
  }
  return (
    <div className={classes.formPage}>
      <Image
        src={`${IMAGE_URL}/${form.image}`}
        alt={form.name}
        priority
        fill
        sizes="max-width(100%)"
      />
      <p>{form.name}</p>
      <p>{form.description ?? "No description provided."}</p>
      <Link href={constructPath(AvailablePaths.ANSWER, form.id)}>
        <button />
      </Link>
    </div>
  );
}
