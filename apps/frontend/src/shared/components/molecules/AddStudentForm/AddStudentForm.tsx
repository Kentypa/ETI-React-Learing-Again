import {
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
  type SubmitEventHandler,
} from "react";
import type { StudentData } from "../../../../mock/students-data";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

type Props = { onAdd: (student: StudentData) => void };

const INITIAL_STATE = { name: "", score: "" };

export const AddStudentForm: FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(
    () => ({
      name: form.name.trim().length < 2 ? "Min 2 symbols" : null,
      score:
        Number(form.score) < 0 || Number(form.score) > 100 || !form.score
          ? "0-100 required"
          : null,
    }),
    [form],
  );

  const isValid = !errors.name && !errors.score;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      score: Number(form.score),
    });
    setForm(INITIAL_STATE);
    setTouched(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      className="flex flex-col gap-4 bg-neutral-100 p-6 rounded-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Student Name"
        />
        {touched && errors.name && (
          <span className="text-xs text-red-500">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          name="score"
          type="number"
          value={form.score}
          onChange={handleChange}
          placeholder="Score (0-100)"
        />
        {touched && errors.score && (
          <span className="text-xs text-red-500">{errors.score}</span>
        )}
      </div>

      <Button
        type="submit"
        disabled={touched && !isValid}
        className="hover:cursor-not-allowed bg-blue-500 disabled:opacity-50"
        variant="primary"
      >
        Add
      </Button>
    </form>
  );
};
