import React, { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import classes from "./FormConstructor.module.css";
import {
  FormConstructorContext,
  DispatchActions,
} from "@/stores/formConstructorContext";
import FileSelector from "../UI/FileSelector";
import SquareButton from "../UI/SquareButton";

const FormConstructorFinish = () => {
  const { state, dispatch } = useContext(FormConstructorContext);
  const { name, image, description, key } = state;
  const uploadedFile = useRef<File | undefined>();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      description,
      key,
      image,
    },
  });

  const onSubmit = (data: any) => {
    data = { ...data, image: uploadedFile.current };
    dispatch({
      type: DispatchActions.SAVE_DETAILS,
      payload: data,
    });
    dispatch({ type: DispatchActions.PROCEED });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.page}>
      <h2>Almost done!</h2>
      <p>
        Please finish with giving your form a name, description and a (optional)
        photo.
      </p>
      <input
        {...register("name", { required: true })}
        placeholder={errors.name ? "Form name required!" : "Your form name"}
        className={`${classes.input} ${errors.name ? "errorBorder" : ""}`}
      />
      <textarea
        {...register("description")}
        cols={5}
        maxLength={255}
        className={classes.textArea}
        placeholder="Your description"
      />

      <FileSelector
        className={classes.submitBtn}
        onFileSelect={(files) =>
          (uploadedFile.current = files ? files[0] : undefined)
        }
      >
        Select your image
      </FileSelector>

      <h2>Your form key</h2>
      <p>
        You can use your own form key to edit, look up answers or delete it
        later.
        <br />
        <strong>
          If you don&apos;t provide one, everyone will be able to see answers to
          it.
        </strong>
      </p>
      <input
        {...register("key")}
        type="password"
        placeholder="Your unique key"
        className={classes.input}
      />
      <div className="center">
        <SquareButton
          type="button"
          className={classes.submitBtn}
          onClick={() => dispatch({ type: DispatchActions.BACK })}
        >
          Return
        </SquareButton>
        <SquareButton type="submit" className={classes.submitBtn}>
          Continue
        </SquareButton>
      </div>
    </form>
  );
};

export default FormConstructorFinish;
