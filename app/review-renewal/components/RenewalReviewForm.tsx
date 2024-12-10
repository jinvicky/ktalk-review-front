"use client";

import { useState } from "react";

const RenewalReviewForm = () => {

    const [test, useTest] = useState("test");

//   const { t } = useTranslation();
//   const { handleSubmit, register, errors } = useForm();
//   const onSubmit = (data: any) => {
//     console.log(data);
//   };

  return (
    <div>tes</div>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="form-group">
    //     <label htmlFor="review">{t("review")}</label>
    //     <textarea
    //       className="form-control"
    //       id="review"
    //       name="review"
    //       ref={register({ required: t("required") })}
    //     />
    //     {errors.review && <span>{errors.review.message}</span>}
    //   </div>
    //   <button type="submit" className="btn btn-primary">
    //     {t("submit")}
    //   </button>
    // </form>
  );
};

export default RenewalReviewForm;
