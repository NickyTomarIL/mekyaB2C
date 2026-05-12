import {useCallback, useEffect, useState} from 'react';

export interface UseOtpResendTimerOptions {
  /** Countdown length in seconds (default 30). */
  durationSeconds?: number;
}

/**
 * Counts down once per second; when it reaches 0, `canResend` is true.
 * Call `restart()` after a resend to start the countdown again.
 */
export function useOtpResendTimer(
  options?: UseOtpResendTimerOptions,
): {
  secondsLeft: number;
  canResend: boolean;
  formattedTime: string;
  restart: () => void;
} {
  const duration = options?.durationSeconds ?? 30;
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const t = setTimeout(() => {
      setSecondsLeft(s => s - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const restart = useCallback(() => {
    setSecondsLeft(duration);
  }, [duration]);

  const canResend = secondsLeft <= 0;

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(
    secondsLeft % 60,
  ).padStart(2, '0')} sec`;

  return {secondsLeft, canResend, formattedTime, restart};
}
