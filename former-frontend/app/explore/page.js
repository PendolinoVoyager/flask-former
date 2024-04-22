import AllForms from "@/components/forms/AllForms";
import { Suspense } from "react";
import Spinner from "@/components/UI/Spinner";
export default function ExplorePage() {
  return (
    <div>
      <h1>Explore</h1>
      <p>Explore the world of former</p>
      <hr />
      <Suspense fallback={<Spinner />}>
        <AllForms />
      </Suspense>
    </div>
  );
}
