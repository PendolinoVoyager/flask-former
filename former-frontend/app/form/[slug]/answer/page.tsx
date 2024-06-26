import { fetchForm } from "@/misc/actions";
import { notFound } from "next/navigation";
import RawHTMLForm from "@/components/forms/RawHTMLForm";
import dynamic from "next/dynamic";
import { constructPath, AvailablePaths } from "@/app/paths";
import SquareButton from "@/components/UI/SquareButton";
import Link from "next/link";
// Component rendered dunamically for SEO
const FormAnswerable = dynamic(
  () => import("@/components/forms/FormAnswerable"),
  {
    ssr: false,
  }
);

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
    <div>
          <Link href={constructPath(AvailablePaths.FORM, form.id)}>
            <SquareButton color="var(--color-warning)">Go back</SquareButton>
        </Link>
      <RawHTMLForm hidden form={form} />
      <FormAnswerable form={form} />
    </div>
  );
}
