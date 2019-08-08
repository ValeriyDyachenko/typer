import { useEffect, useRef } from "react";

export const useEventListener = (
  eventName: string,
  handler: any,
  element: any = window
) => {
  const refHandler = useRef<any>();
  const refUnscribe = useRef<any>();

  useEffect(() => {
    refHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!document.addEventListener) {
      console.error("browser don't support addEventListener");
      return;
    }
    const cb = (e: any) => refHandler.current(e);
    document.addEventListener(eventName, cb, false);
    refUnscribe.current = () => {
      document.removeEventListener(eventName, cb, false);
    };
    return refUnscribe.current;
  }, [element, eventName]);

  return { unscribe: refUnscribe.current };
};
