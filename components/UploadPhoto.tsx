"use client";
import { useState } from "react";

// Kiểu dữ liệu cho ảnh
type ImagePreview = string | null;

const UploadPhoto = () => {
  const [image, setImage] = useState<ImagePreview>(null);
  const [isLoading, setIsLoading] = useState(false); // Để hiển thị trạng thái đang tải lên

  // Xử lý thay đổi ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Kiểm tra nếu file là hình ảnh
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
      } else {
        alert("Vui lòng chọn file ảnh.");
      }
    }
  };

  // Xử lý gửi ảnh (Upload)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsLoading(true);
    try {
      // Giả lập quá trình tải lên (ở đây bạn có thể gửi file lên server hoặc cloud storage)
      console.log("Uploading image...");
      // Giả sử quá trình tải lên thành công
      alert("Ảnh đã được tải lên thành công!");
    } catch (error) {
      alert("Có lỗi khi tải ảnh lên.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-8">
      <input 
        type="file" 
        onChange={handleImageChange} 
        accept="image/*" // Chỉ chấp nhận các file ảnh
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      
      {image && (
        <div className="mt-4">
          <img 
            src={image} 
            alt="Preview" 
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
      
      <button 
        onClick={handleSubmit} 
        disabled={isLoading} // Vô hiệu hóa nút khi đang tải lên
        className="mt-4 p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? "Đang tải lên..." : "Tải ảnh lên"}
      </button>
    </div>
  );
};

export default UploadPhoto;
