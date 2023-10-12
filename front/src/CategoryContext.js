// CategoryContext.js
import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
    return useContext(CategoryContext);
};

export function CategoryProvider({ children }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}
