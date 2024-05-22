import { fetchForm } from "@/misc/actions";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import RawHTMLForm from "@/components/forms/RawHTMLForm";
import dynamic from "next/dynamic";

// Placeholder component using hooks.
// It will
const FormExplorer = dynamic(() => import("@/components/forms/FormExplorer"), {
  ssr: false,
});

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

  return (
    <div className={classes.formPage}>
      <RawHTMLForm hidden form={form} />
      <RawHTMLForm form={form} />
    </div>
  );
}
