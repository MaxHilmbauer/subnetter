"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubnettingExercise } from "@/types/subnetting";
import { generateSubnettingExercise } from "@/utils/subnetting/subnet-exercise-generator";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function SubnetCard() {
  const t = useTranslations("Practice");
  const [exercise, setExercise] = useState<SubnettingExercise>(
    {} as SubnettingExercise
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNewExercise();
  }, []);

  const loadNewExercise = () => {
    const exercise = generateSubnettingExercise();
    console.log(exercise.hostCount);
    setExercise(exercise);
  };

  const ExerciseButton = loading ? (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </Button>
  ) : (
    <Button size={"sm"} onClick={() => loadNewExercise()}>
      {t("newExerciseBtn")}
    </Button>
  );

  return (
    <Card className="justify-self-center w-3/4">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-center">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {t("description", {
          networkIP: exercise.subnet?.networkIP.address,
          cidr: exercise.subnet?.mask.cidr,
          hosts: exercise.hostCount,
        })}
      </CardContent>
      <CardFooter className="flex justify-end">{ExerciseButton}</CardFooter>
    </Card>
  );
}
