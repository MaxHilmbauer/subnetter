import { SubnetCard } from "./subnet-card";
import { generateSubnettingExercise } from "@/utils/subnetting/subnet-exercise-generator";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function SubnetPractice() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SubnetCard />
    </NextIntlClientProvider>
  );
}
