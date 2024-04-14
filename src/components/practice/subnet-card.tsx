"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubnettingExercise } from "@/types/subnetting";
import { generateSubnettingExercise } from "@/utils/subnetting/subnet-exercise-generator";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SubnetCardForm } from "./subnet-practice-form";

export function SubnetCard() {
  const t = useTranslations("Practice");
  const [exercise, setExercise] = useState<SubnettingExercise>(
    {} as SubnettingExercise
  );

  useEffect(() => {
    loadNewExercise();
  }, []);

  const loadNewExercise = () => {
    const exercise = generateSubnettingExercise();
    console.log(exercise.hostCount);
    setExercise(exercise);
  };

  return (
    <Card className="justify-self-center max-md:w-11/12">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-center">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-center">
        {t("description", {
          networkIP: exercise.subnet?.networkIP.address,
          cidr: exercise.subnet?.mask.cidr,
          hosts: exercise.hostCount,
        })}
      </CardDescription>
      <CardContent>
        <SubnetCardForm subnets={exercise.subnets} />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size={"sm"} onClick={() => loadNewExercise()}>
          {t("newExerciseBtn")}
        </Button>
      </CardFooter>
    </Card>
  );
}
