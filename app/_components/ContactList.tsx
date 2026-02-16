import React from 'react'
import { ContactType } from '../_types/contact'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'
import DeleteButton from './DeleteButton' 
import { deleteContactAction } from '../actions/contact'
import { DeleteContactState } from "../_types/actions";


const ContactList = ({ contacts }: { contacts: ContactType[]}) => {
  return (
    <div className="space-y-4">
    {contacts.map((contact) => (
        <div key={contact.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex justify-between items-center">
              <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold truncate">{contact.name}</h2>
                  <p className="text-gray-600 truncate">{contact.email}</p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                  {/* Bouton Edit */}
                  <Link 
                    href={`/contact/edit/${contact.id}`} 
                    className="flex items-center justify-center text-blue-600 p-2 md:px-3 md:py-1 border border-blue-300 rounded-md hover:border-blue-400 hover:bg-blue-100 transition-colors"
                    title="Edit"
                  >
                      <FiEdit className='text-lg' />
                      <span className="hidden md:inline ml-2">Edit</span>
                  </Link>

                  {/* Le bouton Delete (assure-toi que l'icône est gérée de la même façon dans DeleteButton) */}
                  <DeleteButton action={deleteContactAction} contact={contact}/>
              </div>
          </div>
        </div>
    ))}
    </div>
  )
}

export default ContactList