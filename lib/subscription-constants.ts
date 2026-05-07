export const PLANS = {
    FREE: "free",
    PRO: "pro",
} as const;

export type PlanType = (typeof PLANS)[keyof typeof PLANS];

export const PLAN_LIMITS: Record<PlanType, {
    maxBooks: number;
    maxSessionsPerMonth: number;
    maxDurationMinutes: number;
}> = {
    [PLANS.FREE]: {
        maxBooks: 3,
        maxSessionsPerMonth: 20,
        maxDurationMinutes: 15,
    },
    [PLANS.PRO]: {
        maxBooks: Number.MAX_SAFE_INTEGER,
        maxSessionsPerMonth: Number.MAX_SAFE_INTEGER,
        maxDurationMinutes: 60,
    },
};
