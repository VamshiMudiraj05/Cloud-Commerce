import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage } from "@/store/common-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [newImageList, setNewImageList] = useState([]); // State for new images
  const dispatch = useDispatch();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        // Add the new uploaded image URL to the local state
        setNewImageList((prevList) => [...prevList, uploadedImageUrl]);
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Display newly uploaded images only */}
      <div className="flex flex-col gap-4 mt-5">
        {newImageList.map((url, index) => (
          <div className="relative" key={`new-${index}`}>
            <img
              src={url}
              alt={`New Upload ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
