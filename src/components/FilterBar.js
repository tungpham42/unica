import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const FilterBar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const AFFILIATE_ID = "360685";
  const TOKEN = "eTg2dlAvSmJmREVHZktLWjI0enRuUT09";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://unica.vn/api/listCategory");

        // Filter out categories that have child categories and that are valid
        const filteredCategories = response.data.data.filter(
          (category) => !category.childs || category.childs.length === 0
        );

        const validCategories = await Promise.all(
          filteredCategories.map(async (category) => {
            const courseResponse = await axios.get(
              "https://unica.vn/api/coursecategory",
              {
                params: {
                  category_id: category.id,
                  aff_id: AFFILIATE_ID,
                  token: TOKEN,
                },
              }
            );

            // Check if the response indicates success
            if (courseResponse.data.success === 1) {
              return category; // Return category only if success code is 1
            }
            return null; // Return null for categories with no success
          })
        );

        // Filter out any null values
        const finalCategories = validCategories.filter(
          (category) => category !== null
        );

        console.log(finalCategories); // Use the filtered categories as needed
        setCategories(finalCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    // Trigger filter update
    onFilterChange({ categoryId });
  };

  return (
    <Form className="my-4">
      <Form.Group controlId="categorySelect">
        <Form.Label>Chọn danh mục</Form.Label>
        <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              selected={category.id === selectedCategory}
            >
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default FilterBar;
