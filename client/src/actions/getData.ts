'use server';

// import { unstable_cacheTag as cacheTag } from "next/cache";

export const getData = async () => {
  // "use cache";
  // cacheTag("my-data");

  try {
    const response = await fetch(
      "http://localhost:5001/v1/stock?symbols=HDFCBANK.NS,BAJFINANCE.NS,TCS.NS",
      {
        next: { tags: ["my-data"] },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch stock data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched stock data:", data);

    return { success: true, data: data.stocks };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return { success: false, error: "Failed to fetch stock data" };
  }
};
