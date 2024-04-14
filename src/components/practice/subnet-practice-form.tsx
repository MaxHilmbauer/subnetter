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

export function SubnetCardForm({ subnets }: { subnets: Subnet[] }) {
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
    shouldUnregister: false,
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

  const onSubmit = (values: z.infer<typeof subnetFormSchema>) => {};

  return (
    <Form {...subnetForm}>
      <form onSubmit={subnetForm.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="mt-6">
            <h3 className="text-lg font-medium">
              {index + 1}
              {nthNumber(index + 1)} Subnet
            </h3>
            <Separator />
            <div className="mt-3 grid max-md:grid-cols-1 grid-cols-5 gap-4 px-2">
              <FormField
                control={subnetForm.control}
                key={field.id}
                name={`subnets.${index}.networkIP`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network IP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subnetForm.control}
                key={field.id}
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
                key={field.id}
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
                key={field.id}
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
                key={field.id}
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
      </form>
    </Form>
  );
}
