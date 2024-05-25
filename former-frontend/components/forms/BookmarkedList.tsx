'use client'
import { fetchForm } from "@/misc/actions";
import { useAppContext } from "@/stores/appContext";
import { useEffect, useState } from "react";
import FormList from "./FormList";
import { Form } from "@/misc/types";

export default function BookmarkedList() {
    const [forms, setForms] = useState<Form[]>([]);
    const { bookmarks } = useAppContext();

    useEffect(() => {
        const fetchBookmarkedForms = async () => {
            const fetchedForms: Form[] = [];
            //@ts-ignore
            for (let id of bookmarks) {
                try {
                    const form = await fetchForm(id);
                    if (form instanceof Error) continue;
                    fetchedForms.push(form as Form);
                } catch (error) {
                    console.error('Failed to fetch form', id, error);
                }
            }
            setForms(fetchedForms);
        };

        fetchBookmarkedForms();
    }, [bookmarks]); 

    return <FormList forms={forms} />;
}