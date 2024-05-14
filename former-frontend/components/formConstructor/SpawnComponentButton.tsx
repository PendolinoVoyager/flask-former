"use client";
import { ComponentType } from "@/misc/types";
import { ButtonHTMLAttributes } from "react";
import classes from "./FormConstructor.module.css";
interface ISpawnComponentButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  componentType: ComponentType;
}

export default function SpawnComponentButton({
  componentType,
  children,
  ...props
}: ISpawnComponentButtonProps) {
  return (
    <button className={classes.spawnComponentButton} {...props}>
      {children}
    </button>
  );
}
