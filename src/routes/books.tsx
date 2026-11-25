import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/site";
import banner from "@/assets/library-banner.png";
import readButton from "@/assets/read-online-button.png";
import { books, faNum } from "@/lib/books";
import { Container } from "@/components/site/Page";

export const Route = createFileRoute("/books")({
  head: () => pageHead("کتابخانه آموزشی", "مطالعه آنلاین کتاب‌های آموزشی آکادمی خطیر تریدر."),
  component: BooksPage,
});

function BooksPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <h1 className="mx-auto flex max-w-7xl justify-center px-4 py-6 sm:py-10">
          <img src={banner} alt="کتابخانه تخصصی خطیر تریدر" width={2172} height={724} className="h-auto w-full max-w-5xl" />
        </h1>
      </section>
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Link
              key={book.id}
              to="/books/$bookId"
              params={{ bookId: book.id }}
              aria-label={`مطالعه ${book.title}`}
              className="card-lux flex h-full min-w-0 flex-col p-4 text-center no-underline"
            >
              <img src={book.cover} alt="" width={1024} height={1024} className="aspect-[4/3] w-full rounded-xl bg-white object-contain" />
              <div className="mt-4 flex flex-1 flex-col rounded-2xl border border-primary/40 px-3 pb-3 pt-4">
                <span className="text-lg font-bold leading-8">{book.title}</span>
                <span className="mt-1 text-sm text-muted-foreground">{faNum(book.pages)} صفحه</span>
                <img src={readButton} alt="مطالعه آنلاین" width={1995} height={530} className="mt-auto h-auto w-full object-contain pt-4" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
