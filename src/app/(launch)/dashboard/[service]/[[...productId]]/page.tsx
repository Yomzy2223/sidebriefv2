"use client";
import React, { useEffect, useState } from "react";
import { Plans } from "./plans";
import { Button, Card } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import { BankIcon, CardIcon, CreditCardIcon } from "@/assets/svg";
import Image from "next/image";
import { ServicesModal } from "@/components/services/ServicesModal";
import { X } from "lucide-react";
import { ProceedPayModal } from "./ProceedPayModal";
import { useGetServiceproduct, useGetServices } from "@/services/service";
import {
	useAddServiceToProduct,
	useGetProduct,
	useCreateNewProduct,
} from "@/services/product";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { CountryInput } from "@/components/input";
import { TCountryCode, countries, getCountryCode } from "countries-list";

// const tabs = [
// 	{ name: "Bank Transfer", href: "#", icon: BankIcon, current: false },
// 	{ name: "Card Payment", href: "#", icon: CardIcon, current: false },
// 	{ name: "Bank USSD", href: "#", icon: CreditCardIcon, current: false },
// ];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}
export default function RegistrationPlan({
	params,
}: {
	params: { productId: string[]; service: string };
}) {
	const getServices = useGetServices();
	const createNewProduct = useCreateNewProduct();
	const services = getServices.data?.data.data;
	const serviceSlug = params.service;
	const router = useRouter();

	const product = useGetProduct(params.productId[0]);

	let serviceId: string | undefined;

	if (!getServices.isLoading) {
		if (!services) {
			redirect("/dashboard");
		}

		const service = services.find(
			(service) => slugify(service.name) === serviceSlug
		);

		if (!service) {
			redirect("/dashboard");
		}

		serviceId = service.id;
	}

	const [openModal, setOpenModal] = useState(false);

	const [openDiv, setOpenDiv] = useState(false);

	const [selectedService, setSelectedService] = useState<string>("");
	const [selectedCountry, setSelectedCountry] = useState<string>("");

	const getServiceProduct = useGetServiceproduct(serviceId);

	const handleRemoveDiv = () => {
		setOpenDiv(false);
	};

	useEffect(() => {
		if (!product.isLoading) {
			const productservice = product.data?.data.data.product;
			setSelectedService(productservice?.name || "");
			setSelectedCountry(productservice?.country || "");
		}
	}, [product.isLoading, product.data?.data.data.product]);

	const handleSubmit = async () => {
		const selectedPlan = serviceProducts?.find(
			(el) => el.name === selectedService
		);

		if (!selectedPlan?.id) {
			console.log("Product does not exist");
			return;
		}

		let productId = params.productId[0];

		if (!productId) {
			const res = await createNewProduct.mutateAsync({
				productId: selectedPlan?.id,
				userId: "5c99014f-4d5f-4771-9c6e-8e56d3afd819",
			});

			productId = res.data.data.id;
		}

		// add country to QA

		router.push(`/dashboard/${params.service}/info/${productId}`);

		// const planId = selectedPlan.id;
		// const productId = params.productId;
		// await addServiceToProduct.mutateAsync({
		// 	productId: productId[0],
		// 	serviceId: planId,
		// });
		// setOpenModal(true);
		// should rote to payment but for now will go to KYC page
	};

	const closeModal = () => {
		setOpenModal(false);
	};
	// const [currentTab, setCurrentTab] = useState(
	// 	tabs.find((tab) => tab.current)
	// );

	const loading =
		getServices.isLoading ||
		getServiceProduct.isLoading ||
		product.isLoading;

	const serviceProducts = getServiceProduct.data?.data.data;

	const filteredServiceProducts = serviceProducts?.filter(
		(product) =>
			product.country.toLowerCase() === selectedCountry.toLowerCase()
	);

	// const handleTabChange = (selectedTab) => {
	// 	setCurrentTab(selectedTab);
	// };

	return (
		<div className="flex flex-col gap-6 md:max-w-[500px] w-full">
			<div className="flex flex-col">
				<h4 className="text-sm leading-normal text-foreground-3 mb-1">
					STEP 1
				</h4>
				<h6 className="text-2xl leading-normal font-semibold">Plan</h6>
			</div>

			<CountryInput
				question="Select a Country"
				value={selectedCountry}
				setValue={(value) => setSelectedCountry(value)}
			/>
			<Plans
				loading={loading}
				serviceProducts={filteredServiceProducts || []}
				selectPlan={(value: string) => setSelectedService(value)}
				selectedPlan={serviceProducts?.find(
					(el) => el.name === selectedService
				)}
			/>

			<Button
				color="secondary"
				size={"lg"}
				className="self-start"
				onClick={handleSubmit}
				disabled={loading || !selectedService}
				isProcessing={createNewProduct.isPending}
			>
				<div className="space-x-2 flex items-center">
					<p>Continue</p>
					<ArrowRight />
				</div>
			</Button>

			{/* <div className='p-5 border'>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<h6 className="text-2xl leading-normal font-semibold text-primary">
							Before you proceed to payment
						</h6>
						<p className='py-4'>See other things you can do alongside side your business registration to save time. It may require additional documents and increase in payment</p>
					</div>
				</div>


				<Button color="secondary" size={"lg"} className="self-start" onClick={() => setOpenModal(true)}>
					<div className="space-x-2 flex items-center">
						<p>Continue</p>
						<ArrowRight />
					</div>
				</Button>

			</div> */}

			{/* <ProceedPayModal open={openModal} close={closeModal}/> */}
			<ServicesModal open={openModal} close={closeModal} />
		</div>
	);
}
