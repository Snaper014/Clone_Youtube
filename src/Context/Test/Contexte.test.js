import { useContext } from "../ContextProvider";
import {renderHook} from "@testing-library/react";
import { ContextProvider} from "../../Test/Test_utils";
import { act } from "react-dom/test-utils";



test("Test du hook Contexte des valeurs intiales", () => {
    const {result} = renderHook(() => useContext(), {wrapper: ContextProvider})
    expect(result.current.DataContext).toBe(null)
    expect(result.current.LoadNextContentSearch).toStrictEqual([])
    expect(result.current.token).toBe("")
    expect(result.current.option).toBe(false)
  })

  test("Test du hook Contexte avec valeurs modifiés", () => {
    const {result} = renderHook(() => useContext(), {wrapper: ContextProvider})
    act(() => {
        result.current.setDataContext({valeur: 640, name: "inconnu"});
        result.current.setLoadNextContentSearch([1, 2, 3]);
        result.current.setToken("token");
        result.current.setOption(true);
    })
    expect(result.current.DataContext).toStrictEqual({valeur: 640, name: "inconnu"})
    expect(result.current.LoadNextContentSearch).toStrictEqual([1, 2, 3])
    expect(result.current.token).toBe("token")
    expect(result.current.option).toBe(true)
  })
 