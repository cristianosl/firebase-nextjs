import { useRemoteConfigRules } from "../useRemoteConfigRules";
import { renderHook } from "@testing-library/react-hooks";

type CaseTest = {
  description: string;
  current: Date;
  nextUpdate: Date;
  lastFetch: Date;
  expectedResult: boolean;
};

describe("forceUpdateRemoteConfig", () => {
  const testCases: CaseTest[] = [
    {
      description:
        "Quando a data atual for inferior ao próximo update, não deve atualizar",
      current: new Date("2022-01-20T19:51:14.169Z"),
      nextUpdate: new Date("2022-01-20T19:52:14.169Z"),
      lastFetch: new Date("2022-01-20T19:10:14.169Z"),
      expectedResult: false,
    },
    {
      description:
        "Quando a data atual for igual ao próximo update, deve atualizar",
      current: new Date("2022-01-20T19:52:14.169Z"),
      nextUpdate: new Date("2022-01-20T19:52:14.169Z"),
      lastFetch: new Date("2022-01-20T19:10:14.169Z"),
      expectedResult: true,
    },
    {
      description:
        "Quando a data atual for superior ao próximo update, deve atualizar",
      current: new Date("2022-01-20T19:52:15.169Z"),
      nextUpdate: new Date("2022-01-20T19:52:14.169Z"),
      lastFetch: new Date("2022-01-20T19:10:14.169Z"),
      expectedResult: true,
    },
    {
      description:
        "Quando estiver com a versão mais recente do cache, não deve atualizar",
      current: new Date("2022-01-20T19:52:15.169Z"),
      nextUpdate: new Date("2022-01-20T19:10:14.169Z"),
      lastFetch: new Date("2022-01-20T19:10:14.169Z"),
      expectedResult: false,
    },
  ];

  const fakeTimer = jest.useFakeTimers("modern");
  testCases.forEach(
    ({ description, current, nextUpdate, lastFetch, expectedResult }) => {
      it(description, () => {
        expect.hasAssertions();
        const {
          result: {
            current: { remoteConfigNeedForceUpdate },
          },
        } = renderHook(() => useRemoteConfigRules());
        fakeTimer.setSystemTime(current);
        const needUpdate = remoteConfigNeedForceUpdate(nextUpdate, lastFetch);
        expect(needUpdate).toBe(expectedResult);
      });
    }
  );
});
