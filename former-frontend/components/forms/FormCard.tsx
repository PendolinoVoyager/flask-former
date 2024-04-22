import Link from "next/link";

export default function FormCard({ form }: { form: Form }) {
  return (
    <div className="card">
      <h2>{form.name}</h2>
      <p>{form.description}</p>
      <Link href={`/form/${form._id.$oid}`}>View</Link>
    </div>
  );
}
