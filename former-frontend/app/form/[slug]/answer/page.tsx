import { fetchForm } from "@/misc/actions";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import FormAnswerable from "@/components/forms/FormAnswerable";
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
  return <div className={classes.formPage}><FormAnswerable form={form} /></div>;
}
