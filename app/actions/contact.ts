"use server";

import { revalidatePath } from "next/cache";
import { createContact, deleteContact, updateContact } from "../api/contact";
import { ContactFormState, DeleteContactState } from "../_types/actions";
import { ContactType } from "../_types/contact";
import { getSession } from "../_lib/session";

export const createContactAction = async (
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> => {

    if (!formData.get("name")) {
        return { error: "Name is missing" };
    }

    const user = await getSession();
    if (!user) {
      return { error: "User not authenticated" };
  }

    const newContact: ContactType = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        userId: user.id as number,
    };

    try {
        await createContact(newContact);
        revalidatePath("/contact");
        return { success: true}
    } catch (error) {
      console.log("Error creating contact:", error);
    return { error: "Failed to create contact" };
    }
};

export const updateContactAction = async (
  prevState: DeleteContactState,
  formData: FormData
): Promise<ContactFormState> => {
  const idRaw = formData.get("id");
  const id = String(idRaw);  

  console.log("Update ID:", `"${id}"`);

  const user = await getSession();
  
  if (!user) {
    return { error: "User not authenticated" };
  }

  const updatedContact: ContactType = {
    id: id,  // json-server gère string IDs
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id as number,
  };

  try {
    await updateContact(id, updatedContact);  // id string
    revalidatePath("/contact");
    return { success: true }
  } catch (error) {
    console.log("Error updating contact:", error);
    return { error: "Failed to update contact" };
  }
};



export const deleteContactAction = async (
  prevState: DeleteContactState,
  formData: FormData
): Promise<DeleteContactState> => {
  const idRaw = formData.get("id");
  const id = String(idRaw);  // Convertit TOUT en string ("bf61")

  console.log("🗑️ Supprimant ID:", id);

  try {
    await deleteContact(id);
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.log("Error deleting contact:", error);
    return { error: "Failed to delete contact" };
  }
};

