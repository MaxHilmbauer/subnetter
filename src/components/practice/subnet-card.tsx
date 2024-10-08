"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubnettingExercise } from "@/types/subnetting";
import { generateSubnettingExercise } from "@/utils/subnetting/subnet-exercise-service";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SubnetForm } from "./subnet-form";

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
        <SubnetForm
          subnets={exercise.subnets}
          loadNewExercise={loadNewExercise}
          showSolution={() => {}}
        />
      </CardContent>
    </Card>
  );
}
