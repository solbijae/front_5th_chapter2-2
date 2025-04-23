import { useState } from 'react';

export const useToggleProduct = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  
  return {
    openProductIds,
    setOpenProductIds,

    toggleProductAccordion: (productId: string) => {
      setOpenProductIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(productId)) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        } 
        return newSet;
      });
    }
  }
}
