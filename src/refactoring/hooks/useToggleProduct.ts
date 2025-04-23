import { useAtom } from 'jotai';
import { openProductIdsAtom } from '../atoms/adminAtoms';

export const useToggleProduct = () => {
  const [openProductIds, setOpenProductIds] = useAtom(openProductIdsAtom);
  
  return {
    openProductIds,
    toggleProductAccordion: (productId: string) => {
      setOpenProductIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(productId)) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        } 
        return Array.from(newSet);
      });
    }
  }
}
