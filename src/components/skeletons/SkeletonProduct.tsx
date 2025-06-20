import { SkeletonText } from "@chakra-ui/react";

const SkeletonProduct = () => {
  return (
    <SkeletonText mx={2} mt="4" noOfLines={7} spacing="4" skeletonHeight="2" />
  );
};

export default SkeletonProduct;
