import { Suspense } from "react";
import Spinner from "@/components/UI/Spinner";
import FormExplorer from "@/components/forms/FormExplorer";
export default function ExplorePage() {
  return (
    <div>
      <h1>Explore</h1>
      <p>Explore the world of former</p>
      <hr />
      <Suspense fallback={<Spinner />}>
        <FormExplorer />
      </Suspense>
    </div>
  );
}
