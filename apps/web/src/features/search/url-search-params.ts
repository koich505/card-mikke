import type { PrototypeRawSearchParams } from "@/features/card-detail/prototype-scenario";

type SearchParamsReader = {
  forEach(callback: (value: string, key: string) => void): void;
};

export function toPrototypeRawSearchParams(
  searchParams: SearchParamsReader,
): PrototypeRawSearchParams {
  const result: PrototypeRawSearchParams = {};

  searchParams.forEach((value, key) => {
    const current = result[key];
    if (current === undefined) {
      result[key] = value;
      return;
    }
    result[key] = Array.isArray(current) ? [...current, value] : [current, value];
  });

  return result;
}
