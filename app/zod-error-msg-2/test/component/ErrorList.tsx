"use client";
import { ZodError, z } from "zod";

const ErrorList: React.FC<{ errors: z.ZodIssue[] }> = ({ errors }) => {
  return (
    <div>
      {errors.map((error, index) => (
        <div key={index}>{error.message}</div>
      ))}
    </div>
  );
};

export default ErrorList;
