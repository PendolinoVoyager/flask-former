"use client";
import { useForm, useFormState } from "react-hook-form";
import { ComponentType, Form, isArrayField } from "@/misc/types";
import FormComponentFactory from "../formComponents/FormComponentFactory";
import React, { useState } from "react";
import SquareButton from "../UI/SquareButton";
import { answerForm } from "@/misc/actions";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useConfirmationModal } from "@/misc/hooks";
import { redirect } from "next/navigation";
import { AvailablePaths, constructPath } from "@/app/paths";
import Spinner from "../UI/Spinner";
import { cleanData } from "@/misc/http";

export default function FormAnswerable({ form }: { form: Form }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      ...form.components.reduce((obj, c) => {
        //@ts-ignore
        obj[c.label] = c.default_value ?? "";
        return obj;
      }, {}),
    },
  });

  const { isOpen, openModal, onConfirm, closeModal, message } =
    useConfirmationModal("Do you want to submit these answers?");
  const onSubmit = (data: any) => {
    openModal("Do you want to submit these answers?", () => {
      const answers = Object.values(data);
      answers.forEach((a, i) => {
        //poor design choices biting back
        if (isArrayField(form.components[i].type) && !Array.isArray(a)) {
          answers[i] = [];
        }
        //@ts-ignore
        if (form.components[i].type === ComponentType.Number) answers[i] = +answers[i] 
      });
      setIsSubmitting(true);

      answerForm(form.id, answers);
    });
  };
  if (isSubmitting) return <Spinner />;
  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={closeModal}
        message={message}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {form.components.map((c, i) => (
          <FormComponentFactory
            key={c.label}
            component={c}
            register={register}
            errors={errors}
          />
        ))}
        <SquareButton>Submit answers</SquareButton>
      </form>
    </>
  );
}
