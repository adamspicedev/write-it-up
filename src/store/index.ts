import { Tag } from "@prisma/client";
import { create } from "zustand";

interface TagState {
  selectedTags: Tag[];
  globalTags: Tag[];
  setSelectedTags: (tags: { tag: Tag }[]) => void;
  setGlobalTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
}

export const useTagStore = create<TagState>()((set) => ({
  selectedTags: [],
  globalTags: [],
  setSelectedTags: (tags) =>
    set(() => ({ selectedTags: tags.map((tag) => tag.tag) })),
  setGlobalTags: (tags) => set(() => ({ globalTags: tags })),
  addTag: (tag) =>
    set((state) => {
      console.log(tag);
      const newSelectedTags = [...state.selectedTags, tag];
      console.log("newSelectedTags", newSelectedTags);
      return {
        selectedTags: newSelectedTags,
        globalTags: [...state.globalTags, tag],
      };
    }),
}));
