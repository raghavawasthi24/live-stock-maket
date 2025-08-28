"use server";

export const getData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/stock?symbols=HDFCBANK.NS,BAJFINANCE.NS,TCS.NS,INFY.NS,RELIANCE.NS,ICICIBANK.NS,KOTAKBANK.NS,SBIN.NS,AXISBANK.NS,HINDUNILVR.NS
`,
      {
        next: { tags: ["my-data"] },
        cache: "force-cache",
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch stock data: ${response.statusText}`);
    }
    const data = await response.json();

    return { success: true, data: data.stocks };
  } catch (error) {
    return { success: false, error: "Failed to fetch stock data" };
  }
};
