import { screen, renderHook } from "@testing-library/react";
import { Home } from "../../Composants/Home";
import { customRender } from "../../Test/Test_utils";
import { WrapperReactQuery } from "../../Test/Test_utils";
import { useQuery } from "@tanstack/react-query";
import { FetchHomeFeed } from "../Appel";

export function useCustomHook() {
  return useQuery({
    queryKey: [`Fetch Home Page`],
    queryFn: () => FetchHomeFeed(),
    staleTime: 1000,
  });
}

test("Endpoint Home Page", () => {
  const { result } = renderHook(() => useCustomHook(), {
    wrapper: WrapperReactQuery,
  });
  customRender(<Home />);
  if (result.current.isLoading) {
    console.log("Call Api en chargement");
    screen.debug();
  }
  if (result.current.isError) {
    console.log("Call Api en erreur");
    screen.debug();
  }
  console.log(result.current.data);
});
