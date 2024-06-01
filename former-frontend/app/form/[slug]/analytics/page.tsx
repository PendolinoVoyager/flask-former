import { IMAGE_URL } from "@/misc/http";
import { analyticsByCriteria, fetchForm } from "@/misc/actions";
import { AnalysisRequest, Criteria } from "@/misc/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import SquareButton from "@/components/UI/SquareButton";
import Link from "next/link";
import { AvailablePaths, constructPath } from "@/app/paths";

type _LocalProps = {
  params: {
    slug: string;
  };
};
export default async function FormPage({ params }: _LocalProps) {
  const form = await fetchForm(params.slug);
  if (form instanceof Error) {
    notFound();
  }
  const req: AnalysisRequest[] = Object.values(form.components).map((c, i) => {
    return {
      component_index: i,
      criteria: {
        type: Criteria.Equals,
        value: "TEST",
      },
    } as AnalysisRequest;
  });
  const analysis = await analyticsByCriteria(form.id, req);
  return (
    <div className={classes.formPage}>
      <Link href={constructPath(AvailablePaths.FORM, form.id)}>
        <SquareButton color="var(--color-warning)">Go back</SquareButton>
      </Link>
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
        </div>
        {analysis &&
          analysis.data &&
          Array.isArray(analysis.data) &&
          analysis.data.map((f: any) => {
            <span>{f}</span>;
          })}
      </section>
    </div>
  );
}
