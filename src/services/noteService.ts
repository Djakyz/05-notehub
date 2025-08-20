import axios from "axios";
import type { Note, NewNote } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

const noteHubAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
});

interface FetchNotesRespose {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string
): Promise<FetchNotesRespose> {
  const { data } = await noteHubAxios.get("/notes", {
    params: { perPage: 12, page, search },
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await noteHubAxios.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await noteHubAxios.delete<Note>(`/notes/${id}`);
  return data;
}
