import { IMAGE_URL } from "@/misc/http";
import { fetchForm } from "@/misc/actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import { AvailablePaths, PATH, constructPath } from "@/app/paths";
import Link from "next/link";
import SquareButton from "@/components/UI/SquareButton";
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
      <div className={classes.imageWrapper}>
        <Image
          src={`${IMAGE_URL}/${form.image}`}
          alt={form.name}
          priority
          fill
          sizes="(max-width: 700px), 100vh, 33vw"
        />
      </div>
      <section>
        <h3 className={classes.name}>{form.name}</h3>
        <div className={classes.details}>
          <p className={classes.description}>
            {form.description ?? "No description provided."}
          </p>
          <Link href={constructPath(AvailablePaths.ANSWER, form.id)}>
            <SquareButton>Take the form</SquareButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
