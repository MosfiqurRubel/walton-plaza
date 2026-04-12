"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Heading from "../components/ui/Heading";
import Button from "@/app/components/ui/Button";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4">
      <Heading as="h4" children="Something went wrong!" />
      <Button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
        label="Try again"
        variant="danger"
        size="medium"
      />
    </div>
  );
}
