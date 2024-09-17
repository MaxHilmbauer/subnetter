"use client";

import { Subnet } from "@/types/subnetting";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { nthNumber } from "@/utils/numbers/ordinal-numbers";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export function SubnetForm({
  subnets,
  loadNewExercise,
  showSolution,
}: {
  subnets: Subnet[];
  loadNewExercise: () => void;
  showSolution: () => void;
}) {
  const t = useTranslations("Practice");

  const subnetFormSchema = z.object({
    subnets: z.array(
      z.object({
        networkIP: z
          .string()
          .regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/),
        mask: z.string().regex(/^\/[1-3]?[0-9]$/),
        firstHostIP: z
          .string()
          .regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/),
        lastHostIP: z
          .string()
          .regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/),
        broadcastIP: z
          .string()
          .regex(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/),
      })
    ),
  });

  const subnetForm = useForm<z.infer<typeof subnetFormSchema>>({
    resolver: zodResolver(subnetFormSchema),
    defaultValues: {
      subnets: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "subnets",
    control: subnetForm.control,
    keyName: "subnetId",
  });

  useEffect(() => {
    remove();
    if (subnets?.length > 4) {
      for (let i = 0; i < 4; i++) {
        append({
          networkIP: "",
          mask: "",
          firstHostIP: "",
          lastHostIP: "",
          broadcastIP: "",
        });
      }
    } else {
      for (let i = 0; i < subnets?.length; i++) {
        append({
          networkIP: "",
          mask: "",
          firstHostIP: "",
          lastHostIP: "",
          broadcastIP: "",
        });
      }
    }
  }, [subnets, append, remove]);

  const onSubmit = (values: z.infer<typeof subnetFormSchema>) => {
    console.log(values);
    console.log(subnets);

    const subnetCount = subnets.length;
    const fillableSubnets = subnetCount > 4 ? 4 : subnetCount;
    const filledSubnets = values.subnets;
    var correct = true;

    for (let i = 0; i < fillableSubnets; i++) {
      const rightSubnet = i > 2 ? subnets.length - 2 : i;
      if (
        filledSubnets[i].networkIP !== subnets[rightSubnet].networkIP.address ||
        filledSubnets[i].mask !== "/" + subnets[rightSubnet].mask.cidr ||
        filledSubnets[i].firstHostIP !==
          subnets[rightSubnet].firstHostIP.address ||
        filledSubnets[i].lastHostIP !==
          subnets[rightSubnet].lastHostIP.address ||
        filledSubnets[i].broadcastIP !==
          subnets[rightSubnet].broadcastIP.address
      ) {
        correct = false;
      }
    }

    alert(correct ? "All correct" : "Some wrong");
  };

  return (
    <Form {...subnetForm}>
      <form onSubmit={subnetForm.handleSubmit(onSubmit)}>
        <div>
          {fields.map((field, index) => (
            <div key={field.subnetId} className="mt-6">
              <h3 className="text-lg font-medium">
                {index + 1}
                {nthNumber(index + 1)} Subnet
              </h3>
              <Separator />
              <div className="mt-3 grid max-md:grid-cols-1 grid-cols-5 gap-4 px-2">
                <FormField
                  control={subnetForm.control}
                  name={`subnets.${index}.networkIP`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network IP</FormLabel>
                      <FormControl>
                        <Input size={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={subnetForm.control}
                  name={`subnets.${index}.mask`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subnet Mask </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={subnetForm.control}
                  name={`subnets.${index}.firstHostIP`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Host</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={subnetForm.control}
                  name={`subnets.${index}.lastHostIP`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Host</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={subnetForm.control}
                  name={`subnets.${index}.broadcastIP`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broadcast IP</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button type="button" onClick={loadNewExercise}>
            {t("newExerciseBtn")}
          </Button>
          <Button type="submit">{t("completionBtn")}</Button>
        </div>
      </form>
    </Form>
  );
}
