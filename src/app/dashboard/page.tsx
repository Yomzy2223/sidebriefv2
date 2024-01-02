import { Badge, Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";
import {Rocket } from "@/assets/images"
import Image, { StaticImageData } from "next/image";
import Activity from "@/components/activiity";
import DateBar from "@/components/business/business";
import { Download, DetailIcon, CalcIcon, Settings } from "@/assets/svg";
import { imageTypeImage } from "@/lib/utils";

interface File {
	id?: string;
	name: string;
	type: string;
}

interface FeatureProps {
	name: string;
	description: string;
	icon: StaticImageData;
}

interface BadgeProps {
	size?: 'sm' | 'lg'; 
	status: 'Pending' | 'Ongoing' | 'Completed' | 'Submitted'; 
  }
const files: File[] = [
	{
	  id: "1",
	  name: "Statement of account",
	  type: "application/pdf",
	},

	{
	  id: "2",
	  name: "National ID Card",
	  type: "image/png",
	},

	{
	  id: "3",
	  name: "Passport photograph",
	  type: "image/jpeg",
	},

	{
		id: "4",
		name: "Proof of Address",
		type: "image/png",
	},
]

const ApplicationBadge: React.FC<BadgeProps> = ({ size = 'sm', status  }) => {
	let badgeColor = '';
  
	switch (status) {
	  case 'Pending':
		badgeColor = 'red';
		break;
	  case 'Ongoing':
		badgeColor = 'yellow';
		break;
	  case 'Completed':
		badgeColor = 'pink';
		break;
	  case 'Submitted':
		badgeColor = 'green';
		break;
	  default:
		badgeColor = 'gray';
	}
  

	return (
		<span className={`inline-block px-2 py-1 text-xs font-semibold text-${badgeColor}-800 bg-${badgeColor}-400 rounded ${size === 'sm' ? 'text-sm' : 'text-xs'}`}>
		{status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}
		</span>
	);
  };
  
const features: FeatureProps[] = [
	{
	  name: 'Register my business',
	  description:
		'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Rocket,
	},
	{
	  name: 'Manage my business',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Settings,
	},
	{
	  name: 'Manage my business',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Settings,
	},
	{
	  name: 'Diligence',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: CalcIcon,
	},
	{
	  name: 'Register my business',
	  description:
	  'Now continue the process of registering your business without the need for any physical paperwork.',
	  icon: Rocket,
	},
]
const renderFile = (file: File) => {
	const fileType = imageTypeImage.find((type) => type.type === file.type);
  
	if (fileType) {
	  return (
		
		<span className="flex items-center justify-between" key={file.id}>
			<Image src={fileType.image} alt={file.name} className="mr-2 w-6 h-6" />
			<span className="flex items-center flex-grow ">
				<span className="underline mr-16">
				{file.name}
				</span>
				<p className="text-primary ml-auto">
				<Image src={Download} alt="Download" />
				</p>
			</span>
		</span>
	  );
	}
  
	return null; 
};

export default function Dashboard() {
	return (
		<div className="p-8 relative">
			<div className="flex flex-row">
				<div className="px-4 sm:px-0">
					
					<div className="flex items-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							Contifery agricultural limited
						</h1>
						<span className="ml-2">
							<ApplicationBadge size="lg" status="Submitted" />
						</span>
					</div>
						
					<p className="mt-2 text-sm text-gray-500">
						Now continue the process of registering your business without the need for any physical paperwork.
					</p>
				</div>


				<Button color="magenta" size={"lg"} className="mr-7 self-start mt-8 absolute top-0 right-0">
					<div className="space-x-2 flex items-center">
						<p>Resume</p>
						<ArrowRight />
					</div>
				</Button>
			</div>

			<div className="flex mt-4">
				<div className="flex-1 md:w-1/2  py-4">	
					<div className="w-28">
						<Badge size="sm" color="yellow">
							My Business
						</Badge>
					</div>
					
					<h2 className="text-lg font-bold mb-2">Ayomide Constructions</h2>
					<div className="flex items-center justify-between">
						<p>Manage all your business registrations in one place</p>
						<div className="flex items-center">
							<h4 className="text-primary mr-2">See details</h4>
							<span>
								<Image src={DetailIcon} alt=""/>
							</span>
						</div>

					</div>
					
					
					<div className="flex justify-between items-start">
						<DateBar/>

						<div className="mt-12">
							<div className="space-y-6">
								{files.map((file) => (
									<h3 className="text-lg leading-normal font-semibold border rounded-4xl p-3" key={file.id}>
									{renderFile(file)}
									</h3>
								))}
							</div>
						</div>	
					</div>
				</div>

				<div className="flex-1 md:w-1/2  p-4">
					<h2 className="text-lg font-bold mb-2">My Activities</h2>
					<Activity/>
				</div>
			</div>	

			<div className="max-w-12xl">
				<ul role="list"
					className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
					>
						{features.map((feature) => (
							<li key={feature.name} className="rounded-2xl border border-gray-200 p-8">
							
							<div className="flex items-center justify-between">
								<Image src={feature.icon} alt="" className="h-8 w-8"/>
								<h4 className="text-primary">See process details</h4>
							</div>
							
							<h3 className="mt-6 font-semibold text-gray-900">
								{feature.name}
							</h3>
							<p className="mt-2 text-gray-700">{feature.description}</p>
							</li>
						))}
				</ul>
			</div>
			

		</div>

	);
}
