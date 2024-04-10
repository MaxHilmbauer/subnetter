import { LayoutCenter } from "@/components/layouts/layout-center";
import SubnetPractice from "@/components/practice/subnet-practice";
import { generateSubnettingExercise } from "@/utils/subnetting/exercise-generator";

export default async function Home() {
  return (
    <main>
      <LayoutCenter>
        <div className="grid grid-cols-1 gap-4 justify-center mt-5">
          <SubnetPractice />
        </div>
      </LayoutCenter>
    </main>
  );
}
