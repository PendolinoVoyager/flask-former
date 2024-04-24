import FormLoader from "@/components/forms/AllForms";
import { Suspense } from "react";
import Spinner from "@/components/UI/Spinner";
import { revalidatePath } from "next/cache";
export default function ExplorePage() {
  return (
    <div>
      <h1>Explore</h1>
      <p>Explore the world of former</p>
      <hr />
      <Suspense fallback={<Spinner />}>
        <FormLoader />
      </Suspense>
    </div>
  );
}
