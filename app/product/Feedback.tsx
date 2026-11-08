'use client';

import { useEffect, useState } from 'react';

type Choice = 'yes' | 'partial' | 'no';

const KEY = 'first-proof-week13-feedback-v1';

const choices: { value: Choice; label: string }[] = [
  { value: 'yes', label: 'Yes, clearly' },
  { value: 'partial', label: 'Partially' },
  { value: 'no', label: 'No, I was confused' }
];

function valid(value: unknown): value is Choice {
  return value === 'yes' || value === 'partial' || value === 'no';
}

export default function Feedback() {
  const [answer, setAnswer] = useState<Choice | ''>('');
  const [responses, setResponses] = useState<Choice[]>([]);
  const [notice, setNotice] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(
        window.localStorage.getItem(KEY) || '[]'
      );
      if (Array.isArray(parsed)) {
        setResponses(parsed.filter(valid).slice(-100));
      }
    } catch {
      setNotice('Local feedback could not be loaded.');
    }
    setReady(true);
  }, []);

  function submit() {
    if (!answer || !ready) return;

    try {
      const next = [...responses, answer].slice(-100);
      window.localStorage.setItem(KEY, JSON.stringify(next));
      setResponses(next);
      setAnswer('');
      setNotice('Feedback saved in this browser only.');
    } catch {
      setNotice('Feedback could not be saved.');
    }
  }

  function clear() {
    try {
      window.localStorage.removeItem(KEY);
      setResponses([]);
      setNotice('Local feedback cleared.');
    } catch {
      setNotice('Local feedback could not be cleared.');
    }
  }

  return (
    <section className="panel space-y-4">
      <h2 className="text-xl font-bold">
        4. Quick feedback
      </h2>

      <p className="copy">
        Did you understand what your evidence result means?
      </p>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">
          Choose one answer
        </legend>

        {choices.map(choice => (
          <label key={choice.value} className="flex gap-2">
            <input
              type="radio"
              name="feedback"
              value={choice.value}
              checked={answer === choice.value}
              onChange={() => setAnswer(choice.value)}
            />
            {choice.label}
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        className="btn"
        disabled={!answer || !ready}
        onClick={submit}
      >
        Save feedback locally
      </button>

      {notice && <p role="status">{notice}</p>}

      <p className="copy">
        No names or assessment content are collected.
        Responses stay in this browser and are not sent
        to FIRST-PROOF or Supabase.
      </p>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <h3 className="font-semibold">
          Local feedback summary
        </h3>

        {choices.map(choice => (
          <p key={choice.value} className="text-sm">
            {choice.label}: {
              responses.filter(r => r === choice.value).length
            }
          </p>
        ))}

        <p className="text-sm">
          Total responses: {responses.length}
        </p>

        <button
          type="button"
          onClick={clear}
          className="text-sm underline"
          disabled={!ready || responses.length === 0}
        >
          Clear local feedback
        </button>
      </div>
    </section>
  );
}
