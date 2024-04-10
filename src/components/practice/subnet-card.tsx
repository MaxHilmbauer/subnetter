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
import { useState } from "react";

interface SubnetCardProps {
  newExercise: () => Promise<SubnettingExercise>;
  translations: {
    title: string;
    newExerciseButton: string;
    showSolutionButton: string;
  };
}

export function SubnetCard(props: SubnetCardProps) {
  const [exercise, setExercise] = useState<SubnettingExercise | null>(null);

  const handleTest = async () => {
    setExercise(await props.newExercise());
  };

  return (
    <Card className="justify-self-center w-3/4">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-center">
          {props.translations.title}
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button size={"sm"} onClick={() => handleTest()}>
          {props.translations.newExerciseButton}
        </Button>
        <Button size={"sm"}> {props.translations.showSolutionButton}</Button>
      </CardFooter>
    </Card>
  );
}
