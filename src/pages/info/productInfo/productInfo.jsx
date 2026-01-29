import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProductImg,
  getProductById,
} from "../../../api/products/productAPI";
import { API_IMG } from "../../../utils/url";
import { Button } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

const ProductInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productById } = useSelector((store) => store.productSlice);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  if (!productById) return null;

  const e = productById;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          {e?.images?.map((img, i) => (
            <div>
              <img
                key={i}
                src={`${API_IMG}/${img.images}`}
                alt=""
                className="w-full h-48 object-contain rounded-xl border"
              />
              <Button
                onClick={() => {
                  dispatch(deleteProductImg(img.id));
                  dispatch(getProductById(id))
                }}
                className="text-white p-1 relative -top-7 bg-red-500"
              >
                <TrashIcon width={20} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">{e.productName}</h1>

            <p className="text-sm text-gray-500">Code: {e.code}</p>
            <p className="text-sm">
              Brand: <span className="font-medium">{e.brand}</span>
            </p>
            <p className="text-sm">Description: {e.description}</p>

            <div className="flex items-center gap-4 mt-4">
              <p className="text-xl font-semibold text-green-600">${e.price}</p>

              {e.hasDiscount && (
                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">
                  Discount: ${e.discountPrice}
                </span>
              )}
            </div>

            <div className="flex gap-6 text-sm mt-4">
              <p>Size: {Math.round(e.size)}</p>
              <p>Weight: {Math.round(e.weight)}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm">Color:</span>
              <div
                className="w-5 h-5 rounded-full border"
                style={{ background: e.color }}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-xl border hover:bg-gray-100 transition"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
