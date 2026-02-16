"use client";

import React, { useActionState } from "react";
import { ContactType } from "../_types/contact";
import { FiTrash2 } from "react-icons/fi";

type DeleteContactState = {
  success?: boolean;
  error?: string;
} | null;

type DeleteButtonProps = {
  action: (
    prevState: DeleteContactState,
    formData: FormData
  ) => Promise<DeleteContactState>;
  contact?: ContactType;
};

const DeleteButton = ({ action, contact }: DeleteButtonProps) => {
  const [state, formAction] = useActionState<DeleteContactState, FormData>(
    action,
    null
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={contact?.id} />

      <button
        type="submit"
        className="flex items-center justify-center text-red-600 p-2 md:px-3 md:py-1 border border-red-200 rounded-md hover:border-red-400 hover:bg-red-50 cursor-pointer transition-colors flex items-center text-blue-600 gap-2 px-3 py-1 border border-blue-300 rounded-md hover:border-blue-400 hover:bg-blue-100 cursor-pointer"
        onClick={(e) => {
          if (!confirm("Are you sure to delete this contact?")) {
            e.preventDefault();
          }
        }}
      >
        <FiTrash2 className="text-red-500 text-lg" /> 
        <span className="hidden md:inline ml-1">Delete</span>
      </button>

      {state?.error && (
        <p className="text-red-500 text-sm mt-1">{state.error}</p>
      )}
    </form>
  );
};

export default DeleteButton;
