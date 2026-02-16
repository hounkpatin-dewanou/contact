import ContactForm from "@/app/_components/ContactForm";
import { updateContactAction } from "@/app/actions/contact";
import { getContactsById } from "@/app/api/contact";
import React, { use } from "react";

const EditContactPage = ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } =  use(params);
    const contact = use(getContactsById(id));
    
    console.log("The contact to edit is : ", contact);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Edit Contact</h1>
            <ContactForm action={updateContactAction} contact={contact} />
        </div>
    );
};

export default EditContactPage;