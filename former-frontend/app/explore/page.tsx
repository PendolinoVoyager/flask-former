import { Suspense } from "react";
import Spinner from "@/components/UI/Spinner";
import FormExplorer from "@/components/forms/FormExplorer";
export default function ExplorePage() {
  return (
    <div>
      <h1>Search for forms</h1>

      <Suspense fallback={<Spinner />}>
        <FormExplorer />
      </Suspense>
    </div>
  );
}
