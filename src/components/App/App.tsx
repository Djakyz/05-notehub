import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteForm from "../NoteForm/NoteForm";

const App = () => {
  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });
  console.log(data?.notes);
  return (
    <div>
      <NoteForm />
    </div>
  );
};

export default App;
