"use client"
import React, { useActionState, useEffect } from "react";
import { ContactType } from "../_types/contact";
import { ContactFormState } from "../_types/actions";
import { useRouter } from "next/navigation";

type ContactFormProps = {
  action: (
    prevState: ContactFormState,
    formData: FormData
  ) => Promise<ContactFormState>;
  contact?: ContactType;
};

const ContactForm = ({ action, contact }: ContactFormProps) => {
    const router = useRouter();
    const [state, formAction] = useActionState(action, null);

    useEffect(() => {
        if (state?.success) {
            router.push("/contact");
        }
}, [state, router]);
  return (
    <form action={formAction} className="space-y-4 w-full max-w-md mx-auto p-4">
      <input type="hidden" name="id" value={contact?.id} />
      <div>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name="name"
          defaultValue={contact?.name || ""}
          placeholder="Enter your name" 
          required 
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 outline-none"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email"
          defaultValue={contact?.email || ""}
          placeholder="Enter your email" 
          required 
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 outline-none"
        />
      </div>

      {state?.error && (
        <p className="text-red-600 text-sm font-medium">
          {state.error}
        </p>
      )}

      <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:bg-blue-800 transition-all duration-200 cursor-pointer"
        >
          Save Contact
      </button>

    </form>
  );
};

export default ContactForm;
