import Spinner from "@/components/UI/Spinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const BookmarkedList = dynamic(
  () => import("@/components/forms/BookmarkedList"),
  {
    ssr: false,
  }
);
export default function BookmarkPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BookmarkedList />
    </Suspense>
  );
}
