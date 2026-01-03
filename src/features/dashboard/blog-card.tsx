import type { IBlogCard } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import alphinaImg from "@/assets/images/alphina.svg"
import bmwImg from "@/assets/images/bmw.svg"
import x5 from "@/assets/images/x5.svg"

const BlogCard = ({
  image,
  category,
  author,
  date,
  title,
}: IBlogCard) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-64 bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Image Placeholder</span>
          </div>
        )}

        <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-md text-xs font-medium text-gray-700">
          {category}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <span>{author}</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>{date}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const blogPosts = [
    {
      category: 'Sound',
      author: 'Admin',
      date: 'November 22, 2023',
      title: '2024 BMW ALPINA XB7 with exclusive details, extraordinary',
      image: alphinaImg
    },
    {
      category: 'Accessories',
      author: 'Admin',
      date: 'November 22, 2023',
      title: 'BMW X6 M50i is designed to exceed your sportiest.',
      image: bmwImg
    },
    {
      category: 'Exterior',
      author: 'Admin',
      date: 'November 22, 2023',
      title: 'BMW X5 Gold 2024 Sport Review: Light on Sport',
      image: x5
    }
  ];

  return (
    <div className="bg-gray-50 py-16 mb-10">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Latest Blog Posts</h2>
          <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
            View All
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
