import MainNav from "@/components/nav/MainNav";

export default function Home() {
  return (
    <>
      <header>
        <MainNav />
      </header>
      <h1>TODO</h1>
      <ul>
        <li>Main page: home</li>
        <li>Browse forms + search / filter</li>
        <li>Form view</li>
        <li>Form answer</li>
        <li>Bookmarks</li>
        <li>Create form</li>
        <li>View analytics</li>
      </ul>
    </>
  );
}
