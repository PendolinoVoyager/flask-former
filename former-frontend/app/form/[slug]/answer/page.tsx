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

  if (form instanceof Error) {
    notFound();
  }
  return <div className={classes.formPage}>HEHE</div>;
}
