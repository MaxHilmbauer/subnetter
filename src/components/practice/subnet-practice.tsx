import { SubnettingExercise } from "@/types/subnetting";
import { SubnetCard } from "./subnet-card";
import { generateSubnettingExercise } from "@/utils/subnetting/exercise-generator";
import { getTranslations } from "next-intl/server";

export default async function SubnetPractice() {
  const translation = await getTranslations("Practice");
  const subnetCardTranslation = {
    title: translation("practiceTitle"),
    newExerciseButton: translation("practiceButtonNewExercise"),
    showSolutionButton: translation("practiceButtonShowSolution"),
  };

  async function newExercise(): Promise<SubnettingExercise> {
    "use server";
    const exercise = await generateSubnettingExercise();
    console.log(exercise);

    return exercise;
  }

  return (
    <SubnetCard
      newExercise={newExercise}
      translations={subnetCardTranslation}
    />
  );
}
