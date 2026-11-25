import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/site";
import { getBook } from "@/lib/books";
import { Container } from "@/components/site/Page";
import { BookReader } from "@/components/site/BookReader";

export const Route = createFileRoute("/books_/$bookId")({
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    if (!book) throw notFound();
    return book;
  },
  head: ({ loaderData }) => pageHead(loaderData?.title ?? "کتاب", "مطالعه آنلاین کتاب آموزشی."),
  component: BookPage,
});

function BookPage() {
  const book = Route.useLoaderData();

  return (
    <Container>
      <BookReader bookId={book.id} />
    </Container>
  );
}
