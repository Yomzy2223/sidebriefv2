import type { serviceProductType } from "../service/types";

export type productType = {
  id: string;
  email: string | null;
  address: string | null;
  paid: boolean;
  completed: boolean;
  currentState: "START";
  status: "pending";
  createdAt: string;
  updatedAt: string;
  productId: string | null;
  userId: string;
  productQA: productQAType[];
  product: serviceProductType;
};

export type File = {
  name: string;
  description?: string;
  link: string;
  type: string;
};

export type SubFormProfile = {
  question: string;
  answer: string[];
  type: string;
  compulsory: boolean;
};

export type FormItem = {
  question: string;
  answer: string[];
  type: string;
  compulsory: boolean;
  isGeneral: boolean;
  // subForm: boolean;
  // profile: SubFormProfile[];
  file?: File;
};

export type saveProductQAPayload = {
  productId: string;
  form: {
    title: string;
    description: string;
    type: string;
    compulsory: boolean;
    isGeneral: boolean;
    subForm: FormItem[];
  };
};

export type productQAType = {
  compulsory: boolean;
  createdAt: string;
  description: string;
  id: string;
  isDeprecated: boolean;
  isGeneral: boolean;
  requestId: string;
  subForm: SubformQAType[];
  title: string;
  type: string;
  updatedAt: string;
};

export type addServiceToProductPayload = {
  serviceId: string;
  productId: string;
};

export type createProductPayload = {
  userId: string;
  productId: string;
};

export type SubformQAType = {
  answer: string[];
  compulsory: boolean;
  fileLink: string | null;
  fileName: string | null;
  fileType: string | null;
  id: string;
  //   isDeprecated: boolean;
  question: string;
  requestQAId: string;
  type: string;
};
