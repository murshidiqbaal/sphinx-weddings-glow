import { defaultContentMap } from "@/config/content";

export const useContent = () => {
    const getText = (id: string) => {
        return defaultContentMap[id] || "";
    };

    const getImage = (id: string) => {
        return defaultContentMap[id] || "";
    };

    return {
        content: defaultContentMap,
        loading: false,
        getText,
        getImage,
    };
};
