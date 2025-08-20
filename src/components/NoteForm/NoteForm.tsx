import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  closeModal: () => void;
}

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must have min 3 characters")
    .max(50, "Title must have max 50 characters")
    .required("Required"),
  content: Yup.string().max(500, "Description must have max 500 characters"),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
    .required("Required"),
});
export default function NoteForm({ closeModal }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
  });
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={{ title: "", content: "", tag: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.formGroup}>
          Title
          <Field className={css.input} name="title" type="text" />
          <ErrorMessage className={css.error} name="title" component="span" />
        </label>
        <label className={css.formGroup}>
          Content
          <Field className={css.textarea} name="content" type="text" rows={8} />
          <ErrorMessage className={css.error} name="content" component="span" />
        </label>
        <label className={css.formGroup}>
          Tag
          <Field className={css.input} as="select" name="tag" type="text">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            <option value="Todo">Todo</option>
          </Field>
          <ErrorMessage className={css.error} name="tag" component="span" />
        </label>
        <button type="button" className={css.cancelButton} onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </Form>
    </Formik>
  );
}
