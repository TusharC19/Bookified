import {currentUser} from "@clerk/nextjs/server";
import {PLANS, type PlanType} from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
    const user = await currentUser();
    const plan = user?.publicMetadata?.plan;

    return plan === PLANS.PRO ? PLANS.PRO : PLANS.FREE;
};
