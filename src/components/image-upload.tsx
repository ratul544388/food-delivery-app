import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  return (
    <div className="h-[160px] relative flex items-center justify-center w-[160px] mx-auto bg-secondary rounded-lg overflow-hidden">
      <div className="flex flex-col gap-1">
        <CldUploadButton
          uploadPreset="food-delivery"
          options={{
            buttonCaption: "something",
            maxFiles: 1,
          }}
          className="bg-primary text-white px-3 py-2 rounded-lg"
          //@ts-ignore
          onUpload={(result) => onChange(result.info.secure_url)}
        />
        <p className="text-sm text-muted-foreground">Upload a photo</p>
      </div>
      {value && (
        <>
          <Image src={value} alt="photo" fill className="object-cover" />
          <Button
            onClick={() => onChange("")}
            variant="outline"
            className="absolute p-0 h-8 w-8 top-0.5 right-0.5 rounded-full"
          >
            <X className="h-4 w-4 " />
          </Button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
