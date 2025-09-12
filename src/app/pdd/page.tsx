"use client";

import { useState, useEffect } from "react";

// 定义数据类型
interface Tag {
  desc: string;
  textColor: string;
  tagType: number;
}

interface GoodsItem {
  goodsId: number;
  goodsName: string;
  shortName: string;
  quantity: number;
  price: number;
  thumbUrl: string;
  hdUrl: string;
  skuIdList: number[];
  isFav: boolean;
  favoritedTime: number;
  favDate: string;
  tagList: Tag[];
  mallId: number;
  mallName: string;
  mallLogo: string;
  goodsPageUrl: string;
  activityPricePrefix: string;
  goodsPicRichText: Array<{
    url: string;
    text: string;
    fontColor?: string;
    fontSize?: number;
    displayType: number;
  }>;
}

interface LikesData {
  data: {
    goodsSet: Record<string, GoodsItem>;
    goodsList: number[];
  };
  expired: number;
}

export default function PddPage() {
  const [likesData, setLikesData] = useState<LikesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        const response = await fetch("/likes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch likes data");
        }
        const data = await response.json();
        setLikesData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLikesData();
  }, []);

  const formatPrice = (price: number) => {
    return (price / 100).toFixed(2);
  };

  const handleProductClick = (item: GoodsItem) => {
    // 这里可以添加跳转逻辑，比如打开新窗口或路由跳转
    // window.open(`https://mobile.yangkeduo.com/${item.goodsPageUrl}`, "_blank");
    const url = `pinduoduo://com.xunmeng.pinduoduo/order_checkout.html?sku_id=${item.skuIdList[0]}&goods_id=${item.goodsId}&goods_number=1`;
    console.log("url", url);
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">错误: {error}</div>
      </div>
    );
  }

  if (!likesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">暂无数据</div>
      </div>
    );
  }

  // 按店铺分组商品
  const mallGroups = Object.values(likesData.data.goodsSet).reduce(
    (acc, item) => {
      const mallId = item.mallId.toString();
      if (!acc[mallId]) {
        acc[mallId] = {
          mallName: item.mallName,
          mallLogo: item.mallLogo,
          goods: [],
        };
      }
      acc[mallId].goods.push(item);
      return acc;
    },
    {} as Record<
      string,
      { mallName: string; mallLogo: string; goods: GoodsItem[] }
    >
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">拼多多收藏商品</h1>
        </div>

        <div className="space-y-8">
          {Object.entries(mallGroups).map(([mallId, mallData]) => (
            <div
              key={mallId}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              {/* 店铺信息 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {mallData.mallName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      共 {mallData.goods.length} 个商品
                    </p>
                  </div>
                </div>
              </div>

              {/* 商品表格 */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        商品信息
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        商品 ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        价格
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mallData.goods.flatMap((item) =>
                      item.skuIdList.map((skuId, skuIndex) => (
                        <tr
                          key={`${item.goodsId}-${skuId}`}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              {/* <Image
                                src={item.thumbUrl}
                                alt={item.shortName}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              /> */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.shortName}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {item.tagList
                                    .slice(0, 2)
                                    .map((tag, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                        style={{
                                          backgroundColor: tag.textColor + "20",
                                          color: tag.textColor,
                                        }}
                                      >
                                        {tag.desc}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {skuId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.goodsId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex flex-col">
                              <span className="font-semibold text-red-600">
                                ¥{formatPrice(item.price)}
                              </span>
                              {item.activityPricePrefix && (
                                <span className="text-xs text-gray-500">
                                  {item.activityPricePrefix}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleProductClick(item)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                            >
                              查看商品
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
