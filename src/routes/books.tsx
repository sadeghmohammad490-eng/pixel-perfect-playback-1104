import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/site";
import { books, faNum } from "@/lib/books";
import { PageHeader, Container, btnGold } from "@/components/site/Page";

export const Route = createFileRoute("/books")({
  head: () => pageHead("کتابخانه آموزشی", "مطالعه آنلاین کتاب‌های آموزشی آکادمی خطیر تریدر."),
  component: BooksPage,
});

function BooksPage() {
  return (
    <>
      <PageHeader eyebrow="بخش پنج" title="کتابخانه آموزشی آکادمی خطیر تریدر" />
      <Container>
        <div className="grid gap-6">
          {books.map((book) => (
            <Link
              key={book.id}
              to="/books/$bookId"
              params={{ bookId: book.id }}
              aria-label={`مطالعه ${book.title}`}
              className="card-lux grid items-center gap-6 p-5 no-underline sm:p-8 md:grid-cols-[minmax(0,1fr)_16rem]"
            >
              <span className="min-w-0">
                <span className="block min-h-[5.5em] text-2xl font-extrabold leading-snug sm:text-3xl md:min-h-[2.75em]">{book.title}</span>
                {book.description ? <span className="mt-3 block text-sm leading-7 text-muted-foreground">{book.description}</span> : null}
                <span className="mt-3 block text-sm text-muted-foreground">{faNum(book.pages)} صفحه</span>
                {book.category ? <span className="mt-2 block text-sm text-primary">{book.category}</span> : null}
                <span className={`${btnGold} mt-6`}>مطالعه کتاب</span>
              </span>
              <img src={book.cover} alt="" width={1024} height={1024} className="aspect-square w-full rounded-xl bg-white object-contain" />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
