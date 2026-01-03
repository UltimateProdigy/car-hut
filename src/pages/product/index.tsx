import { useState, type SetStateAction } from "react";
import ProductsListingPage from "./product-listing";
import ProductDetailsPage from "./[id]";
import { Footer } from "@/features/footer";

const AuctionApp = () => {
  const [currentPage, setCurrentPage] = useState("listing");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleViewDetails = (productId: SetStateAction<null>) => {
    setSelectedProductId(productId);
    setCurrentPage("details");
  };

  const handleBack = () => {
    setCurrentPage("listing");
    setSelectedProductId(null);
  };

  return (
    <div>
      {currentPage === "listing" ? (
        <ProductsListingPage onViewDetails={handleViewDetails} />
      ) : (
        <ProductDetailsPage productId={selectedProductId} onBack={handleBack} />
      )}
      <Footer />
    </div>
  );
};

export default AuctionApp;
