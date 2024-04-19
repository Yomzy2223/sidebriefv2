"use client";

import { RequestForm } from "@/components/form/requestForm.tsx";
import React from "react";
import { useActions } from "./actions";
import { ProductTabs } from "./tabs";

const Info = () => {
  const { serviceForms, formInfo } = useActions({});

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full">
      <h4 className="text-sm leading-normal text-foreground-3 mb-1">STEP 2</h4>
      {serviceForms.length > 1 ? (
        <ProductTabs formInfo={serviceForms} />
      ) : (
        <div className="space-y-5 w-full">
          <div className="flex flex-col">
            <h6 className="text-2xl leading-normal font-semibold">{serviceForms[0]?.title}</h6>
            <p className="font-medium leading-normal text-primary">
              {serviceForms[0]?.description}
            </p>
          </div>
          <RequestForm info={serviceForms[0]?.subForm} isLoading={false} isSubmitting={false} />
          <>form</>
        </div>
      )}
    </div>
  );
};

export default Info;
