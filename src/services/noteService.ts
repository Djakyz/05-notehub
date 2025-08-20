import axios from "axios";
import type { Note } from "../types/note";

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
}

export async function fetchNotes(): Promise<FetchNotesRespose> {
  const { data } = await noteHubAxios.get("/notes");
  return data;
}
