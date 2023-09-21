import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Topbar from "@components/Topbar.tsx";
import RecentNews from "@components/RecentPosts";
import LineDivider from "@components/LineDivider";
import CategorySection from "@components/CategorySection";
import axios from "axios";
import { Category } from "../interfaces";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "https://api.rdedigital.com/api/v2/categories",
        );
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    getCategories();
  }, []);
  return (
    <Layout Topbar={<Topbar />}>
      <RecentNews />
      <LineDivider />
      {categories.map((category) => (
        <>
          <CategorySection
            category={category.category_post}
            key={category.category_post}
          />
        </>
      ))}
    </Layout>
  );
}
