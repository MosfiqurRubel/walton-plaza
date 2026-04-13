import Heading from "@/app/components/ui/Heading";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="space-y-6">
        <Heading as="h1" variant="primary" children="Home page" />
      </div>
    </div>
  );
}
