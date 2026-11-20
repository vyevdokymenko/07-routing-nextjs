import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";

const NOTES_QUERY_KEY = "notes";

async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [NOTES_QUERY_KEY, "", 1],
    queryFn: () => fetchNotes({ searchText: "", page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default Notes;
