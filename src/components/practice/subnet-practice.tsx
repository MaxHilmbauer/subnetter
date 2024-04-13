import { SubnetCard } from "./subnet-card";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function SubnetPractice() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SubnetCard />
    </NextIntlClientProvider>
  );
}
