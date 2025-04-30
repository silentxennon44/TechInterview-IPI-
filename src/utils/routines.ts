import supabase from "./supabase";

export async function getData({
  name = "",
  availability = "",
  color = "",
  gender = "",
  products,
  size,
  price = "",
  sort = "featured",
  page = 1,
}: {
  name?: string;
  availability?: string;
  color?: string;
  gender?: string;
  products?: string;
  size?: string;
  price?: string;
  sort?: string;
  page?: number;
}): Promise<{
  items: Product[];
  total: number;
  error?: unknown;
}> {
  const take = 16; // Number of items per page
  const offset = (page - 1) * take; // Calculate offset for pagination

  let query = supabase.from("items").select("*", { count: "exact" });

  // 🔹 **Filter by text (case-insensitive)**
  if (name) {
    query = query.ilike("name", `%${name}%`);
  }

  // 🔹 **Filter by availability (stock status)**
  if (availability) {
    if (availability.includes("In stock")) {
      query = query.gt("stock", 0);
    } else if (availability.includes("Out of stock")) {
      query = query.eq("stock", 0);
    }
  }

  // 🔹 **Filter by color**
  if (color) {
    const colorsArray = color.split(",");
    query = query.contains("colors", colorsArray);
  }

  // 🔹 **Filter by gender**
  if (gender) {
    const genderArray = gender.split(",");
    query = query.in("gender", genderArray);
  }

  // 🔹 **Filter by product categories**
  if (products) {
    const productArray = products.split(",");
    query = query.in("category", productArray);
  }

  // 🔹 **Filter by size**
  if (size) {
    const sizeArray = size.split(",");
    query = query.contains("sizes", sizeArray);
  }

  // 🔹 **Filter by price range**
  if (price) {
    const [minPrice, maxPrice] = price.split(",").map(Number);
    query = query.gte("price", minPrice).lte("price", maxPrice);
  }

  // 🔹 **Sorting logic**
  switch (sort) {
    case "featured":
      query = query.order("featured", { ascending: false });
      break;
    case "best-selling":
      query = query.order("sales", { ascending: false });
      break;
    case "alpha-asc":
      query = query.order("name", { ascending: true });
      break;
    case "alpha-desc":
      query = query.order("name", { ascending: false });
      break;
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "date-old":
      query = query.order("created_at", { ascending: true });
      break;
    case "date-new":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("id", { ascending: true });
  }

  // 🔹 **Pagination**
  query = query.range(offset, offset + take - 1);

  try {
    const { data: items, count, error } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return { items: [], total: 0 };
    }

    return { items, total: count || 0 };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { items: [], total: 0 };
  }
}

