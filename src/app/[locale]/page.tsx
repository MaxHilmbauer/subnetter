import { LayoutCenter } from "@/components/layouts/layout-center";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useTranslations } from "next-intl";

export default function Home() {
  const translation = useTranslations("Practice");

  return (
    <main>
      <LayoutCenter>
        <h1 className="text-3xl font-bold">
          Subnetter
          <div className="flex align-middle">
            <Badge> v1.0.0</Badge>
          </div>
        </h1>
        <div className="grid grid-cols-1 gap-4 justify-center mt-5">
          <Card className="justify-self-center w-3/4">
            <CardHeader>
              <CardTitle className="text-center">Practice</CardTitle>
              <CardDescription>
                {translation("practiceDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button size={"sm"}>
                {translation("practiceButtonNewExercise")}
              </Button>
              <Button size={"sm"}>
                {translation("practiceButtonShowSolution")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </LayoutCenter>
    </main>
  );
}
