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
import ErrorPage from "@/app/explore/error";
import { fileToBase64 } from "@/misc/http";
function FormConstructorInternal() {
  const { state } = useContext(FormConstructorContext);

  const handleFormSubmit = async () => {
    let image = undefined;
    if (state.image) {
      image = (await fileToBase64(state.image)) as string;
    }
    const components = state.components.map((c) => c.component);
    const details = {
      name: state.name,
      key: state.key,
      image,
      description: state.description,
    };
    try {
      submitForm(components, details);
    } catch (e) {
      ErrorPage();
    }
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
