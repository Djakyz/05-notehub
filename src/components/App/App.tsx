import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 3000);

  const filteredNotes = data?.notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onChange={handleSearch}
          onEnter={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <button onClick={handleOpenModal} type="button" className={css.button}>
          Create note +
        </button>
      </header>

      {isSuccess && filteredNotes && filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        !isLoading && <p>Notes not found</p>
      )}
      {isLoading && !data && <Loader />}
      {isError && <ErrorMessage />}
      {modalIsOpen && (
        <Modal closeModal={handleCloseModal}>
          <NoteForm closeModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
