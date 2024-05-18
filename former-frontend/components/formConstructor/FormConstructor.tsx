"use client";
import {
  ComponentMode,
  ComponentType,
  createFormComponent,
} from "@/misc/types";
import React, { useContext } from "react";
import ComponentFactory from "../formComponents/ComponentFactory";
import classes from "./FormConstructor.module.css";
import { DndContext } from "@dnd-kit/core";
import {
  DispatchActions,
  FormConstructorContext,
  FormConstructorProvider,
  Step,
} from "@/stores/formConstructorContext";
import FormConstructorHeader from "./FormConstructorHeader";
import FormConstructorBase from "./FormConstructorBase";
import FormConstructorFinish from "./FormConstructorFinish";
import Spinner from "../UI/Spinner";
import { notFound, redirect } from "next/navigation";
export default function FormConstructor() {
  return (
    <FormConstructorProvider>
      <FormConstructorInternal />
    </FormConstructorProvider>
  );
}
function FormConstructorInternal() {
  const {
    state: { step },
  } = useContext(FormConstructorContext);

  switch (step) {
    case Step.components:
      return <FormConstructorBase />;
    case Step.details:
      return <FormConstructorFinish />;
    case Step.submitting:
      return (
        <>
          <h1>Your form is being created...</h1>
          <Spinner className="center" />
        </>
      );
    default:
      notFound();
  }
}
