import type { Metadata } from "next";
import "./globals.css";
import { Flowbite } from "@/components/flowbite";
import { customTheme } from "./baseCustomTheme";
import { BrFirma } from "@/font";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Flowbite theme={customTheme}>
				<body className={BrFirma.className}>{children}</body>
			</Flowbite>
		</html>
	);
}
