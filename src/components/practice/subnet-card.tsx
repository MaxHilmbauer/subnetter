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
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function SubnetCard() {
  const t = useTranslations("Practice");
  const [exercise, setExercise] = useState<SubnettingExercise>(
    {} as SubnettingExercise
  );

  useEffect(() => {
    setExercise(generateSubnettingExercise());
  }, []);

  const loadNewExercise = () => {
    setExercise(generateSubnettingExercise());
  };

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
      <CardFooter className="flex justify-between">
        <Button size={"sm"} onClick={() => loadNewExercise()}>
          {t("newExerciseBtn")}
        </Button>
        <Button size={"sm"}> {t("showSolutionBtn")} </Button>
      </CardFooter>
    </Card>
  );
}
