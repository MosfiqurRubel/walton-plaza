import { FileText } from "lucide-react";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Project Setup Done 🚀
        </h1>
        <div className="flex items-center gap-3">
          <Button label="Save" variant="primary" size="large" />
          <Button label="Cancel" variant="secondary" size="small" disabled />
          <Button label="Delete" variant="danger" weight="font-bold" />
          <Button
            label="Custom"
            override
            className="bg-purple-600 text-white px-8 py-4 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-3 mt-8">
          <Button label="Save" variant="primary" size="large" />
          <Button label="Cancel" variant="secondary" size="small" disabled />
          <Button label="Cancel" variant="warning" size="small" disabled />
          <Button
            label="Delete"
            variant="danger"
            icon={<FileText size={20} />}
          />
          <Button label="Submit" variant="primary" size="medium" />
          <Button label="Cancel" variant="secondary" size="small" />
          <Button label="Delete" variant="danger" size="large" disabled />
        </div>
        <div className="space-y-6">
          <Heading
            as="h1"
            variant="primary"
            size="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            weight="font-semibold md:font-bold"
            align="text-left md:text-center"
          >
            Responsive Dynamic Heading
          </Heading>

          <Heading
            as="p"
            variant="secondary"
            size="text-sm sm:text-base md:text-lg"
            align="text-justify"
          >
            This paragraph adjusts size and alignment based on screen width.
          </Heading>

          <Heading
            as="p"
            variant="danger"
            className="font-medium"
            children="No products found"
          />
        </div>
      </div>
    </div>
  );
}
