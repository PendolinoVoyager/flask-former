"use client";
import React, { useContext } from "react";
import { notFound } from "next/navigation";
import { submitForm } from "@/misc/actions";
import Spinner from "../UI/Spinner";
import {
  FormConstructorContext,
  FormConstructorProvider,
  Step,
} from "@/stores/formConstructorContext";
import FormConstructorBase from "./FormConstructorBase";
import FormConstructorFinish from "./FormConstructorFinish";
import classes from "./FormConstructor.module.css";
function FormConstructorInternal() {
  const { state } = useContext(FormConstructorContext);

  const handleFormSubmit = async () => {
    //TODO: Image files go where?
    const components = state.components.map((c) => c.component);
    const details = {
      name: state.name,
      key: state.key,
      image: state.image,
      description: state.description,
    };

    submitForm(components, details);
  };

  switch (state.step) {
    case Step.components:
      return <FormConstructorBase />;
    case Step.details:
      return <FormConstructorFinish />;
    case Step.submitting:
      handleFormSubmit(); // Start the submission process here
      return (
        <div className={classes.page}>
          <h1>Your form is being created...</h1>
          <Spinner className="center" />
        </div>
      );
    default:
      notFound();
  }
}

export default function FormConstructor() {
  return (
    <FormConstructorProvider>
      <FormConstructorInternal />
    </FormConstructorProvider>
  );
}
